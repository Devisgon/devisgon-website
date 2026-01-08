
const Footer = () => {
  return (
    <footer className="bg-bg-primary pt-16 pb-8 px-6 md:px-12 lg:px-20 text-primary">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
          
          <div className="flex flex-col items-start gap-6">
            <img
          src="/logo/logo.svg"
          alt="logo"
         />
            
            <div className="flex flex-col gap-3 text-sm md:text-base font-medium opacity-80">
              <a href="mailto:info@devisgon.com" className="hover:text-[#8B3DFF] hover:border-b-2">
                info@devisgon.com
              </a>
              <a href="tel:03316944411" className="hover:text-[#8B3DFF]">
                0331 6944411
              </a>
            </div>
          </div>

          {/* Column 2: Company Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Company</h3>
            <ul className="flex flex-col gap-4 text-secondary text-sm md:text-[15px]">
              <li><a href="/" className="hover:opacity-80 transition-opacity">Home</a></li>
              <li><a href="#about" className="hover:opacity-80 transition-opacity">About Us</a></li>
              <li><a href="/services" className="hover:opacity-80 transition-opacity">Services</a></li>
              <li><a href="/contact" className="hover:opacity-80 transition-opacity">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: Help Links */}
          <div>
            <h3 className="font-bold text-lg mb-6">Help</h3>
            <ul className="flex flex-col gap-4 text-secondary text-sm md:text-[15px]">
              <li><a href="/contact'o" className="hover:opacity-80 transition-opacity">Customer Support</a></li>
              <li><a href="/terms_condition" className="hover:opacity-80 transition-opacity">Terms & Conditions</a></li>
              <li><a href="/privacy_policies" className="hover:opacity-80 transition-opacity">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="font-bold text-lg mb-6">Newsletter</h3>
            <form className="flex flex-col gap-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="w-full px-4 py-3 rounded-lg border border-[#E0D4F5] bg-white text-sm focus:outline-none focus:border-secondary placeholder:text-secondary placeholder:text-sm"
              />
              <button
                type="button"
                className="w-full py-3 bg-secondary text-white rounded-lg text-sm font-semibold hover:bg-primary   transition-colors shadow-md"
              >
                Subscribe Now
              </button>
            </form>
          </div>

        </div>

        <div className="border-t border-primary pt-8 text-center">
          <p className="text-primary text-sm">
            © Copyright 2025–27, All Rights Reserved by Devigson
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;