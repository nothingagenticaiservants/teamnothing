const BASE = "http://127.0.0.1:8000";

export async function askAttendance(attendance) {
  const res = await fetch(`${BASE}/attendance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      attendance: Number(attendance),
    }),
  });

  const data = await res.json();
  return data.result;
}

export async function askPerformance(marks) {
  const res = await fetch(`${BASE}/performance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ marks }),
  });

  const data = await res.json();
  return data.result;
}

export async function askExam(subject, days, priority, studyMode) {
  const res = await fetch(`${BASE}/exam`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subject,
      days: Number(days),
      priority,
      study_mode: studyMode,
    }),
  });

  const data = await res.json();
  return data.result;
}

export async function askDoubt(question, subject, difficulty) {
  const res = await fetch(`${BASE}/doubt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      question,
      subject,
      difficulty,
    }),
  });

  const data = await res.json();
  return data.result;
}

export async function askPlacement(months, focusAreas) {
  const res = await fetch(`${BASE}/placement`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      months: Number(months),
      focus_areas: focusAreas,
    }),
  });

  const data = await res.json();
  return data.result;
}

export async function uploadNotes(file, query) {
  const form = new FormData();

  form.append("file", file);
  form.append("query", query);

  const res = await fetch(`${BASE}/notes`, {
    method: "POST",
    body: form,
  });

  const data = await res.json();
  return data.result;
}