import os
from dotenv import load_dotenv
from crewai import Agent, Task, Crew, LLM

load_dotenv()

llm = LLM(
    model="gemini/gemini-2.5-flash",
    api_key=os.getenv("GEMINI_API_KEY")
)
def run_exam_agent(subject: str, days: int,
                   priority: str, study_mode: str):

    agent = Agent(
        role="Exam Coach",
        goal="Create personalized study plans",
        backstory="Expert exam preparation mentor",
        llm=llm
    )

    task = Task(
        description=f"""
Subject: {subject}
Exam in: {days} days
Priority Level: {priority}
Study Mode: {study_mode}

Create:
1. Daily study timetable
2. Important topics
3. Revision schedule
4. Tips matching the study mode.
""",
        expected_output="Detailed study plan",
        agent=agent
    )

    return str(
        Crew(
            agents=[agent],
            tasks=[task]
        ).kickoff()
    )
def run_attendance_agent(attendance_percent: float):
    agent = Agent(role="Attendance Advisor", goal="Monitor attendance and predict shortage risk",
        backstory="Expert in student attendance management", llm=llm)
    task = Task(description=f"Student attendance is {attendance_percent}%. Predict risk and give advice.",
        expected_output="Attendance analysis report", agent=agent)
    return str(Crew(agents=[agent], tasks=[task]).kickoff())

def run_performance_agent(marks: dict):
    subjects = "\n".join([f"{k}: {v}" for k, v in marks.items()])
    agent = Agent(role="Academic Performance Analyst", goal="Analyze academic performance and predict GPA",
        backstory="Expert educational performance analyst", llm=llm)
    task = Task(description=f"Student Marks:\n{subjects}\n\nAnalyze: strong subjects, weak subjects, predicted GPA, improvement plan.",
        expected_output="Academic performance report", agent=agent)
    return str(Crew(agents=[agent], tasks=[task]).kickoff())


def run_doubt_agent(question: str,
                     subject: str,
                     difficulty: str):

    agent = Agent(
        role="Subject Expert",
        goal="Answer student doubts clearly",
        backstory="Expert tutor for technical subjects",
        llm=llm
    )

    task = Task(
        description=f"""
Subject: {subject}

Difficulty Level: {difficulty}

Question:
{question}

Explain according to the selected difficulty level.
Use examples whenever possible.
""",
        expected_output="Detailed explanation",
        agent=agent
    )

    return str(
        Crew(
            agents=[agent],
            tasks=[task]
        ).kickoff()
    )
   
def run_placement_agent(months: int, focus_areas: list = None):
    if not focus_areas:
        focus_areas = ["DSA", "System Design", "HR Interview"]
    
    focus_str = ", ".join(focus_areas)
    
    agent = Agent(
        role="Placement Mentor",
        goal="Prepare students for campus placements with detailed roadmaps",
        backstory="Expert industry mentor with 10+ years of experience in campus recruitment, DSA coaching, and interview preparation",
        llm=llm,
        verbose=False
    )
    task = Task(
        description=f"""
        Create a detailed {months}-month placement preparation roadmap for an engineering student.
        
        Focus Areas selected by student: {focus_str}
        Time Available: {months} months
        
        Provide:
        1. Week-by-week study plan for all {months} months
        2. Specific topics to cover for each focus area: {focus_str}
        3. Resources and practice platforms
        4. Daily time allocation
        5. Mock interview schedule
        6. Key milestones to track progress
        
        Be very specific and detailed with actionable steps.
        """,
        expected_output=f"A complete {months}-month placement preparation roadmap with week-by-week breakdown covering {focus_str}",
        agent=agent
    )
    return str(Crew(agents=[agent], tasks=[task]).kickoff())

def run_notes_agent(pdf_text: str, query: str):
    agent = Agent(role="Smart Notes Assistant", goal="Summarize notes and generate important questions",
        backstory="Expert educational assistant", llm=llm)
    task = Task(description=f"Notes content:\n{pdf_text[:3000]}\n\nUser query: {query}",
        expected_output="Summary and important questions", agent=agent)
    return str(Crew(agents=[agent], tasks=[task]).kickoff())