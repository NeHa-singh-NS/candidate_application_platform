// Home.tsx
import React, { useEffect, useState } from "react";
import JobCard from "../components/Card";
import { fetchJobListings } from "@api/list";
import { Box, Grid } from "@mui/material";
import Widget from "../components/FilterComponent/FilterComponent";

const Home: React.FC = () => {
  const [jobListings, setJobListings] = useState<any[]>([]);
  const [filteredJobListings, setFilteredJobListings] = useState<any[]>([]);
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

  const handleFilter = (filters: any) => {
    console.log("Base Pay Filter:", filters.basePay);
    const filteredJobs = jobListings.filter((job) => {
      if (filters.basePay && typeof filters.basePay === "string") {
        const [minSalary, maxSalary] = filters.basePay.split("-");
        const jobMinSalary = job.minJdSalary || 0;
        const jobMaxSalary = job.maxJdSalary || Number.MAX_SAFE_INTEGER;
        if (
          jobMinSalary < parseInt(minSalary) ||
          jobMaxSalary > parseInt(maxSalary)
        ) {
          return false;
        }
      }

      // Example: Filter by role
      if (filters.role && job.jobRole !== filters.role) {
        return false;
      }
      if (
        filters.companyName &&
        job.companyName.toLowerCase() !== filters.companyName.toLowerCase()
      ) {
        return false;
      }

      if (
        filters.experience.length > 0 &&
        !filters.experience.includes(job.experience)
      ) {
        return false;
      }

      // Add more filter conditions as needed
      return true;
    });
    setFilteredJobListings(filteredJobs);
  };
  console.log(filteredJobListings, "fffff");
  return (
    <>
      <Box m={4}>
        <Widget onFilter={handleFilter} />
        <Grid p={4} container spacing={1}>
          {jobListings.length > 0 ? (
            // Render filtered job listings if filter criteria are applied
            filteredJobListings.length > 0 ? (
              filteredJobListings.map((job: any, index: number) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <JobCard job={job} />
                </Grid>
              ))
            ) : (
              // Render all job listings if no filter criteria are applied
              jobListings.map((job: any, index: number) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                  <JobCard job={job} />
                </Grid>
              ))
            )
          ) : (
            <Grid item xs={12}>
              No jobs found.
            </Grid>
          )}
          {loading && <p>Loading...</p>}
        </Grid>
      </Box>
    </>
  );
};

export default Home;
