import React from "react";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl w-full bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-700"
      >
        
        {/* HEADER */}
        <h1 className="text-4xl font-bold text-center text-blue-400 mb-6">
          Harsh Sharma
        </h1>

        {/* ABOUT */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-2 text-blue-300">About Me</h2>
          <p className="text-gray-300 leading-relaxed">
            “Highly motivated and detail-oriented IT professional based in Delhi,
            pursuing MCA from ABES Engineering College, GZB. Holding a BCA degree
            from Mewar Institute of Management. Proficient in programming languages,
            web development, and problem-solving, with expertise in C, Python, HTML,
            CSS, JavaScript, PHP, and Excel. Seeking a challenging role that leverages
            my technical skills and passion for innovation.”
          </p>
        </div>

        {/* EDUCATION */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 text-blue-300">Education</h2>

          <div className="space-y-5 text-gray-300">

            <div className="bg-gray-700 p-4 rounded-xl">
              <h3 className="font-bold">DR. A. P. J. Abdul Kalam Technical University</h3>
              <p>ABES Engineering College — MCA (2024–2026)</p>
            </div>

            <div className="bg-gray-700 p-4 rounded-xl">
              <h3 className="font-bold">Chaudhary Charan Singh University Meerut</h3>
              <p>Mewar Institute of Management — BCA (2021–2024)</p>
            </div>

            <div className="bg-gray-700 p-4 rounded-xl">
              <h3 className="font-bold">Govt Boys Sr Sec School -2, Yamuna Vihar</h3>
              <p>12th, CBSE — 2021</p>
            </div>

            <div className="bg-gray-700 p-4 rounded-xl">
              <h3 className="font-bold">Govt Boys Sr Sec School -2, Yamuna Vihar</h3>
              <p>10th, CBSE — 2019</p>
            </div>

          </div>
        </div>

        {/* SKILLS */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3 text-blue-300">Skills</h2>

          <div className="flex flex-wrap gap-3">
            {[
              "C Language",
              "Python",
              "Microsoft Excel",
              "Communications",
              "HTML",
              "CSS",
              "JavaScript"
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-2 bg-gray-700 rounded-full text-sm shadow-md hover:bg-gray-600 transition"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* LANGUAGES */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3 text-blue-300">Languages</h2>
          <p className="text-gray-300">Hindi, English</p>
        </div>

        {/* PROJECT */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3 text-blue-300">Project</h2>

          <div className="bg-gray-700 p-4 rounded-xl text-gray-300">
            <p className="font-bold">Tomato Food Delivery Website</p>
            <p>Team Size: 4</p>
            <p>Key Skills: HTML, CSS, JavaScript</p>

            <a
              href="https://docs.google.com/document/d/1KnYj_MT7flo1MYCFVTT2YFaoOnI1KAZo/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline mt-2 inline-block"
            >
              View Project
            </a>
          </div>
        </div>

        {/* CERTIFICATIONS */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3 text-blue-300">Certifications</h2>

          <div className="bg-gray-700 p-4 rounded-xl text-gray-300">
            <p className="font-bold">Essentials of Excel</p>
            <p>Aggregate: 84 / 100</p>
            <p>Key Skills: Microsoft Excel</p>
            <a
              href="https://docs.google.com/document/d/1KnYj_MT7flo1MYCFVTT2YFaoOnI1KAZo/edit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline mt-2 inline-block"
            >
              View Certificate
            </a>
          </div>
        </div>

        {/* CONTACT */}
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-3 text-blue-300">Contact Information</h2>

          <div className="space-y-2 text-gray-300">
            <p><strong>Phone:</strong> 8287440244</p>
            <p><strong>Email:</strong> harshsharma464610@gmail.com</p>
            <p><strong>Location:</strong> New Delhi - 110094</p>

            <a
              href="https://www.linkedin.com/in/harsh-sharma-966845227/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline"
            >
              LinkedIn Profile
            </a>
          </div>
        </div>

        {/* FOOTER */}
        <p className="text-center text-gray-500 mt-10 text-sm">
          © 2025 Harsh Sharma — Portfolio Contact Page
        </p>

      </motion.div>
    </div>
  );
}
