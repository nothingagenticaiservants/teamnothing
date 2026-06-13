import {
  CalendarCheck,
  BarChart3,
  NotebookPen,
  MessageCircleQuestion,
  BriefcaseBusiness,
  FileText,
  LayoutDashboard,
} from "lucide-react";

const items = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "attendance", label: "Attendance", icon: CalendarCheck },
  { id: "performance", label: "Performance", icon: BarChart3 },
  { id: "exam", label: "Exam Planner", icon: NotebookPen },
  { id: "doubt", label: "Doubt Solver", icon: MessageCircleQuestion },
  { id: "placement", label: "Placement", icon: BriefcaseBusiness },
  { id: "notes", label: "Smart Notes", icon: FileText },
];

export default function Sidebar({ active, setActive }) {
  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 p-6">

      <h1 className="text-2xl font-bold text-indigo-400 mb-8">
        🧠 CampusMind AI
      </h1>

      {items.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.id}
            onClick={() => setActive(item.id)}
            className={`flex items-center gap-3 w-full p-3 rounded-xl mb-2 ${
              active === item.id
                ? "bg-indigo-600"
                : "hover:bg-slate-800"
            }`}
          >
            <Icon size={20} />
            {item.label}
          </button>
        );
      })}
    </div>
  );
}