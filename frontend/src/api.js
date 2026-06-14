const BASE = "http://127.0.0.1:8000";

export async function askAttendance(attendance) {
  const res = await fetch(`${BASE}/attendance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ attendance: Number(attendance) }),
  });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()).result;
}

export async function askPerformance(marks) {
  const res = await fetch(`${BASE}/performance`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ marks }),
  });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()).result;
}

export async function askExam(subject, days, priority, study_mode) {
  const res = await fetch(`${BASE}/exam`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      subject,
      days: Number(days),
      priority: priority || "Medium",
      study_mode: study_mode || "Mixed",
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()).result;
}

export async function askDoubt(question, subject, difficulty) {
  const res = await fetch(`${BASE}/doubt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question,
      subject: subject || "General",
      difficulty: difficulty || "Beginner",
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()).result;
}

export async function askPlacement(months, focus_areas) {
  const res = await fetch(`${BASE}/placement`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      months: Number(months),
      focus_areas: focus_areas && focus_areas.length > 0
        ? focus_areas
        : ["DSA", "System Design"],
    }),
  });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()).result;
}

export async function uploadNotes(file, query) {
  if (!file) throw new Error("Please select a PDF file first!");
  const form = new FormData();
  form.append("file", file);
  form.append("query", query || "Summarize this document");
  const res = await fetch(`${BASE}/notes`, {
    method: "POST",
    body: form,
  });
  if (!res.ok) throw new Error(await res.text());
  return (await res.json()).result;
}