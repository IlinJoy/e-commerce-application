import { FollowSection } from './follow-section/follow-section';
import { HeroSection } from './hero-section/hero-section';
import { MarketingSection } from './marketing-section/marketing-section';
import { PromoSection } from './promo-section/promo-section';

export function MainPage() {
  return (
    <>
      <HeroSection />
      <MarketingSection />
      <PromoSection />
      <FollowSection />
    </>
  );
}
