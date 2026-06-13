import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import ResultCard from "./components/ResultCard";
import ThemeToggle from "./components/ThemeToggle";
import Dashboard from "./pages/Dashboard";

import {
  askAttendance,
  askPerformance,
  askExam,
  askDoubt,
  askPlacement,
  uploadNotes,
} from "./api";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const [attendance, setAttendance] = useState(72);

  const [marks, setMarks] = useState({
    DBMS: 78,
    AI: 82,
    Blockchain: 65,
    OS: 71,
    CN: 68,
  });

  const [examSubject, setExamSubject] = useState("DBMS");
  const [examDays, setExamDays] = useState(5);
  const [examPriority, setExamPriority] = useState("Medium");
  const [studyMode, setStudyMode] = useState("Mixed");

  const [doubt, setDoubt] = useState("");
  const [doubtSubject, setDoubtSubject] = useState("DBMS");
  const [difficulty, setDifficulty] = useState("Beginner");

  const [placementMonths, setPlacementMonths] = useState(2);
  const [focusAreas, setFocusAreas] = useState([]);

  const [notesFile, setNotesFile] = useState(null);
  const [notesQuery, setNotesQuery] = useState("");

  const handle = async () => {
    toast.loading("CampusMind AI is thinking...", {
      id: "agent",
    });

    setLoading(true);
    setResult("");

    try {
      let res = "";

      if (active === "attendance") {
        res = await askAttendance(attendance);
      } else if (active === "performance") {
        res = await askPerformance(marks);
      } else if (active === "exam") {
        res = await askExam(
          examSubject,
          examDays,
          examPriority,
          studyMode
        );
      } else if (active === "doubt") {
        res = await askDoubt(
          doubt,
          doubtSubject,
          difficulty
        );
      } else if (active === "placement") {
        res = await askPlacement(
          placementMonths,
          focusAreas
        );
      } else if (active === "notes") {
        res = await uploadNotes(
          notesFile,
          notesQuery
        );
      }

      setResult(res);

      toast.success(
        "CampusMind AI completed the task!",
        {
          id: "agent",
        }
      );
    } catch (e) {
      toast.error(
        e.message || "Something went wrong",
        {
          id: "agent",
        }
      );

      setResult("Error: " + e.message);
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-950 via-gray-950 to-indigo-950 text-white">

      <Toaster position="top-right" />

      <Sidebar
        active={active}
        setActive={setActive}
      />

      <div className="flex-1 p-8">

        <div className="flex justify-between mb-8">
          <Header />
          <ThemeToggle />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

          <div className="bg-white/5 backdrop-blur-md rounded-xl p-4">
            <p className="text-slate-400 text-sm">
              Attendance
            </p>

            <p className="text-2xl font-bold">
              {attendance}%
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-xl p-4">
            <p className="text-slate-400 text-sm">
              Subjects
            </p>

            <p className="text-2xl font-bold">
              {Object.keys(marks).length}
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-xl p-4">
            <p className="text-slate-400 text-sm">
              Placement
            </p>

            <p className="text-2xl font-bold">
              {placementMonths}M
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-md rounded-xl p-4">
            <p className="text-slate-400 text-sm">
              Focus Areas
            </p>

            <p className="text-2xl font-bold">
              {focusAreas.length}
            </p>
          </div>

        </div>

        <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">

          {active === "dashboard" && (
            <Dashboard />
          )}
                    {active === "attendance" && (
            <>
              <h2 className="text-2xl font-bold mb-4">
                Attendance Advisor
              </h2>

              <div className="flex gap-8 items-center flex-wrap">

                <div className="relative w-32 h-32 rounded-full border-8 border-indigo-500 flex items-center justify-center bg-slate-900/50">
                  <span className="text-3xl font-bold">
                    {attendance}%
                  </span>
                </div>

                <div>

                  <input
                    type="number"
                    value={attendance}
                    onChange={(e) =>
                      setAttendance(
                        Number(e.target.value)
                      )
                    }
                    className="bg-slate-800 p-3 rounded-xl w-32"
                  />

                  <p className="mt-4 text-slate-400">

                    Status:

                    {attendance >= 85 && (
                      <span className="text-green-400 ml-2">
                        Safe
                      </span>
                    )}

                    {attendance >= 75 &&
                      attendance < 85 && (
                        <span className="text-yellow-400 ml-2">
                          Warning
                        </span>
                      )}

                    {attendance < 75 && (
                      <span className="text-red-400 ml-2">
                        Risk
                      </span>
                    )}

                  </p>

                </div>

              </div>
            </>
          )}

          {active === "performance" && (
            <>
              <h2 className="text-2xl font-bold mb-6">
                Performance Analytics
              </h2>

              {Object.entries(marks).map(
                ([subj, mark]) => (
                  <div
                    key={subj}
                    className="mb-3"
                  >

                    <label>{subj}</label>

                    <input
                      type="number"
                      value={mark}
                      onChange={(e) =>
                        setMarks({
                          ...marks,
                          [subj]: Number(
                            e.target.value
                          ),
                        })
                      }
                      className="ml-3 bg-slate-800 p-2 rounded-xl"
                    />

                  </div>
                )
              )}

              <div className="h-80 mt-8">

                <ResponsiveContainer
                  width="100%"
                  height="100%"
                >

                  <BarChart
                    data={Object.entries(
                      marks
                    ).map(
                      ([subject, score]) => ({
                        subject,
                        score,
                      })
                    )}
                  >

                    <XAxis dataKey="subject" />

                    <YAxis />

                    <Tooltip />

                    <Bar dataKey="score" />

                  </BarChart>

                </ResponsiveContainer>

              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

                <div className="bg-slate-800 rounded-xl p-4">
                  <p className="text-slate-400">
                    Average
                  </p>

                  <h3 className="text-2xl font-bold">
                    {(
                      Object.values(marks).reduce(
                        (a, b) => a + b,
                        0
                      ) /
                      Object.values(marks).length
                    ).toFixed(1)}
                  </h3>
                </div>

                <div className="bg-slate-800 rounded-xl p-4">
                  <p className="text-slate-400">
                    Best Subject
                  </p>

                  <h3 className="text-2xl font-bold">
                    {
                      Object.entries(
                        marks
                      ).sort(
                        (a, b) =>
                          b[1] - a[1]
                      )[0][0]
                    }
                  </h3>
                </div>

                <div className="bg-slate-800 rounded-xl p-4">
                  <p className="text-slate-400">
                    Weak Subject
                  </p>

                  <h3 className="text-2xl font-bold">
                    {
                      Object.entries(
                        marks
                      ).sort(
                        (a, b) =>
                          a[1] - b[1]
                      )[0][0]
                    }
                  </h3>
                </div>

              </div>
            </>
          )}

          {active === "exam" && (
            <div className="flex flex-col gap-4">

              <h2 className="text-2xl font-bold">
                Exam Planner
              </h2>

              <input
                placeholder="Subject"
                value={examSubject}
                onChange={(e) =>
                  setExamSubject(
                    e.target.value
                  )
                }
                className="bg-gray-800 rounded-xl px-3 py-2 border border-gray-700"
              />

              <input
                type="number"
                placeholder="Days Left"
                value={examDays}
                onChange={(e) =>
                  setExamDays(
                    Number(
                      e.target.value
                    )
                  )
                }
                className="bg-gray-800 rounded-xl px-3 py-2 border border-gray-700"
              />

              <select
                value={examPriority}
                onChange={(e) =>
                  setExamPriority(
                    e.target.value
                  )
                }
                className="bg-gray-800 rounded-xl px-3 py-2 border border-gray-700"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>

              <select
                value={studyMode}
                onChange={(e) =>
                  setStudyMode(
                    e.target.value
                  )
                }
                className="bg-gray-800 rounded-xl px-3 py-2 border border-gray-700"
              >
                <option>Theory</option>
                <option>Problem Solving</option>
                <option>Mixed</option>
              </select>

            </div>
          )}
                    {active === "doubt" && (
            <div className="flex flex-col gap-4">

              <h2 className="text-2xl font-bold">
                Doubt Solver
              </h2>

              <select
                value={doubtSubject}
                onChange={(e) =>
                  setDoubtSubject(e.target.value)
                }
                className="bg-gray-800 rounded-xl px-3 py-2 border border-gray-700"
              >
                <option>DBMS</option>
                <option>OS</option>
                <option>CN</option>
                <option>AI</option>
                <option>Blockchain</option>
                <option>Other</option>
              </select>

              <select
                value={difficulty}
                onChange={(e) =>
                  setDifficulty(e.target.value)
                }
                className="bg-gray-800 rounded-xl px-3 py-2 border border-gray-700"
              >
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>

              <textarea
                placeholder="Type your doubt..."
                value={doubt}
                onChange={(e) =>
                  setDoubt(e.target.value)
                }
                className="bg-gray-800 rounded-xl px-4 py-3 border border-gray-700 h-32 resize-none"
              />

            </div>
          )}

          {active === "placement" && (
            <div className="flex flex-col gap-4">

              <h2 className="text-2xl font-bold">
                Placement Roadmap
              </h2>

              <input
                type="number"
                value={placementMonths}
                onChange={(e) =>
                  setPlacementMonths(
                    Number(e.target.value)
                  )
                }
                placeholder="Months until placement"
                className="bg-gray-800 rounded-xl px-3 py-2 border border-gray-700"
              />

              {[
                "DSA",
                "Aptitude",
                "Projects",
                "Resume",
                "HR Interview",
                "System Design",
              ].map((item) => (
                <label
                  key={item}
                  className="flex items-center gap-3"
                >
                  <input
                    type="checkbox"
                    checked={focusAreas.includes(item)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFocusAreas([
                          ...focusAreas,
                          item,
                        ]);
                      } else {
                        setFocusAreas(
                          focusAreas.filter(
                            (f) => f !== item
                          )
                        );
                      }
                    }}
                  />

                  {item}
                </label>
              ))}

            </div>
          )}

          {active === "notes" && (
            <>
              <h2 className="text-2xl font-bold mb-4">
                Smart Notes
              </h2>

              <input
                type="file"
                accept=".pdf"
                onChange={(e) =>
                  setNotesFile(
                    e.target.files[0]
                  )
                }
                className="mb-4"
              />

              <input
                placeholder="Ask something from the notes..."
                value={notesQuery}
                onChange={(e) =>
                  setNotesQuery(
                    e.target.value
                  )
                }
                className="bg-slate-800 p-3 rounded-xl w-full"
              />
            </>
          )}

          {active !== "dashboard" && (
            <button
              onClick={handle}
              disabled={loading}
              className="mt-6 bg-indigo-600 px-6 py-3 rounded-xl hover:bg-indigo-500 transition-all disabled:opacity-50"
            >
              {loading
                ? "Thinking..."
                : "Ask Agent"}
            </button>
          )}

        </div>

        {result && (
          <ResultCard result={result} />
        )}

      </div>

    </div>
  );
}