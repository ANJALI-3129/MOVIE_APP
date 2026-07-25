import { useState, useEffect } from "react";
import { getMovieDetails, getWatchProviders } from "../API/api";

const useMovieDetails = (type, id) => {
  const [data, setData] = useState(null);
  const [providers, setProviders] = useState([]);
  const [watchLink, setWatchLink] = useState("");

  useEffect(() => {
    const loadDetails = async () => {
      try {
        const details = await getMovieDetails(type, id);

        const providerData = await getWatchProviders(type, id);

        const results = providerData.results || {};

        const country =
          results.IN ||
          results.US ||
          results.AU ||
          results.CA ||
          Object.values(results)[0];

        setData(details);
        setProviders(country?.flatrate || []);
        setWatchLink(country?.link || "");
      } catch (err) {
        console.error(err);
      }
    };
    loadDetails();
  }, [type, id]);

  return {
    data,
    providers,
    watchLink,
  };
};

export default useMovieDetails;
