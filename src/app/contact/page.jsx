"use client";
import { IoMdCloudUpload } from "react-icons/io";
import { FaSquareFacebook } from "react-icons/fa6";
import { IoLogoLinkedin } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { MdCalendarToday } from "react-icons/md";



import { Mail, Phone, MapPin,  } from "lucide-react";
import Link from "next/link";
import Header from '../../components/navbar'
import Footer from '../../components/footer'
export default function ContactPage() {
  return (
    <>
    <Header />
    <div className="min-h-screen p-8">

      <section className="w-full py-16 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-4">
          Let's Talk About Your Project
        </h1>

        <p className="max-w-2xl mx-auto text-sm md:text-base text-primary">
          Ready to bring your vision to life? We’d love to hear about your project and
          explore how we can help you achieve your goals.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid md:grid-cols-2 gap-10">

          {/*LEFT FORM*/}
          <div className="bg-[#F7EDFE] rounded-2xl border-[#E5E7EB] p-8">
            <h2 className="text-xl font-semibold text-primary mb-2">
              Send us a message
            </h2>
            <p className="text-secondary mb-6">
              Fill out the form below and we’ll get back to you within 24 hours.
            </p>

            <form  className="space-y-4">

              <div className="grid grid-cols-2 gap-4 ">
                <div className="flex flex-col gap-1">
                  <p className="text-primary ml-2">Name *</p>
                <input
                  type="text"
                  placeholder="Your name"
                  className="text-primary border-[#D1AFEC] bg-[#EAD5F9] rounded-2xl p-4"
                />
                </div>
               <div className="flex flex-col gap-1">
                  <p className="text-primary ml-2">Email *</p>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="text-primary border-[#D1AFEC] bg-[#EAD5F9] rounded-2xl p-4"
                />
              </div>
              </div>
             <div className="flex flex-col gap-1">
                  <p className="text-primary ml-2">Company</p>
              <input
                type="text"
                placeholder="Your company name"
                  className="text-primary w-full border-[#D1AFEC] bg-[#EAD5F9] rounded-2xl p-4"
              />
               </div>

               <div className="flex flex-col gap-1">
                  <p className="text-primary ml-2">Project Type *</p>
              <select className="text-primary w-full border-[#D1AFEC] bg-[#EAD5F9] rounded-2xl p-4"> 
              <option>Select project type</option>
                <option>Web Development</option>
                <option>Mobile App</option>
                <option>UI / UX Design</option>
                <option>AI Solutions</option>
                <option>Automation</option>
              </select>
               </div>

               <div className="flex flex-col gap-1">
                  <p className="text-primary ml-2">Budget Range</p>
              <select  className="text-primary w-full border-[#D1AFEC] bg-[#EAD5F9] rounded-2xl p-4">
                <option>Select budget range</option>
                <option>$5k - $10k</option>
                <option>$10k - $20k</option>
                <option>$20k+</option>
              </select>
                  </div>
             
              <div className="flex flex-col gap-1">
                  <p className="text-primary ml-2">Time Line</p>
              <select  className="text-primary w-full border-[#D1AFEC] bg-[#EAD5F9] rounded-2xl p-4">
                <option>Select timeline</option>
                <option>ASAP</option>
                <option>1 - 3 Months</option>
                <option>3 - 6 Months</option>
               <option>6 - 9 Months</option>
              </select>
              </div>

              <div className="flex flex-col gap-1">
                  <p className="text-primary ml-2">Project Detail *</p>
              <textarea
                rows="4"
                placeholder="Tell us about your project, goals, and any specific requirements..."
                  className="text-secondary w-full border-[#D1AFEC] bg-[#EAD5F9] rounded-2xl p-4 "
              />
               </div>

               <div className="flex flex-col gap-1">
                  <p className="text-primary ml-2">File Upload</p>
             <div className="border-2 border-dashed border-purple-300 rounded-lg p-8 text-center text-sm relative cursor-pointer">
               <input
               type="file"
                   className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <p className="text-secondary flex  flex-col  justify-center items-center ">
                    <IoMdCloudUpload  className="text-4xl text-primary"/>
                       Drop files here or click to upload <br />  PDF, DOC, PNG up to 10MB
                    </p>
                    
            </div>
               </div>

              <div className="flex items-start gap-2 text-sm">
                <input
                  type="checkbox"
                  className="mt-1"
                />
                <p className="text-primary">
                  I agree to the processing of my personal data in accordance with <br />the{" "}
                  <Link href="/privacy-policy" className="text-secondary">
                    Privacy Policy
                  </Link>
                  and consent to receive communications about this <br />inquiry .*
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#8145B5] text-white py-2 rounded-md hover:bg-purple-700 hover:shadow-2xl shadow-[#8145B5] transition"
              >
                Send Message
              </button>
            </form>
          </div>

          <div className="space-y-6">

            <div className="bg-[#F7EDFE] border-[#EAD5F9] rounded-2xl p-8 text-center">
              <h2 className="text-xl font-semibold text-primary mb-2">
                Schedule a call
              </h2>
              <p className="text-secondary mb-4">
                 Prefer to talk? Book a free 30-minute consultation call with our team              </p>
               <div className="bg-[#FBF7FE] flex flex-col items-center justify-center py-32 rounded-xl">
                 <MdCalendarToday className="text-primary text-5xl  "/>

\                 <p className="text-primary font-bold text-xl mb-4 ">Calendly Integration</p>
                 <p className="text-secondary   mb-4">Calendar booking widget would be embedded here</p>

                <button className="bg-[#8145B5] text-white px-6 py-2 rounded-xl">
                Book a Call
              </button></div>
              
            </div>

            <div className="bg-[#F7EDFE] rounded-2xl border-[#E5E7EB] p-8 space-y-4">
              <h3 className="text-lg font-semibold text-primary">Get in touch</h3>

              <div className="flex items-center gap-3">
               <Mail className="text-secondary" />
                          <a  href="mailto:info@devisgon.com" className="text-secondary hover:underline" >
                          info@devisgon.com
                           </a>
                        </div>

            <div className="flex items-center gap-3">
               <Phone className="text-secondary" />
             <a    href="tel:+923316944411"   className="text-secondary hover:underline" >
                +92 331 6944411
                 </a>
                 </div>

                <div className="flex items-center gap-3">
               <MapPin className="text-secondary" />
                  <a
                 href="https://www.google.com/maps/place/Devisgon+(Pvt)+Ltd/@30.8237207,73.4604255,45m/data=!3m1!1e3!4m6!3m5!1s0x8651e3cac465d70b:0xab20c32304ca36ad!8m2!3d30.8237237!4d73.4606447!16s%2Fg%2F11lv554tyx?hl=en&entry=ttu&g_ep=EgoyMDI2MDEwNi4wIKXMDSoKLDEwMDc5MjA3MUgBUAM%3D"
                  target="_blank"
                 rel="noopener noreferrer"
                   className="text-secondary hover:underline" >
                    Okara, Pakistan
                         </a>
                   </div>
                   <div className="flex flex-row gap-4 justify-start p-4">
                    <div className="bg-[#EAD5F9] border-[#E5E7EB] rounded-2xl p-4 text-secondary text-3xl  transition-transform duration-500 ease-in-out hover:rotate-y-180"> <a href="https://www.facebook.com/Devisgon/">  <FaSquareFacebook /> </a></div>
                    <div className="bg-[#EAD5F9] border-[#E5E7EB] rounded-2xl p-4 text-secondary text-3xl transition-transform duration-500 ease-in-out hover:rotate-y-180"> <a href="https://www.linkedin.com/company/devisgon/posts/?feedView=all"> <IoLogoLinkedin /> </a></div>
                    <div className="bg-[#EAD5F9] border-[#E5E7EB] rounded-2xl p-4 text-secondary text-3xl transition-transform duration-500 ease-in-out hover:rotate-y-180"> <a href="https://www.instagram.com/devisgon?igsh=MXczMDQwcnJkc3djMA=="> <FaInstagram   /> </a></div>

                   </div>
                  

            </div>

          </div>
        </div>
      </section>
    </div>

    <Footer/>
    </>
  );
}
