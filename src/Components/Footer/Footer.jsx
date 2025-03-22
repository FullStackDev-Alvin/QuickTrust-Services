import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  React.useEffect(() => {
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
  }, []);

  return (
    <footer className="w-full mb-20 bg-bg lg:mt-14">
      <div className="w-full px-8 mx-auto max-w-7xl">
        <div className="grid justify-between grid-cols-1 gap-4 md:grid-cols-2">
          <h5 className="mb-6 text-xl font-semibold text-primary">
            QuickTrust - Services
          </h5>
          <div className="grid justify-between grid-cols-3 gap-4">
            {/* <ul>
              <p className="block mb-1 text-base font-semibold text-slate-800">Listings</p>
              <li>
                <Link to="/rental-vehicles" className="block text-slate-600 py-1 hover:text-slate-500 focus:text-slate-500 text-sm">
                  Rental Vehicles
                </Link>
              </li>
              <li>
                <Link to="/real-estate" className="block text-slate-600 py-1 hover:text-slate-500 focus:text-slate-500 text-sm">
                  Real Estate
                </Link>
              </li>
              <li>
                <Link to="/security-solutions" className="block text-slate-600 py-1 hover:text-slate-500 focus:text-slate-500 text-sm">
                  Security Solutions
                </Link>
              </li>
              <li>
                <Link to="/construction-materials" className="block text-slate-600 py-1 hover:text-slate-500 focus:text-slate-500 text-sm">
                  Construction Materials
                </Link>
              </li>
            </ul> */}
            <ul>
              <p className="block mb-1 text-primary font-semibold ">Quick Actions</p>
              <li>
                <Link to="/contact" className="block text-primary py-1  text-sm">
                  Contact us
                </Link>
              </li>
              <li>
                <Link to="/listings" className="block text-primary py-1  text-sm">
                  Listings
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full py-4 mt-12 border-t border-slate-200 md:flex-row md:justify-between">
          <p className="block mb-4 text-sm text-center text-primary md:mb-0">
            Copyright © <span id="current-year"></span>
            <Link to="/" className="text-primary hover:text-primary">QuickTrust - Services</Link>. All Rights Reserved.
          </p>
          <div className="flex gap-4 text-primary sm:justify-center">
            <Link to="https://web.facebook.com/people/Quicktrustservices/61573622545349/" className="block transition-opacity text-inherit hover:opacity-80">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
              </svg>
            </Link>
            <Link to="https://www.instagram.com/quicktrust_services/" className="block transition-opacity text-inherit hover:opacity-80">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
              </svg>
            </Link>
            <Link to="https://x.com/QuickTrust_S" className="block transition-opacity text-inherit hover:opacity-80">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M17.21 3H20.88L13.8 10.66L22 21H15.82L10.86 14.79L5.2 21H1.52L9 12L1 3H7.34L11.9 8.65L17.21 3ZM16 19H17.69L6.57 4H4.72L16 19Z"></path>
              </svg>
            </Link>
            <Link to="mailto:quicktrustservices@gmail.com" className="block transition-opacity text-inherit hover:opacity-80">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 4H4C2.89 4 2 4.89 2 6V18C2 19.11 2.89 20 4 20H20C21.11 20 22 19.11 22 18V6C22 4.89 21.11 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z"></path>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
