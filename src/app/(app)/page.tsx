import Page from "@/components/home_page/main_page"
import Blogs from "@/components/home_page/blogs"
import Footer from '@/components/footer';
import Header from '@/components/navbar';
export default function Home() {


  return (
    <main>
                <Header /> 

          <Page/>
         <Blogs/>
                             <Footer /> 


    </main>
  );
}