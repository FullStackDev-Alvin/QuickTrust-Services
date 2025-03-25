import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { animate } from "framer-motion";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    animate(window.scrollY, 0, {
      type: "spring",
      stiffness: 50,
      damping: 15,
      onUpdate: (latest) => window.scrollTo(0, latest),
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;