import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ThynkxBanner from "@/components/ThynkxBanner";
import AboutCompany from "@/components/AboutCompany";
import OurPrograms from "@/components/OurPrograms";
import FeaturedEvents from "@/components/FeaturedEvents";
import LatestBlog from "@/components/LatestBlog";
import ConsultationCTA from "@/components/ConsultationCTA";
import Footer from "@/components/Footer";
import { getLatestPostsSafe } from "@/lib/blog";

export default async function Home() {
  const latestPosts = await getLatestPostsSafe(3);

  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-[#00BF62] selection:text-black overflow-hidden">
      <Header />
      <div
        className="w-full"
        style={{
          background: "linear-gradient(289.27deg, #000000 71.78%, #00BF62 174.87%)",
        }}
      >
        <Hero />
        <ThynkxBanner />
        <AboutCompany />
      </div>
        <OurPrograms />
        <FeaturedEvents />
        <LatestBlog posts={latestPosts} />
        <ConsultationCTA />
      <Footer />
    </main>
  );
}
