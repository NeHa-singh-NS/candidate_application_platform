import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Chip from "@mui/material/Chip";
import TextField from "@mui/material/TextField";
import CancelIcon from "@mui/icons-material/Cancel";
import { Box, InputLabel } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface MultiSelectProps {
  label: string;
  id?: string;
  options: string[];
  value: string[]; // Change type to always be an array
  onChange: (value: string[]) => void;
}

const MultiSelect: React.FC<MultiSelectProps> = ({
  label,
  id,
  options,
  value = [],
  onChange,
}) => {
  const handleOnChange = (
    event: React.ChangeEvent<{}>,
    newValue: string | string[]
  ) => {
    const newValueArray = Array.isArray(newValue) ? newValue : [newValue];
    onChange(newValueArray);
  };

  return (
    <Box mt={3} sx={{ maxWidth: "fit-content", height: "38px" }}>
      <Autocomplete
        sx={{
          width: "250px",
          minHeight: "38px",
          backgroundColor: "rgb(255, 255, 255)",
          borderColor: "rgb(204, 204, 204)",
          borderRadius: "4px",
          "& .MuiAutocomplete-endAdornment": {
            borderLeft: "2px solid rgb(204, 204, 204)",
            paddingLeft: "8px",
          },
          "& .MuiInputBase-input": {
            fontSize: "12px",
            height: "20px",
            padding: "2px !important",
          },
          "& .MuiChip-root": {
            borderRadius: "8px",
            height: "22px",
            lineHeight: "22px",
          },
        }}
        multiple
        value={undefined} // Ensure value is always an array
        onChange={handleOnChange}
        options={options}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip
              key={index}
              label={option}
              {...getTagProps({ index })}
              deleteIcon={<CancelIcon />}
              // onDelete={() => {
              //   if (typeof onChange === "function") {
              //     const newValueArray = Array.isArray(value)
              //       ? value.filter((val) => val !== option)
              //       : [];
              //     onChange(newValueArray);
              //   }
              // }}
            />
          ))
        }
        renderInput={(params) => (
          <>
            <InputLabel
              sx={{ fontSize: "13px", fontWeight: "500px", color: "black" }}
            >
              {value.length ? label : ""}
            </InputLabel>
            <TextField
              sx={{ height: "38px", fontSize: "12px" }}
              {...params}
              variant="outlined"
              label=""
              placeholder={value.length ? "" : label}
            />
          </>
        )}
      />
    </Box>
  );
};

export default MultiSelect;
