import Header from '@/components/navbar'
import Hero from "@/components/services_page/hero";
import Service from '@/components/services_page/services'
import Form from '@/components/sub_services_pages/contact'
import Footer from '@/components/footer'
import data from '@/data/services_page.json'
export default function Services() {

 return(
   
    <> 
     <Header/>
     <Hero data={data.herosection}/>
     <Service data={data.services}/>
     <Form/>
     <Footer/>
    </>
);
}
