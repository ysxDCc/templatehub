import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import TemplateShowcase from '@/components/home/TemplateShowcase';
import StudioDemo from '@/components/home/StudioDemo';
import WhyStrip from '@/components/home/WhyStrip';
import PricingSection from '@/components/home/PricingSection';
import FaqSection from '@/components/home/FaqSection';
import FinalCta from '@/components/home/FinalCta';
import FreeTrialModal from '@/components/FreeTrialModal';

export default function Home() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <TemplateShowcase />
      <StudioDemo />
      <WhyStrip />
      <PricingSection />
      <FaqSection />
      <FinalCta />
      <FreeTrialModal />
    </>
  );
}
