import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { ExperienceSection } from '@/components/ExperienceSection';
import { SkillsSection } from '@/components/SkillsSection';
import { ProjectsSection } from '@/components/ProjectsSection';
import { AchievementsSection } from '@/components/AchievementsSection';
import { CertificationsSection } from '@/components/CertificationsSection';
import { GitHubSection } from '@/components/GitHubSection';
import { LeadershipSection } from '@/components/LeadershipSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
 import { PortfolioChat } from '@/components/PortfolioChat';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <AchievementsSection />
        <CertificationsSection />
        <GitHubSection />
        <LeadershipSection />
        <ContactSection />
      </main>
      <Footer />
     <PortfolioChat />
    </div>
  );
};

export default Index;
