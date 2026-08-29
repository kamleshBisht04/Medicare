/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0); // Instantly jumps to top on route change
  }, [[pathname]]);
  return null;
};

export default ScrollToTop;
