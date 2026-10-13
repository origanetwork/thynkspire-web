"use client";

import React, { useRef, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { FaWhatsapp } from "react-icons/fa";
import { FiDownload, FiX } from "react-icons/fi";
import { BsQrCode } from "react-icons/bs";
import { Button, CopyButton } from "@/components/registration/ui";

/** School code + student link with copy, WhatsApp share and a downloadable QR poster. */
export default function ShareCard({ schoolCode, link, schoolName, sectionLabel }: { schoolCode: string; link: string; schoolName: string; sectionLabel: string }) {
  const [qrOpen, setQrOpen] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const whatsappText = encodeURIComponent(
    `ThynkX 2026 — India's biggest quizzing event!\nRegister your team of 2 for ${schoolName} (${sectionLabel}).\nSchool code: ${schoolCode}\nRegister here: ${link}`,
  );

  const downloadPoster = () => {
    const qr = canvasRef.current;
    if (!qr) return;
    const W = 1240;
    const H = 1754; // A4 @150dpi
    const c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    const ctx = c.getContext("2d")!;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
    const g = ctx.createRadialGradient(W / 2, 520, 50, W / 2, 520, 800);
    g.addColorStop(0, "rgba(0,191,98,0.35)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
    ctx.textAlign = "center";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 110px Poppins, sans-serif";
    ctx.fillText("Thynk", W / 2 - 40, 220);
    ctx.fillStyle = "#00BF62";
    ctx.fillText("X", W / 2 + 190, 220);
    ctx.fillStyle = "#fff";
    ctx.font = "600 54px Poppins, sans-serif";
    ctx.fillText("India's Biggest Quizzing Event", W / 2, 320);
    ctx.font = "40px Poppins, sans-serif";
    ctx.fillStyle = "#cbd5e1";
    ctx.fillText(schoolName, W / 2, 410);
    ctx.fillText(sectionLabel, W / 2, 465);
    ctx.fillStyle = "#fff";
    ctx.fillRect(W / 2 - 330, 540, 660, 660);
    ctx.drawImage(qr, W / 2 - 300, 570, 600, 600);
    ctx.fillStyle = "#fff";
    ctx.font = "600 46px Poppins, sans-serif";
    ctx.fillText("Scan to register your team of 2", W / 2, 1310);
    ctx.fillStyle = "#94a3b8";
    ctx.font = "36px Poppins, sans-serif";
    ctx.fillText("or enter school code", W / 2, 1390);
    ctx.fillStyle = "#00BF62";
    ctx.font = "bold 72px Poppins, sans-serif";
    ctx.fillText(schoolCode, W / 2, 1480);
    ctx.fillStyle = "#64748b";
    ctx.font = "30px Poppins, sans-serif";
    ctx.fillText("thynkspire.com/thynkx · support@thynkspire.com", W / 2, 1660);

    const a = document.createElement("a");
    a.href = c.toDataURL("image/png");
    a.download = `ThynkX-poster-${schoolCode}.png`;
    a.click();
  };

  return (
    <>
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-3">
          <div className="min-w-0">
            <p className="text-[11px] text-slate-400">School code</p>
            <p className="font-clash text-lg font-semibold text-[#00BF62] break-all">{schoolCode}</p>
          </div>
          <CopyButton value={schoolCode} />
        </div>
        <div className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/40 px-4 py-3">
          <div className="min-w-0">
            <p className="text-[11px] text-slate-400">Link</p>
            <p className="text-sm text-slate-200 truncate">{link}</p>
          </div>
          <CopyButton value={link} label="Copy link" />
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <a
            href={`https://wa.me/?text=${whatsappText}`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 h-9 px-4 rounded-full bg-[#25D366] text-black text-xs font-semibold hover:brightness-110"
          >
            <FaWhatsapp className="w-4 h-4" /> Share on WhatsApp
          </a>
          <Button variant="secondary" size="sm" onClick={() => setQrOpen(true)}>
            <BsQrCode className="w-4 h-4" /> QR code
          </Button>
        </div>
      </div>

      {/* Hidden high-res QR used for the poster */}
      <div className="hidden">
        <QRCodeCanvas ref={canvasRef} value={link} size={600} level="M" marginSize={1} />
      </div>

      {qrOpen && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setQrOpen(false)}>
          <div className="relative w-full max-w-sm rounded-[24px] border border-white/10 bg-[#0b0e0c] p-6 text-center" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setQrOpen(false)} className="absolute top-4 right-4 p-1 text-slate-400 hover:text-white cursor-pointer" aria-label="Close">
              <FiX className="w-5 h-5" />
            </button>
            <p className="font-clash text-xl font-semibold">Student registration QR</p>
            <p className="mt-1 text-xs text-slate-400">{schoolCode}</p>
            <div className="mt-5 inline-block rounded-2xl bg-white p-4">
              <QRCodeCanvas value={link} size={220} level="M" />
            </div>
            <Button className="mt-6" full onClick={downloadPoster}>
              <FiDownload className="w-4 h-4" /> Download QR poster
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
