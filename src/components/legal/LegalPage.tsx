import React from "react";
import Link from "next/link";
import { FiMail, FiMapPin, FiGlobe } from "react-icons/fi";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyContactWidget from "@/components/StickyContactWidget";
import { companyDetails, LegalDocument, LegalSection } from "@/data/legalContent";

function ContactCard() {
  return (
    <div className="mt-4 rounded-2xl border border-[#00BF63]/25 bg-white/[0.03] p-5 sm:p-6 space-y-3 font-poppins text-sm sm:text-base text-slate-300">
      <p className="font-clash text-lg sm:text-xl font-semibold text-white uppercase tracking-wide">
        {companyDetails.name}
      </p>
      <p className="flex items-start gap-3">
        <FiMapPin className="w-4 h-4 text-[#00BF63] shrink-0 mt-1" />
        <span>{companyDetails.address}</span>
      </p>
      <a
        href={`https://${companyDetails.website}`}
        className="flex items-center gap-3 hover:text-[#00BF63] transition-colors"
      >
        <FiGlobe className="w-4 h-4 text-[#00BF63] shrink-0" />
        <span>{companyDetails.website}</span>
      </a>
      <a
        href={`mailto:${companyDetails.email}`}
        className="flex items-center gap-3 hover:text-[#00BF63] transition-colors"
      >
        <FiMail className="w-4 h-4 text-[#00BF63] shrink-0" />
        <span>{companyDetails.email}</span>
      </a>
    </div>
  );
}

function SectionBody({ section }: { section: LegalSection }) {
  return (
    <div className="space-y-4">
      {section.paragraphs?.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
      {section.list && (
        <ul className="grid gap-x-8 gap-y-2 sm:grid-cols-2 pl-1">
          {section.list.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="mt-[9px] h-1.5 w-1.5 rounded-full bg-[#00BF63] shrink-0" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      )}
      {section.after?.map((text, i) => (
        <p key={i}>{text}</p>
      ))}
      {section.contact && <ContactCard />}
    </div>
  );
}

interface LegalPageProps {
  document: LegalDocument;
  otherDocument: { title: string; href: string };
}

export default function LegalPage({ document, otherDocument }: LegalPageProps) {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-[#00BF62] selection:text-black overflow-x-hidden">
      <Header />
      <StickyContactWidget />

      <div
        className="w-full relative"
        style={{
          background: "linear-gradient(289.27deg, #000000 71.78%, #00BF62 174.87%)",
        }}
      >
        <section className="relative z-10 pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
          {/* Page Title */}
          <div className="text-center space-y-4 pt-6 md:pt-12 pb-10 sm:pb-14">
            <p className="font-poppins text-[#00BF63] text-xs sm:text-sm font-medium tracking-wider">
              Legal
            </p>
            <h1 className="font-clash text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              {document.title}
            </h1>
            <p className="font-poppins text-slate-400 text-xs sm:text-sm">
              Last Updated: {document.lastUpdated}
            </p>
          </div>

          {/* Document Body */}
          <article className="rounded-[24px] sm:rounded-[28px] border border-[#00BF63]/25 bg-[#0b0e0c]/80 shadow-[0_0_35px_rgba(0,191,99,0.12)] p-6 sm:p-10 lg:p-12 font-poppins text-sm sm:text-base font-light text-slate-300 leading-relaxed">
            <div className="space-y-4 pb-8 border-b border-white/10">
              {document.intro.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>

            <ol className="divide-y divide-white/10">
              {document.sections.map((section, i) => (
                <li key={section.title} className="py-8 last:pb-0 space-y-4">
                  <h2 className="font-clash text-xl sm:text-2xl font-semibold text-white flex gap-3">
                    <span className="text-[#00BF63]">{i + 1}.</span>
                    <span>{section.title}</span>
                  </h2>
                  <SectionBody section={section} />
                  {section.subsections?.map((sub, j) => (
                    <div key={sub.title} className="pt-4 space-y-3">
                      <h3 className="font-poppins text-base sm:text-lg font-medium text-white">
                        <span className="text-[#00BF63]">
                          {i + 1}.{j + 1}
                        </span>{" "}
                        {sub.title}
                      </h3>
                      <SectionBody section={sub} />
                    </div>
                  ))}
                </li>
              ))}
            </ol>
          </article>

          <p className="mt-8 text-center font-poppins text-sm text-slate-400">
            See also our{" "}
            <Link href={otherDocument.href} className="text-[#00BF63] hover:underline">
              {otherDocument.title}
            </Link>
            .
          </p>
        </section>
      </div>

      <Footer />
    </main>
  );
}
