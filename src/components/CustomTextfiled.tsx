// @ts-nocheck
import React from "react";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { Box, InputLabel } from "@mui/material";
interface TextFieldProps {
  label: string;
  value: string;
  onChange: (e: any) => void;
  type?: string;
  maxLength?: number;
  placeholder: string;
}
const CustomTextField = ({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  maxLength,
  ...rest
}: TextFieldProps) => {
  const color = useSelector((state) => state.theme);
  const styles = {
    root: {
      "& .MuiOutlinedInput-root": {
        borderRadius: "4px",
        height: "40px",
        width: "250px",
        fontSize: "12px",
        "&:hover fieldset": {
          borderColor: color,
        },
        "&.Mui-focused fieldset": {
          borderColor: color,
        },
      },
      "& .MuiInputLabel-root": {
        fontSize: 12,

        "&.Mui-focused": {
          borderColor: color,
          color: color,
        },
      },
    },
  };

  return (
    <Box mt={0.8} sx={{ display: "flex", flexDirection: "column" }}>
      <InputLabel
        sx={{
          fontSize: "13px",
          fontWeight: "500px",
          color: "black",
          visibility: value.length > 0 ? "visible" : "hidden",
        }}
      >
        {placeholder}
      </InputLabel>
      <TextField
        placeholder={value.length ? "" : placeholder}
        fullWidth
        variant="outlined"
        sx={styles.root}
        label={label}
        type={type}
        inputProps={{
          style: { borderColor: "#02AABD" },
          ...(maxLength && { maxLength }),
        }}
        onChange={onChange}
        {...rest}
      />
    </Box>
  );
};

export default CustomTextField;
