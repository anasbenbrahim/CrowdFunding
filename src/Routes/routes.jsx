import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from '../Pages/Authentication/Login';
import SignUp from '../Pages/Authentication/SignUp';
import CampaignManager from '../Pages/Campaign/index';
import RootLayout from '../Components/Layout/Layout'

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/ListeCampaign" element={<RootLayout><CampaignManager /></RootLayout>} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;
