import { useSelector } from "react-redux";
import { RootState } from "../../State/store";
import { Navigate } from "react-router-dom";

type ProtectedRoutesProps = {
  children: React.ReactNode;
};

export default function ProtectedRoute({ children }: ProtectedRoutesProps) {
  const authenticated = useSelector<RootState>(
    (state) => state.auth.authanticated
  );
  return authenticated ? <>{children}</> : <Navigate to="/" />;
}
