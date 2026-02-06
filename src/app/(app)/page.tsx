"use client";
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
import data from '@/data/home_page.json';
export default function Home() {
  if (!data) {
    return <p>Check your internet connection</p>;
  }

  return (
    <main>
          <Hero data={data.hero_section} />
          <Services data={data.services_section} />
                              <Award />

          <ExportServices data={data.expert_services_section} />

          <Solution data={data.solutions_section} />
          <Progress data={data.working_process} />
          <Comments data={data.testimonials_section} />
          <Ceo data={data.ceo_message_section} />
         <Team data={data.teamMembers.team} /> 
         <Blogs data={data.blog_section}/>

    </main>
  );
}