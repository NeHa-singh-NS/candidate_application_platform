// Home.tsx
import React, { useEffect, useState } from "react";
import JobCard from "../components/Card";
import { fetchJobListings } from "@api/list";
import { Box, Grid } from "@mui/material";

const Home: React.FC = () => {
  const [jobListings, setJobListings] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);

  const fetchData = async () => {
    try {
      setLoading(true);
      const newJobListings = await fetchJobListings(10, page); // Fetching 10 jobs starting from index 0
      setJobListings((prevListings) => [...prevListings, ...newJobListings]);
      setPage((prevPage) => prevPage + 1);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching job listings:", error);
      setLoading(false);
    }
  };
  const handleScroll = () => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop =
      (document.documentElement && document.documentElement.scrollTop) ||
      document.body.scrollTop;

    if (windowHeight + scrollTop >= documentHeight) {
      if (!loading) {
        // Fetch more job listings if not already loading
        fetchData();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    fetchData();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Box m={4}>
        <Grid p={4} container spacing={1}>
          {jobListings.map((job: any, index: number) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <JobCard job={job} />
            </Grid>
          ))}
          {loading && <p>Loading...</p>}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
