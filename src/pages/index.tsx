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
      const newJobListings = await fetchJobListings(20, page);
      console.log(newJobListings);
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
    const experienceFilter = Array.isArray(filters.experience)
      ? filters.experience.map((exp: string) => parseInt(exp))
      : [parseInt(filters.experience)];

    let basePayFilter: number[] = [];
    if (filters.basePay) {
      const [min, max] = filters.basePay
        .split("-")
        .map((value) => parseInt(value));
      basePayFilter = [min, max];
    }

    const filteredJobs = jobListings.filter((job) => {
      const location = job.location.toLowerCase();
      const selectedLocation = String(filters.remote).toLowerCase();
      // Check if job meets all filter criteria
      return (
        // Filter by role
        ((filters.role.length === 0 || filters.role.includes(job.jobRole)) &&
          // Filter by company name
          (filters.companyName === "" ||
            job.companyName.toLowerCase() ===
              filters.companyName.toLowerCase()) &&
          // Filter by remote
          ((selectedLocation === "remote" && location === "remote") ||
            (selectedLocation !== "remote" && location !== "remote")) &&
          // Filter by base pay
          (filters.basePay === "" ||
            (job.minJdSalary !== null &&
              job.maxJdSalary !== null &&
              job.minJdSalary >= basePayFilter[0] &&
              job.maxJdSalary <= basePayFilter[1])) &&
          // Filter by experience
          (experienceFilter.length === 0 ||
            (job.minExp !== null &&
              job.maxExp !== null &&
              experienceFilter.some(
                (exp) => job.minExp <= exp && job.maxExp >= exp
              )))) ||
        // If job's experience range is null, include it for any experience selection
        (job.minExp === null &&
          job.maxExp === null &&
          experienceFilter.includes(0))
        // Add more filter conditions as needed
      );
    });
    setFilteredJobListings(filteredJobs);
  };
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
