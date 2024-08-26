import { SxProps, Theme } from "@mui/material/styles";

export const useStyles = (theme: Theme): { [key: string]: SxProps } => ({
  mainHeaderText: {
    mt: 2,
    textAlign: "center",
  },
  projectsCard: {
    minHeight: "200px",
    boxShadow: theme.shadows[3],
    mt: 2,
    p: 3,
  },
  projectContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 2,
    borderBottom: "1px solid #ccc",
    p: 1,
  },
  fixedButton: {
    position: "fixed",
    bottom: 30,
    right: 30,
  },
});
