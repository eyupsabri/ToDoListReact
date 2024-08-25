import { SxProps, Theme } from "@mui/material/styles";

export const useStyles = (theme: Theme): { [key: string]: SxProps } => ({
  linkContainer: {
    display: "flex",
    flexDirection: "column",
    gap: 2,
    ml: 2,
    mr: 2,
    mt: 5,
    alignItems: "flex-start",
  },
});
