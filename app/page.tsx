"use client";
import { useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { motion } from "framer-motion";

export default function HomePage() {
  const [barcode, setBarcode] = useState("");
  const [scanning, setScanning] = useState(false);

  const startScan = async () => {
    setBarcode("");
    const html5QrCode = new Html5Qrcode("reader");

    const devices = await Html5Qrcode.getCameras();
    if (devices.length > 0) {
      setScanning(true);
      html5QrCode.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          setBarcode(decodedText);
          html5QrCode.stop();
          setScanning(false);
        },
        (errorMessage) => {
          console.warn("Scan error:", errorMessage);
        }
      );
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(barcode);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-white to-pink-100 p-4 font-cairo">
      <h1 className="text-3xl font-bold text-blue-700 mb-4">📦 ماسح باركود</h1>

      <div id="reader" style={{ width: "100%", maxWidth: 400 }}></div>

      <motion.button
        onClick={startScan}
        whileHover={{ scale: 1.05 }}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
      >
        📷 بدء المسح
      </motion.button>

      {barcode && (
        <div className="mt-6 w-full max-w-md text-center">
          <p className="text-gray-700 text-lg mb-2">تم المسح:</p>
          <div className="bg-white p-3 rounded border border-blue-300 text-blue-800 font-mono text-lg shadow">
            {barcode}
          </div>
          <motion.button
            onClick={copyToClipboard}
            whileTap={{ scale: 0.95 }}
            className="mt-3 text-sm bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 rounded"
          >
            📋 نسخ الباركود
          </motion.button>
        </div>
      )}
    </main>
  );
}
