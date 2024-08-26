import {
  Box,
  FormControl,
  InputLabel,
  Menu,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useStyles } from "./editTaskModal.styles";
import { TaskType } from "../../types/Task.type";
import { DatePicker } from "@mui/x-date-pickers";
import { useEffect, useState } from "react";
import userService from "../../Services/userService";
import { UserType } from "../../types/User.type";
import { PriorityEnum } from "../../types/Priority.enum";
import { Controller, useForm } from "react-hook-form";

type EditTaskModalProps = {
  open: boolean;
  handleClose: () => void;
  task: TaskType;
};

export default function EditTaskModal({
  open,
  handleClose,
  task,
}: EditTaskModalProps) {
  const theme = useTheme();
  const classes = useStyles(theme);
  const [dueDate, setDueDate] = useState<Date | null>(task.dueDate);
  const [assignedTo, setAssignedTo] = useState(task.assignedTo);
  const [users, setUsers] = useState<UserType[]>();
  const [priority, setPriority] = useState(task.priority);

  const handleChange = (event: SelectChangeEvent) => {
    setAssignedTo(event.target.value as string);
  };
  const handleChangePriority = (event: SelectChangeEvent) => {
    setPriority(+(event.target.value as string));
  };

  const formMethods = useForm({
    mode: "onSubmit",
    defaultValues: {
      taskName: task.taskName,
      description: task.description,
    },
  });
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = formMethods;

  useEffect(() => {
    userService
      .getAllUsers()
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [task]);
  return (
    <Modal
      open={open}
      onClose={() => {
        setAssignedTo(task.assignedTo);
        setPriority(task.priority);
        handleClose();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={classes.container}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              id="outlined-basic"
              label="Task Name"
              variant="outlined"
              sx={{ mb: 2 }}
              onChange={onChange}
              value={value}
            />
          )}
          name="taskName"
          rules={{
            required: "Gerekli alan.",
          }}
        />
        {errors.taskName && (
          <Typography sx={{ mt: -1 }} color="error">
            {errors.taskName.message}
          </Typography>
        )}
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              sx={{ mb: 2 }}
              onChange={onChange}
              value={value}
              multiline
            />
          )}
          name="description"
          rules={{
            required: "Gerekli alan.",
          }}
        />
        {errors.description && (
          <Typography sx={{ mt: -1 }} color="error">
            {errors.description.message}
          </Typography>
        )}
        <DatePicker
          format="dd/MM/yyyy"
          value={dueDate}
          label="Due Date"
          onChange={(newValue) => {
            setDueDate(newValue);
          }}
        />
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Assigned To</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={assignedTo}
            label="Assigned To"
            onChange={handleChange}
          >
            {users?.map((user) => (
              <MenuItem key={user.userId} value={user.userName}>
                {user.userName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Priority</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={priority + ""}
            label="Priority"
            onChange={handleChangePriority}
          >
            <MenuItem value={PriorityEnum.LOW}>Low</MenuItem>
            <MenuItem value={PriorityEnum.MEDIUM}>Medium</MenuItem>
            <MenuItem value={PriorityEnum.HIGH}>High</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Modal>
  );
}
