import { JobListing } from "@/types/types"; // Import the JobListing type

// Function to extract unique values for a specific field from an array of objects
export const extractUniqueValues = (
  data: JobListing[],
  field: keyof JobListing
): string[] => {
  const uniqueValues: string[] = [];
  data.forEach((item) => {
    if (item[field] && !uniqueValues.includes(item[field])) {
      uniqueValues.push(item[field]);
    }
  });
  return uniqueValues;
};
