from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import asyncio
from concurrent.futures import ThreadPoolExecutor
from agents import (run_attendance_agent, run_performance_agent, run_exam_agent,
                    run_doubt_agent, run_placement_agent, run_notes_agent)
from pypdf import PdfReader
import io

app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=["*"],
    allow_methods=["*"], allow_headers=["*"])

executor = ThreadPoolExecutor()

class AttendanceRequest(BaseModel): 
    attendance: int

class PerformanceRequest(BaseModel): 
    marks: dict

class ExamRequest(BaseModel):
    subject: str
    days: int
    priority: Optional[str] = "high"
    study_mode: Optional[str] = "balanced"

class DoubtRequest(BaseModel):
    question: str
    subject: Optional[str] = "General"
    difficulty: Optional[str] = "medium"

class PlacementRequest(BaseModel):
    months: int
    focus_areas: Optional[list] = ["DSA", "System Design"]

@app.post("/attendance")
def attendance(req: AttendanceRequest):
    return {"result": run_attendance_agent(req.attendance)}

@app.post("/performance")
def performance(req: PerformanceRequest):
    return {"result": run_performance_agent(req.marks)}

@app.post("/exam")
def exam(req: ExamRequest):
    return {
        "result": run_exam_agent(
            req.subject,
            req.days,
            req.priority,
            req.study_mode
        )
    }

@app.post("/doubt")
def doubt(req: DoubtRequest):
    return {
        "result": run_doubt_agent(
            req.question,
            req.subject,
            req.difficulty
        )
    }

@app.post("/placement")
def placement(req: PlacementRequest):
    return {
        "result": run_placement_agent(
            req.months,
            req.focus_areas
        )
    }

@app.post("/notes")
async def notes(file: UploadFile = File(...), query: str = Form(...)):
    content = await file.read()
    reader = PdfReader(io.BytesIO(content))
    text = "".join(p.extract_text() or "" for p in reader.pages)
    loop = asyncio.get_event_loop()
    result = await loop.run_in_executor(executor, run_notes_agent, text, query)
    return {"result": result}