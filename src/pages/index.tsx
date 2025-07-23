import { Routes, Route } from "react-router-dom";
import { BrandProfile } from "./brandProfile";
import { UserProfile } from "./userProfile";
import { AppPath } from "components";
import Dashboard from "./dashboard";

export default function PagesRoutes() {
  return (
    <Routes>
      <Route path={AppPath.home} element={<Dashboard />} />
      <Route path={AppPath.brandProfile} element={<BrandProfile />} />
      <Route path={AppPath.userProfile} element={<UserProfile />} />
    </Routes>
  );
}
