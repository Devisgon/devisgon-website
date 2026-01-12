import data from "../../data/services_page.json";
import Header from '../../components/navbar'
import Hero from "../../components/services_page/hero";
import Service from '../../components/services_page/services'
import Footer from '../../components/footer'

export default function Services() {
 return(
    <> 
     <Header/>
     <Hero data={data.herosection}/>
     <Service data={data.services}/>
     <Footer/>
    </>
);
}
