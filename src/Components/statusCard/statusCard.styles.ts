import { SxProps, Theme } from "@mui/material/styles";

export const useStyles = (theme: Theme): { [key: string]: SxProps } => ({
  container: {
    p: 1,
    m: 1,
    bgcolor: "#505050",
    borderRadius: 2,
    position: "relative",
  },
});
