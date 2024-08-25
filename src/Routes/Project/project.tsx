import { Container, Typography, Box, useTheme } from "@mui/material";
import { useEffect } from "react";
import projectService from "../../Services/projectService";
import { useStyles } from "./project.styles";

export default function Projects() {
  const theme = useTheme();
  const classes = useStyles(theme);

  useEffect(() => {
    projectService
      .getProjects()
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Container maxWidth="md">
      <Box>
        <Typography variant="h3">Projects</Typography>
      </Box>
      <Box sx={classes.statusContainer}>
        <Box>To Do</Box>
        <Box>In Progress</Box>
        <Box>Done</Box>
      </Box>
    </Container>
  );
}
