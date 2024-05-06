import React, { useEffect, useState } from "react";
import { FormControl, Grid } from "@mui/material";
import { fetchDropdownOptions } from "@api/options";
import MultiSelect from "../SelectComponent";
import CustomTextField from "../CustomTextfiled";

interface FilterOptions {
  role: string[];
  employees: string[];
  experience: string[];
  remote: string[];
  basePay: string;
  companyName: String;
}

interface WidgetProps {
  onFilter: (filters: FilterOptions) => void;
}

const Widget: React.FC<WidgetProps> = ({ onFilter }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    role: [],
    employees: [],
    experience: [],
    remote: [],
    basePay: "",
    companyName: "",
  });

  const experienceOptions = Array.from({ length: 11 }, (_, i) => i); // Experience options from 0 to 10
  const minimumPayOptions = [
    "0-10L",
    "11L-20L",
    "21L-30L",
    "31L-40L",
    "41L-50L",
    "51L-60L",
    "61L-70L",
  ]; // Minimum base pay options from 0L to 70L
  const [options, setOptions] = useState<Record<string, string[]>>({});
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const dropdownOptions = await fetchDropdownOptions(); // Fetch dropdown options
      setOptions(dropdownOptions);
    } catch (error) {
      console.error("Error fetching dropdown options:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handleFilterChange = (
    filterName: keyof FilterOptions,
    value: string | string[]
  ) => {
    console.log(filterName, value);
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
    onFilter({ ...filters, [filterName]: value });
  };

  useEffect(() => {
    onFilter(filters); // Apply filters immediately on mount
  }, [filters]);

  const handleRoleChange = (selectedRoles: string[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      role: selectedRoles,
    }));
    onFilter(filters);
  };

  const handleExperienceChange = (value: string[]) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      experience: value,
    }));
    onFilter({ ...filters, experience: value });
  };

  return (
    <Grid justifyContent="center" container spacing={2}>
      <Grid mr={2} item sm={6} md={4} lg={3} xl={2}>
        <FormControl fullWidth variant="outlined" size="small">
          <MultiSelect
            label="Roles"
            options={options.roles || []}
            value={filters.role}
            onChange={(value: string[]) =>
              handleFilterChange("role", value.join(","))
            }
          />
        </FormControl>
      </Grid>
      {/* <Grid item xs={12} sm={2}>
        <FormControl fullWidth variant="outlined" size="small">
          <InputLabel id="employees-label">Number Of Employees</InputLabel>
          <Select
            labelId="employees-label"
            id="employees"
            value={filters.employees}
            onChange={(e) =>
              handleFilterChange("employees", e.target.value as string)
            }
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="1-50">1-50</MenuItem>
            <MenuItem value="51-100">51-100</MenuItem>
            <MenuItem value="101-500">101-500</MenuItem>
          </Select>
        </FormControl>
      </Grid> */}
      <Grid mr={2} item sm={6} md={4} lg={3} xl={2}>
        <FormControl fullWidth variant="outlined" size="small">
          <MultiSelect
            label="Experience"
            options={experienceOptions}
            value={filters.experience}
            onChange={(value: string[]) =>
              handleFilterChange("experience", value.join(","))
            }
          />
        </FormControl>
      </Grid>
      <Grid mr={2} item sm={6} md={4} lg={3} xl={2}>
        <FormControl fullWidth variant="outlined" size="small">
          <MultiSelect
            label="Remote"
            options={["Remote", "Hybrid", "Onsite"]}
            value={filters.remote}
            onChange={(value: string[]) =>
              handleFilterChange("remote", value.join(","))
            }
          />
        </FormControl>
      </Grid>
      <Grid mr={2} item sm={6} md={4} lg={3} xl={2}>
        <FormControl fullWidth variant="outlined" size="small">
          <MultiSelect
            label="Minimum Base Pay"
            options={minimumPayOptions}
            value={filters.basePay}
            onChange={(value: string[]) => {
              handleFilterChange("basePay", value.join(","));
            }}
          />
        </FormControl>
      </Grid>
      <Grid mr={2} item sm={6} md={4} lg={3} xl={2}>
        <CustomTextField
          placeholder="Search Company Name"
          label=""
          value={filters.companyName}
          onChange={(e) => handleFilterChange("companyName", e.target.value)}
        />
      </Grid>
    </Grid>
  );
};

export default Widget;
