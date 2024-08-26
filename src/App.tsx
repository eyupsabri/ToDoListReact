import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navigation from "./Routes/navigation/navigation";
import Login from "./Routes/Login/login";
import { Provider } from "react-redux";
import { store } from "./State/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Projects from "./Routes/Projects/projects";
import ProtectedRoute from "./Routes/ProtectedRoute/protectedRoute";
import Project from "./Routes/Project/project";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";

const persistor = persistStore(store);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/projects",
        element: <ProtectedRoute children={<Projects />} />,
      },
      {
        path: "/projects/:projectId",
        element: <ProtectedRoute children={<Project />} />,
      },
    ],
  },
]);

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DndProvider backend={HTML5Backend}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <RouterProvider router={router} />
          </PersistGate>
        </Provider>
      </DndProvider>
    </LocalizationProvider>
  );
}

export default App;
