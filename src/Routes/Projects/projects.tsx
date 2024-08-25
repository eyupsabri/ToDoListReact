import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  useTheme,
} from "@mui/material";
import { useStyles } from "./projects.styles";
import { useEffect, useState } from "react";
import projectService from "../../Services/projectService";
import { ProjectType } from "../../types/Project.type";
import { formatDate } from "../../Helpers/helpers";

export default function Projects() {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const theme = useTheme();
  const classes = useStyles(theme);
  console.log(projects[0]);
  useEffect(() => {
    projectService
      .getProjects()
      .then((res) => {
        setProjects([...res.data]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Container maxWidth="xl">
      <Typography variant="h3" sx={classes.mainHeaderText}>
        Projects
      </Typography>
      <Box sx={classes.projectsCard}>
        <Grid container spacing={2} sx={classes.projectContainer}>
          <Grid item xs={1}>
            <Typography variant="h6">Index</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">Project Name</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">Created At</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">Created By</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="h6">Actions</Typography>
          </Grid>
        </Grid>
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <Grid
              container
              spacing={2}
              key={project.projectId}
              sx={classes.projectContainer}
            >
              <Grid item xs={1}>
                <Typography variant="subtitle1">{index + 1}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle1">
                  {project.projectName}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle1">
                  {formatDate(new Date(project.createdAt))}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography variant="subtitle1">{project.createdBy}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Button variant="contained" sx={{ mr: 2 }}>
                  View
                </Button>
                <Button variant="contained">Delete</Button>
              </Grid>
            </Grid>
          ))
        ) : (
          <Box>
            <Typography variant="h6">No projects found</Typography>
          </Box>
        )}
      </Box>
    </Container>
  );
}
