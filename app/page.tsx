"use client";
import { useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { motion } from "framer-motion";

export default function BarcodeScannerPage() {
  const [barcode, setBarcode] = useState("");
  const [, setScanning] = useState(false);

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
        (error) => console.warn("Scan error:", error)
      );
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(barcode);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100 flex flex-col items-center justify-center px-4 py-10 text-center font-cairo">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white p-6 rounded-2xl shadow-xl max-w-md w-full"
      >
        <h1 className="text-3xl font-bold text-pink-600 mb-4">📷 Barcode Scanner</h1>
        <button
          onClick={startScan}
          className="bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-6 rounded-lg mb-4"
        >
          Start Scanning
        </button>

        <div id="reader" className="w-full mx-auto mb-4 rounded overflow-hidden" />

        {barcode && (
          <div className="mt-4">
            <p className="text-gray-700 mb-2 font-semibold">Scanned Code:</p>
            <div className="bg-gray-100 p-3 rounded-md break-words mb-2">{barcode}</div>
            <button
              onClick={copyToClipboard}
              className="bg-green-500 hover:bg-green-600 text-white py-1 px-4 rounded-md text-sm"
            >
              Copy Code
            </button>
          </div>
        )}
      </motion.div>
    </main>
  );
}
