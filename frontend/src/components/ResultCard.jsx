import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

export default function ResultCard({ result }) {

  const copy = () => {
    navigator.clipboard.writeText(result);
  };

    return (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className="mt-6 bg-slate-900 border border-slate-800 rounded-2xl p-6"
  >
      <div className="flex justify-between mb-4">

        <h3 className="font-bold text-xl">
          AI Response
        </h3>

        <button
          onClick={copy}
          className="bg-indigo-600 px-4 py-2 rounded"
        >
          Copy
        </button>

      </div>

      <div className="prose prose-invert max-w-none">

        <ReactMarkdown>
          {result}
        </ReactMarkdown>

      </div>

  </motion.div>);
}