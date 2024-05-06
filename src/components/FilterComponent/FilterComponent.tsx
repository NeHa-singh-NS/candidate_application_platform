import React, { useEffect, useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Button,
} from "@mui/material";
import { fetchDropdownOptions } from "@api/options";
import MultiSelect from "../SelectComponent";

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

  const experienceOptions = ["All", "0-2 years", "2-5 years", "5+ years"];
  const minimumPayOptions = ["All", "0-50k", "51k-100k", "101k-150k"];
  const [options, setOptions] = useState<Record<string, string[]>>({});
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const dropdownOptions = await fetchDropdownOptions(); // Fetch dropdown options
      console.log(dropdownOptions, "dropss");
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

  //   const handleRemoteChange = (value: string[]) => {
  //     onFilter({ ...filters, remote: value.join(",") });
  //   };

  //   const handleBasePayChange = (value: string[]) => {
  //     onFilter({ ...filters, basePay: value.join(",") });
  //   };

  const handleApplyFilter = () => {
    onFilter(filters);
  };
  console.log(options, "options");
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3} sm={2}>
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
      <Grid item xs={12} md={3} sm={2}>
        <FormControl fullWidth variant="outlined" size="small">
          {/* <Select
            labelId="experience-label"
            id="experience"
            value={filters.experience}
            onChange={(e) =>
              handleFilterChange("experience", e.target.value as string)
            }
          >
            {experienceOptions.map((exp, index) => (
              <MenuItem key={index} value={exp}>
                {exp}
              </MenuItem>
            ))}
          </Select> */}
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
      <Grid item xs={12} md={3} sm={2}>
        <FormControl fullWidth variant="outlined" size="small">
          {/* <Select
            labelId="remote-label"
            id="remote"
            value={filters.remote}
            onChange={(e) =>
              handleFilterChange("remote", e.target.value as string)
            }
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="yes">Yes</MenuItem>
            <MenuItem value="no">No</MenuItem>
          </Select> */}
          <MultiSelect
            label="Remote"
            options={["Admin", "User", "Manager", "Developer"]}
            value={selectedRoles}
            onChange={handleRoleChange}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12} md={3} sm={2}>
        {/* <Select
            labelId="base-pay-label"
            id="base-pay"
            value={filters.basePay}
            onChange={(e) =>
              handleFilterChange("basePay", e.target.value as string)
            }
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="0-50k">0-50k</MenuItem>
            <MenuItem value="51k-100k">51k-100k</MenuItem>
            <MenuItem value="101k-150k">101k-150k</MenuItem>
          </Select> */}
        <MultiSelect
          label="Minimum Base Pay"
          options={minimumPayOptions}
          value={filters.basePay}
          onChange={(value: string[]) => {
            handleFilterChange("basePay", value.join(","));
            onFilter({ ...filters, basePay: value.join(",") });
          }}
        />
      </Grid>
      <Grid item xs={12} md={3} sm={2}>
        {/* <FormControl fullWidth variant="outlined" size="small">
          <TextField
            id="companyName"
            label="Company Name"
            variant="outlined"
            size="small"
            value={filters.companyName}
            onChange={(e) => handleFilterChange("companyName", e.target.value)}
          />
        </FormControl> */}
      </Grid>
      {/* <Grid item xs={12} sm={2}>
        <Button
          variant="contained"
          onClick={handleApplyFilter}
          sx={{ borderRadius: "8px" }}
        >
          Apply Filters
        </Button>
      </Grid> */}
    </Grid>
  );
};

export default Widget;
