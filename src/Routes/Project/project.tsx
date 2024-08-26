import { Container, Typography, Box, useTheme, Button } from "@mui/material";
import { useEffect, useState } from "react";
import projectService from "../../Services/projectService";
import { useStyles } from "./project.styles";
import { useParams } from "react-router-dom";
import taskService from "../../Services/taskService";
import { TaskType } from "../../types/Task.type";
import { StatusEnum } from "../../types/Status.enum";
import StatusCard from "../../Components/statusCard/statusCard";
import { useDrop } from "react-dnd";
import TripOriginIcon from "@mui/icons-material/TripOrigin";

export default function Projects() {
  const theme = useTheme();
  const classes = useStyles(theme);
  const { projectId } = useParams<{ projectId: string }>();
  const [tasks, setTasks] = useState<TaskType[]>([]);
  // const [toDo, setToDo] = useState<TaskType[]>([]);
  // const [inProgress, setInProgress] = useState<TaskType[]>([]);
  // const [done, setDone] = useState<TaskType[]>([]);

  useEffect(() => {
    if (projectId && !isNaN(+projectId)) {
      taskService
        .getTasks(+projectId)
        .then((res) => {
          console.log(res.data);
          setTasks([...res.data]);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);
  const toDo = tasks.filter((task) => task.status == StatusEnum.TODO);
  const inProgress = tasks.filter(
    (task) => task.status == StatusEnum.IN_PROGRESS
  );
  const done = tasks.filter((task) => task.status == StatusEnum.DONE);

  const dropToDoHandler = async (item: { task: TaskType }) => {
    let temp = 0;
    const newTasks = tasks.map((task, index) => {
      if (task.taskId === item.task.taskId) {
        task.status = StatusEnum.TODO;
        temp = index;
      }
      return task;
    });
    const removed = newTasks.splice(temp, 1);

    await taskService
      .updateTask({ taskId: removed[0].taskId, status: removed[0].status })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });

    setTasks([...newTasks, removed[0]]);
  };
  const dropInProgressHandler = async (item: { task: TaskType }) => {
    let temp = 0;
    const newTasks = tasks.map((task, index) => {
      if (task.taskId === item.task.taskId) {
        task.status = StatusEnum.IN_PROGRESS;
        temp = index;
      }
      return task;
    });
    const removed = newTasks.splice(temp, 1);
    await taskService
      .updateTask({ taskId: removed[0].taskId, status: removed[0].status })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setTasks([...newTasks, removed[0]]);
  };
  const dropDoneHandler = async (item: { task: TaskType }) => {
    let temp = 0;
    const newTasks = tasks.map((task, index) => {
      if (task.taskId === item.task.taskId) {
        task.status = StatusEnum.DONE;
        temp = index;
      }
      return task;
    });
    const removed = newTasks.splice(temp, 1);
    await taskService
      .updateTask({ taskId: removed[0].taskId, status: removed[0].status })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    setTasks([...newTasks, removed[0]]);
  };

  const [{ isOver: isOverTodo }, dropToDo] = useDrop({
    accept: "TASK",
    drop: dropToDoHandler,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const [{ isOver: isOverInProgress }, dropInProgress] = useDrop({
    accept: "TASK",
    drop: dropInProgressHandler,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  const [{ isOver: isOverDone }, dropDone] = useDrop({
    accept: "TASK",
    drop: dropDoneHandler,
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <Container maxWidth="lg">
      {tasks.length > 0 && (
        <Box sx={classes.headerContainer}>
          <Typography sx={classes.headerText} variant="h4">
            {tasks[0].projectName}
          </Typography>
        </Box>
      )}
      <Box sx={classes.statusContainer}>
        <Box sx={{ width: "100%" }}>
          <Box sx={classes.iconContainer}>
            <TripOriginIcon sx={{ color: "green" }} />
            <Typography variant="h6">To Do</Typography>
          </Box>
          <Box ref={dropToDo} sx={classes.container}>
            {toDo?.map((task) => (
              <StatusCard key={task.taskId} task={task} />
            ))}
            <Button
              variant="contained"
              color="inherit"
              sx={classes.addItemButton}
            >
              Add Item
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box sx={classes.iconContainer}>
            <TripOriginIcon sx={{ color: "#FEBE10" }} />
            <Typography variant="h6">In Progress</Typography>
          </Box>
          <Box ref={dropInProgress} sx={classes.container}>
            {inProgress?.map((task) => (
              <StatusCard key={task.taskId} task={task} />
            ))}
            <Button
              variant="contained"
              color="inherit"
              sx={classes.addItemButton}
            >
              Add Item
            </Button>
          </Box>
        </Box>
        <Box sx={{ width: "100%" }}>
          <Box sx={classes.iconContainer}>
            <TripOriginIcon sx={{ color: "purple" }} />
            <Typography variant="h6">Done</Typography>
          </Box>
          <Box ref={dropDone} sx={classes.container}>
            {done?.map((task) => (
              <StatusCard key={task.taskId} task={task} />
            ))}
            <Button
              variant="contained"
              color="inherit"
              sx={classes.addItemButton}
            >
              Add Item
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
