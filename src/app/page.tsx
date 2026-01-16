import ScrollFlipSection from "@/components/animations/ScrollAnimationProvider";
import Header from '@/components/navbar';
import Hero from '@/components/home_page/hero_section';
import Services from '@/components/home_page/services_section';
import ExportServices from '@/components/home_page/expert_services_section';
import Award from "@/components/home_page/award";
import Solution from '@/components/home_page/solution_section';
import Progress from '@/components/home_page/working_progress';
import Comments from '@/components/home_page/comments_section';
import Ceo from '@/components/home_page/ceo_section';
import Team from '@/components/home_page/team_section';
import Blogs from '@/components/home_page/blogs';
import Footer from '@/components/footer';
import data from '@/data/home_page.json';

export default function Home() {
  if (!data) {
    return <p>Check your internet connection or try again</p>;
  }

  return (
    <main className="scroll-container">
      {/* Header + Hero */}
      <ScrollFlipSection direction="up">
        <Header />
        <Hero data={data.hero_section} />
      </ScrollFlipSection>

      {/* Services */}
      <ScrollFlipSection direction="down">
        <Services data={data.services_section} />
      </ScrollFlipSection>

      {/* Award Section */}
      <ScrollFlipSection direction="left">
        <Award />
      </ScrollFlipSection>

      {/* Expert Services */}
      <ScrollFlipSection direction="right">
        <ExportServices data={data.expert_services_section} />
      </ScrollFlipSection>

      {/* Solutions */}
      <ScrollFlipSection direction="up">
        <Solution data={data.solutions_section} />
      </ScrollFlipSection>

      {/* Working Process */}
      <ScrollFlipSection direction="down">
        <Progress data={data.working_process} />
      </ScrollFlipSection>

      {/* Testimonials / Comments */}
      <ScrollFlipSection direction="left">
        <Comments data={data.testimonials_section} />
      </ScrollFlipSection>

      {/* CEO Section */}
      <ScrollFlipSection direction="right">
        <Ceo data={data.ceo_message_section} />
      </ScrollFlipSection>

      {/* Team Section */}
      <ScrollFlipSection direction="up">
        <Team data={data.teamMembers.team} />
      </ScrollFlipSection>

      {/* Blog Section */}
      <ScrollFlipSection direction="down">
        <Blogs data={data.blog_section} />
      </ScrollFlipSection>

      {/* Footer */}
      <ScrollFlipSection direction="up">
        <Footer />
      </ScrollFlipSection>
    </main>
  );
}
