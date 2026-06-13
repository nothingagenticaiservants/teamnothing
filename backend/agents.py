import os
from crewai import Agent, Task, Crew, LLM

os.environ["GEMINI_API_KEY"] = "AQ.Ab8RN6LlwVWDopgnaWIfn_P2cKYHEyrWzpBQMPmWH-65Flz6dQ"

llm = LLM(
    model="gemini/gemini-2.5-flash",
    api_key=os.environ["GEMINI_API_KEY"]
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

def run_exam_agent(subject: str, days: int):
    agent = Agent(role="Exam Coach", goal="Create personalized study plans",
        backstory="Expert exam preparation mentor", llm=llm)
    task = Task(description=f"{subject} exam in {days} days. Create a detailed study plan.",
        expected_output="Study plan", agent=agent)
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
    agent = Agent(role="Subject Expert", goal="Answer student doubts clearly",
        backstory="Expert tutor for technical subjects", llm=llm)
    task = Task(description=question, expected_output="Detailed explanation", agent=agent)
    return str(Crew(agents=[agent], tasks=[task]).kickoff())

def run_placement_agent(months: int,
                        focus_areas: list):

    agent = Agent(
        role="Placement Mentor",
        goal="Prepare students for placements",
        backstory="Industry interview mentor",
        llm=llm
    )

    task = Task(
        description=f"""
Placement drive in {months} months.

Focus Areas:
{", ".join(focus_areas)}

Create:
1. Weekly roadmap
2. Resource recommendations
3. Mock interview strategy
4. Time allocation.
""",
        expected_output="Placement roadmap",
        agent=agent
    )

    return str(
        Crew(
            agents=[agent],
            tasks=[task]
        ).kickoff()
    )
    agent = Agent(role="Placement Mentor", goal="Prepare students for placements",
        backstory="Industry interview and DSA mentor", llm=llm)
    task = Task(description=f"Placement drive in {months} months. Create a complete DSA + interview roadmap.",
        expected_output="Placement preparation roadmap", agent=agent)
    return str(Crew(agents=[agent], tasks=[task]).kickoff())

def run_notes_agent(pdf_text: str, query: str):
    agent = Agent(role="Smart Notes Assistant", goal="Summarize notes and generate important questions",
        backstory="Expert educational assistant", llm=llm)
    task = Task(description=f"Notes content:\n{pdf_text[:3000]}\n\nUser query: {query}",
        expected_output="Summary and important questions", agent=agent)
    return str(Crew(agents=[agent], tasks=[task]).kickoff())