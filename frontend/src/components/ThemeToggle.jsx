import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "light") {
      setDark(false);
    }
  }, []);

  const toggle = () => {
    const next = !dark;

    setDark(next);

    localStorage.setItem(
      "theme",
      next ? "dark" : "light"
    );
  };

  return (
    <button
      onClick={toggle}
      className="p-3 rounded-xl bg-slate-800"
    >
      {dark ? <Moon /> : <Sun />}
    </button>
  );
}