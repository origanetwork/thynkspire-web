import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StickyContactWidget from "@/components/StickyContactWidget";
import ProgramHero from "@/components/programs/ProgramHero";
import WhyLearnProgram from "@/components/programs/WhyLearnProgram";
import CourseRoadmap from "@/components/programs/CourseRoadmap";
import CourseRoadmapTimeline from "@/components/programs/CourseRoadmapTimeline";
import ProgramModules from "@/components/programs/ProgramModules";
import ToolsMastered from "@/components/programs/ToolsMastered";
import StudentBenefits from "@/components/programs/StudentBenefits";
import IndustryInternship from "@/components/programs/IndustryInternship";
import AdmissionProcess from "@/components/programs/AdmissionProcess";
import ProgramFAQ from "@/components/programs/ProgramFAQ";
import ProgramCTA from "@/components/programs/ProgramCTA";
import { programsData, getProgramBySlug } from "@/data/programsData";

interface ProgramDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return programsData.map((program) => ({
    slug: program.slug,
  }));
}

export async function generateMetadata({ params }: ProgramDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    return {
      title: "Program Not Found | Thynkspire",
    };
  }

  return {
    title: `${program.highlightedTitle} - ${program.subtitleTag} | Thynkspire`,
    description: program.description,
  };
}

export default async function ProgramDetailPage({ params }: ProgramDetailPageProps) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-[#00BF62] selection:text-black overflow-x-hidden">
      {/* Universal Fixed Navigation Header */}
      <Header />

      {/* Sticky Call / WhatsApp Widget */}
      <StickyContactWidget />

      {/* Main Content with Ambient Figma Gradient */}
      <div
        className="w-full relative"
        style={{
          background: "linear-gradient(289.27deg, #000000 71.78%, #00BF62 174.87%)",
        }}
      >
        {/* Active Program Hero Section */}
        <ProgramHero program={program} />

        {/* Why Learn & Who Can Participate Section */}
        <WhyLearnProgram program={program} />

           {/* 6-Month Course Roadmap Timeline Section */}
        <CourseRoadmapTimeline program={program} />


        {/* The Syllabus Module Interactive Deck Section */}
        <ProgramModules program={program} />


        {/* Tools You'll Master Section */}
        <ToolsMastered />

        {/* Student Benefits & Learning Methodology Section */}
        <StudentBenefits />

        {/* 1-Month Industry Internship Section */}
        <IndustryInternship program={program} />

        {/* Where Can This Program Take You Career Outcomes Section */}
        <CourseRoadmap program={program} />

        {/* Admission Process / Enrollment Section */}
        <AdmissionProcess />

        {/* Frequently Asked Questions Section */}
        <ProgramFAQ program={program} />

        {/* Dynamic Program CTA */}
        <ProgramCTA program={program} />
      </div>

      {/* Footer */}
      <Footer />
    </main>
  );
}
