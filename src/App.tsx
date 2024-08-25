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
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
