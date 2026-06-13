import StatsCard from "../components/StatsCard";

export default function Dashboard() {
  return (
    <>
      <h2 className="text-3xl font-bold mb-6">
        Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <StatsCard
          title="Attendance"
          value="92%"
          icon="📅"
        />

        <StatsCard
          title="Average Marks"
          value="78"
          icon="📊"
        />

        <StatsCard
          title="Placement Ready"
          value="85%"
          icon="💼"
        />

        <StatsCard
          title="Doubts Solved"
          value="42"
          icon="❓"
        />

        <StatsCard
          title="Notes Uploaded"
          value="12"
          icon="📄"
        />

        <StatsCard
          title="AI Queries"
          value="158"
          icon="🧠"
        />

      </div>
    </>
  );
}