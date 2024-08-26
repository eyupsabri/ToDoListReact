export type TaskType = {
  taskId: number;
  taskName: string;
  description: string;
  status: number;
  priority: number;
  dueDate: Date;
  projectName: string;
  assignedTo: string;
  createdBy: string;
  createdAt: Date;
};
