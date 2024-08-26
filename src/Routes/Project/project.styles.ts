import { SxProps, Theme } from "@mui/material/styles";

export const useStyles = (theme: Theme): { [key: string]: SxProps } => ({
  statusContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    mt: 4,
  },
  container: {
    border: "1px solid black",
    height: 600,
    display: "flex",
    flexDirection: "column",
    flex: 1,
    mr: 2,
    bgcolor: "black",
    borderRadius: 2,
    position: "relative",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
  },
  headerContainer: {
    mt: 5,
  },
  headerText: {
    textAlign: "center",
  },
  addItemButton: {
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
});
