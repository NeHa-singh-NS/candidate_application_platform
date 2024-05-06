import { extractUniqueValues } from "./utils";
import { fetchJobListings } from "./list";

// Function to fetch dropdown options from the API
export const fetchDropdownOptions = async (): Promise<
  Record<string, string[]>
> => {
  try {
    const jobListings = await fetchJobListings(10, 0);
    const roles = extractUniqueValues(jobListings, "jobRole");
    const locations = extractUniqueValues(jobListings, "location");

    return { roles, locations }; // Return dropdown options
  } catch (error) {
    console.error("Error fetching dropdown options:", error);
    throw new Error("Failed to fetch dropdown options");
  }
};
