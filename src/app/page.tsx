import { Hero } from "@/components/home/Hero";
import { ServicesSection } from "@/components/home/ServicesSection";
import { DoctorsSection } from "@/components/home/DoctorsSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ClinicsSection } from "@/components/home/ClinicsSection";
import { CtaBand } from "@/components/home/CtaBand";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesSection />
      <DoctorsSection />
      <HowItWorks />
      <ClinicsSection />
      <CtaBand />
    </>
  );
}
