import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage } from "./authen/authPage";
import { Dashboard } from "./dashboard/dashboard";
export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};
