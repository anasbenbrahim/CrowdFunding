import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/Authentication/Login";
import SignUp from "../pages/Authentication/SignUp";
// import CampaignManager from "../pages/Campaign/index";
import RootLayout from "../components/Layout/Layout";
import LandingPage from "../components/Layout";
import CommunitiesPage from "../pages/CommunitiesPage";
import CommunityPage from "../pages/CommunityPage";
import CampaignsPage from "../pages/CampaignsPage";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import CreateProjectPage from "../pages/CreateProjectPage";
import PaymentsPage from "../pages/PaymentsPage";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/ListeCampaign"
          element={<RootLayout>{/* <CampaignManager /> */}</RootLayout>}
        />
        
        <Route path="/" element={<LandingPage />} />
        <Route path="/communities" element={<CommunitiesPage />} />
        <Route path="/community/:id" element={<CommunityPage />} />
        <Route path="/Campaigns" element={<CampaignsPage />} />
        <Route path="/project/:id" element={<ProjectDetailPage />} />
        <Route path="/create-project" element={<CreateProjectPage />} />
        <Route path="/ProjectDetail" element={<ProjectDetailPage />} />
        <Route path="/payments" element={<PaymentsPage />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
