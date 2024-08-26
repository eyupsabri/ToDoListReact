import { useDrag } from "react-dnd";
import { TaskType } from "../../types/Task.type";
import {
  Box,
  Typography,
  useTheme,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { useStyles } from "./statusCard.styles";
import { formatDate } from "../../Helpers/helpers";
import { useState } from "react";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditTaskModal from "../editTaskModal/editTaskModal";
import { PriorityEnum } from "../../types/Priority.enum";

type StatusCardProps = {
  task: TaskType;
};

export default function StatusCard({ task }: StatusCardProps) {
  const theme = useTheme();
  const classes = useStyles(theme);

  const [openModal, setOpenModal] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { task: task },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [isHovered, setIsHovered] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const openEditModalTask = () => {
    setAnchorEl(null);
    setOpenModal(true);
  };

  return (
    <Box
      ref={drag}
      sx={{
        opacity: isDragging ? 0.5 : 1,
        border:
          task.priority === PriorityEnum.LOW
            ? "1px solid green"
            : task.priority === PriorityEnum.MEDIUM
            ? "1px solid yellow"
            : "1px solid red",
        ...classes.container,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Typography color={"white"} variant="subtitle2">
        Task Name: {task.taskName}
      </Typography>
      <Typography color={"white"} variant="subtitle2">
        Assigned to: {task.assignedTo}
      </Typography>
      <Typography color={"white"} variant="subtitle2">
        Due date: {formatDate(task.dueDate)}
      </Typography>
      {isHovered && (
        <IconButton
          sx={{
            position: "absolute",
            top: "8px",
            right: "8px",
            color: "white",
          }}
          size="small"
          onClick={handleClick}
        >
          <MoreVertIcon />
        </IconButton>
      )}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={openEditModalTask}>Edit</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>
      <EditTaskModal
        task={task}
        open={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </Box>
  );
}
