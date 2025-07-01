import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import CommunitiesPage from "./pages/CommunitiesPage";
import CommunityPage from "./pages/CommunityPage";
import CampaignsPage from "./pages/CampaignsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import CreateProjectPage from "./pages/CreateProjectPage";
import PaymentsPage from "./pages/PaymentsPage";

function App() {
  return (
    <BrowserRouter>
      <div className="App min-h-screen bg-gray-100 text-gray-800">
        <Layout>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/communities" element={<CommunitiesPage />} />
            <Route path="/community/:id" element={<CommunityPage />} />
            <Route path="/Campaigns" element={<CampaignsPage />} />
            <Route path="/project/:id" element={<ProjectDetailPage />} />
            <Route path="/create-project" element={<CreateProjectPage />} />
            <Route path="/ProjectDetail" element={<ProjectDetailPage />} />
            <Route path="/payments" element={<PaymentsPage />} />
          </Routes>
        </Layout>
      </div>
    </BrowserRouter>
  );
}

export default App;
