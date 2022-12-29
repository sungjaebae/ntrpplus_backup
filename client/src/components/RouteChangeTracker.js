import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const RouteChangeTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    if (process.env.REACT_APP_GA4) {
      ReactGA.initialize(process.env.REACT_APP_GA4);
    }
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      ReactGA.send({
        hitType: "pageview",
        path: location.pathname,
        location: location.pathname,
        title: location.pathname,
      });
    }
  }, [initialized, location]);
};

export default RouteChangeTracker;
