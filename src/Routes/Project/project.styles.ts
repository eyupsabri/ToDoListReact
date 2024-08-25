import { SxProps, Theme } from "@mui/material/styles";

export const useStyles = (theme: Theme): { [key: string]: SxProps } => ({
  statusContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    mt: 2,
  },
});
