export const fetchJobListings = async (limit: number, offset: number) => {
  try {
    const response = await fetch(
      "https://api.weekday.technology/adhoc/getSampleJdJSON",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ limit, offset }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch job listings");
    }

    const data = await response.json();
    return data.jdList; // Return the jdList array from the response data
  } catch (error) {
    throw new Error("Failed to fetch job listings");
  }
};
