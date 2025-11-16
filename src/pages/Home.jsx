import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Home() {
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  useEffect(() => {
    setStates([
      "Uttar Pradesh",
      "Delhi",
      "Maharashtra",
      "Rajasthan",
      "Haryana",
      "Punjab",
      "Gujarat",
      "Bihar",
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8 flex flex-col items-center space-y-10">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-bold text-center"
      >
        Online State Voting System
      </motion.h1>


      {/* Marquee */}
      <marquee behavior="scroll" direction="left" className="text-yellow-400 text-lg font-semibold tracking-wider bg-yellow-900 bg-opacity-20 py-2 rounded-xl border border-yellow-700 shadow-md animate-pulse mt-4">
        ⭐ One Person • One Vote • Your Vote Matters ⭐
      </marquee>


      <motion.h1>
</motion.h1>


{/* Description */ }
  <motion.p
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.3 }}
    className="text-gray-300 text-center max-w-2xl"
  >
    Cast your vote securely from anywhere. Authenticate, update your profile,
    reset your password, and vote in your state online—all in one place.
  </motion.p>


  {/* Features */ }
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.8, delay: 0.4 }}
    className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl"
  >
    {[{
      title: "Secure Authentication",
      desc: "Login safely with encrypted identity verification.",
    }, {
      title: "Reset Password",
      desc: "Easily recover or reset your password anytime.",
    }, {
      title: "Profile Update",
      desc: "Keep your voter information up to date.",
    }].map((feature, index) => (
      <div
        key={index}
        className="bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 hover:scale-105 transition-transform duration-300"
      >
        <h2 className="text-xl font-semibold mb-2">{feature.title}</h2>
        <p className="text-gray-400 text-sm">{feature.desc}</p>
      </div>
    ))}
  </motion.div>


  {/* State Select */ }
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.7, delay: 0.5 }}
    className="w-full max-w-lg bg-gray-800 p-6 rounded-2xl shadow-xl border border-gray-700 space-y-4"
  >
    <h2 className="text-2xl font-semibold">Select Your Voting State</h2>


    <select
      className="w-full p-3 rounded-lg bg-gray-700 text-gray-200 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      value={selectedState}
      onChange={(e) => setSelectedState(e.target.value)}
    >
      <option value="">Choose State</option>
      {states.map((state) => (
        <option key={state} value={state}>
          {state}
        </option>
      ))}
    </select>


    <button
      className="w-full bg-blue-600 hover:bg-blue-700 transition-colors text-white p-3 rounded-lg font-semibold"
      onClick={() => alert(`Voting started for ${selectedState || "your state"}`)}
    >
      Start Voting
    </button>
  </motion.div>


  {/* Footer */ }
  <p className="text-gray-500 text-sm mt-6">
    © 2025 Online Voting Portal — MERN Stack Project
  </p>
</div >
);
}
