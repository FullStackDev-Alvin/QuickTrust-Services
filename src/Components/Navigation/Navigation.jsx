const Navigation = ({ onNavClick }) => {
    return (
      <nav className="bg-gray-50 dark:bg-gray-700 mt-20">
        <div className="max-w-screen-xl px-4 py-3 mx-auto">
          <div className="flex items-center">
            <ul className="flex flex-row flex-wrap gap-[20px] justify-center items-center font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
              <li class="bg-button p-2">
                <span onClick={() => onNavClick("new-listings")} className="text-gray-900 dark:text-white hover:underline cursor-pointer">New Listings</span>
              </li>
              <li class="bg-button p-2">
                <span onClick={() => onNavClick("construction")} className="text-gray-900 dark:text-white hover:underline cursor-pointer">Construction</span>
              </li>
              <li class="bg-button p-2">
                <span onClick={() => onNavClick("rentals")} className="text-gray-900 dark:text-white hover:underline cursor-pointer">Rental Vehicles</span>
              </li>
              <li class="bg-button p-2">
                <span onClick={() => onNavClick("land")} className="text-gray-900 dark:text-white hover:underline cursor-pointer">Land Acquisition</span>
              </li>
              <li class="bg-button p-2">
                <span onClick={() => onNavClick("security")} className="text-gray-900 dark:text-white hover:underline cursor-pointer">Security Solutions</span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
};
export default Navigation;