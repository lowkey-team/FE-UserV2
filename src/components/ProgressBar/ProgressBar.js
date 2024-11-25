import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { useEffect } from "react";

NProgress.configure({
  showSpinner: false,
  speed: 300,
  minimum: 0.3,
  easing: "ease",
  trickleSpeed: 200,
});
const ProgressBar = ({ isLoading }) => {
  useEffect(() => {
    if (isLoading) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isLoading]);

  return null;
};

export default ProgressBar;
