import { motion } from "framer-motion";

export default function StatsCard({ title, value, icon }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-slate-900 border border-slate-800 rounded-2xl p-5"
    >
      <div className="text-3xl mb-2">{icon}</div>

      <h3 className="text-slate-400 text-sm">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>
    </motion.div>
  );
}