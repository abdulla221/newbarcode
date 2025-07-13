"use client";
import { motion } from "framer-motion";

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-100 via-white to-blue-100 text-center p-6 font-cairo">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white bg-opacity-80 p-8 rounded-2xl shadow-xl max-w-lg w-full"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4">
          🚧 Beauty Zone Cosmetics
        </h1>

        {/* English Message */}
        <p className="text-xl text-gray-700 mb-1">We're Coming Soon</p>
        <p className="text-md text-gray-600 mb-4">The website is currently under maintenance.</p>

        <hr className="border-t border-gray-300 my-4" />

        {/* Arabic Message */}
        <p className="text-xl text-gray-700 mb-1">نحن قادمون قريباً</p>
        <p className="text-md text-gray-600">الموقع حالياً تحت الصيانة</p>
      </motion.div>

      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "mirror",
        }}
        className="mt-10"
      >
        <svg
          className="w-20 h-20 text-pink-400 opacity-60"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3 13.5V21h7.5M21 10.5V3h-7.5M3 3l7.5 7.5M21 21l-7.5-7.5"
          />
        </svg>
      </motion.div>
    </main>
  );
}
