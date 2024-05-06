import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Avatar,
  Stack,
  Box,
  Popover,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { JobListing } from "../types/types";
import Image from "next/image";
import ApprovalIcon from "@mui/icons-material/Approval";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  job: JobListing;
}

const JobCard: React.FC<Props> = ({ job }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const [open, setOpen] = React.useState(false);

  const {
    jobRole,
    companyName,
    location,
    jobDetailsFromCompany,
    minExp,
    maxExp,
    minJdSalary,
    maxJdSalary,
    logoUrl,
    jdLink,
  } = job;
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card elevation={5} sx={{ minWidth: 200, margin: 2, borderRadius: "20px" }}>
      <Chip
        sx={{ m: 1, p: 1.8, borderRadius: "10px", borderColor: "#9BABB8" }}
        icon={<ApprovalIcon />}
        label="Posted 2 days ago"
        variant="outlined"
        size="small"
      />
      <CardContent>
        <Box display="flex">
          <Image width={50} height={80} src={logoUrl} alt={companyName} />
          <Box ml={1}>
            <Typography
              sx={{ color: "grey" }}
              variant="body2"
              component="div"
              gutterBottom
            >
              {companyName}
            </Typography>
            <Typography variant="body1" component="div" gutterBottom>
              {jobRole}
            </Typography>
            <Typography fontSize="12px" variant="subtitle2">
              {location}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent="flex-start" alignItems="center">
          <Typography
            mt={0.5}
            variant="body2"
            sx={{ color: "#9BABB8" }}
            gutterBottom
          >
            Estimated Salary: {minJdSalary} - {maxJdSalary} LPA ✅
          </Typography>
        </Box>
        <Typography variant="body2">About Company:</Typography>
        <Typography
          sx={{ fontWeight: "700" }}
          variant="subtitle1"
          fontWeight="bolder"
        >
          About Us
        </Typography>
        <Typography variant="body2" style={{ position: "relative" }}>
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              display: "-webkit-box",
              WebkitLineClamp: expanded ? "unset" : 5,
              WebkitBoxOrient: "vertical",
              maxHeight: expanded ? "unset" : "5.5em", // Adjust based on line height
            }}
          >
            {expanded
              ? jobDetailsFromCompany
              : jobDetailsFromCompany.slice(0, 200)}
          </span>
          {!expanded && (
            <span
              style={{
                position: "absolute",
                left: 0,
                right: 8,
                top: 20,
                bottom: 30,
                background:
                  "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.6) 30%, rgba(255,255,255,1) 100%)",
              }}
            />
          )}
          {jobDetailsFromCompany.length > 200 && !expanded && (
            <Button
              onClick={handleClickOpen}
              style={{
                display: "block",
                margin: "0 auto",
                textTransform: "none",
              }}
            >
              View Job
            </Button>
          )}
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"About the Company"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {jobDetailsFromCompany}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </Typography>
        <Typography variant="body1" gutterBottom>
          <Typography variant="subtitle1" fontWeight="bold">
            Minimum Experience:
          </Typography>
          {minExp} - {maxExp} years
        </Typography>
        <Button
          variant="contained"
          sx={{
            color: "#000",
            fontWeight: "600",
            borderRadius: "12px",
            width: "100%",
            marginTop: "2px",
            backgroundColor: "#54EFC3",
            textTransform: "none",
          }}
        >
          ⚡Easy Apply
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#4943DA",
            width: "100%",
            marginTop: "2px",
            borderRadius: "12px",
            textTransform: "none",
            mt: 1,
          }}
        >
          <Stack
            direction="row"
            display="flex"
            justifyContent="center"
            alignItems="center"
            spacing={1}
          >
            <Avatar
              sx={{ filter: "blur(2px)", height: "35px", width: "35px" }}
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            />
            <Avatar
              sx={{ filter: "blur(2px)", height: "35px", width: "35px" }}
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            />
            <Typography variant="body2">Unlock referral asks</Typography>
          </Stack>
        </Button>
      </CardContent>
    </Card>
  );
};

export default JobCard;
