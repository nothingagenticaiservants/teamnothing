export default function Header() {
  const date = new Date().toLocaleDateString();

  return (
    <div>
      <h2 className="text-3xl font-bold">
        Good Evening 👋
      </h2>

      <p className="text-slate-400">
        Ready to conquer your semester?
      </p>

      <p className="text-sm text-slate-500 mt-1">
        {date}
      </p>
    </div>
  );
}