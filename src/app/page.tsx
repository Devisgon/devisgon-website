import Header from '@/components/navbar'
import Hero from '@/components/home_page/hero_section'
import Services from '@/components/home_page/services_section'
import ExportServices from '@/components/home_page/expert_services_section'
import  Award  from "@/components/home_page/award";
import Solution from '@/components/home_page/solution_section'
import Comments from '@/components/home_page/comments_section'
import Ceo from '@/components/home_page/ceo_section'
import Team from '@/components/home_page/team_section'
import Blogs from '@/components/home_page/blogs'
import Footer from '@/components/footer'
export default function Home() {
    let data;

  try {
    data = require('@/data/home_page.json');
  } catch (error) {
    console.log("Failed to load home page data:");
    data = null;
  }
 if (!data) {
    return <p>check you internet connection or try again</p>;
  }
  return (
    <>
    <Header/>
    <Hero data={data.hero_section}/>
    <Services data={data.services_section}/>
    <Award/>
    <ExportServices data={data.expert_services_section} />
    <Solution data={data.solutions_section}/>
    <Comments data={data.testimonials_section}/>
    <Ceo data={data.ceo_message_section}/>
    <Team data={data.teamMembers.team}/>
    <Blogs data={data.blog_section}/>
    <Footer/>  
    </>
  );
}


