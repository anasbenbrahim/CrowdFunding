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
 import Layout from "../components/Layout";
 
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
         
         <Route 
           path="/" 
           element={ 
             <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip"> 
                 <LandingPage /> 
             </div> 
           } 
         /> 
         <Route 
           path="/communities" 
           element={ 
             <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip"> 
               <Layout> 
                 <CommunitiesPage /> 
               </Layout> 
             </div> 
           } 
         /> 
         <Route 
           path="/community/:id" 
           element={ 
             <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip"> 
               <Layout> 
                 <CommunityPage /> 
               </Layout> 
             </div> 
           } 
         /> 
         <Route 
           path="/Campaigns" 
           element={ 
             <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip"> 
               <Layout> 
                 <CampaignsPage /> 
               </Layout> 
             </div> 
           } 
         /> 
         <Route 
           path="/project/:id" 
           element={ 
             <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip"> 
               <Layout> 
                 <ProjectDetailPage /> 
               </Layout> 
             </div> 
           } 
         /> 
         <Route 
           path="/create-project" 
           element={ 
             <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip"> 
               <Layout> 
                 <CreateProjectPage /> 
               </Layout> 
             </div> 
           } 
         /> 
         <Route 
           path="/ProjectDetail" 
           element={ 
             <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip"> 
               <Layout> 
                 <ProjectDetailPage /> 
               </Layout> 
             </div> 
           } 
         /> 
         <Route 
           path="/payments" 
           element={ 
             <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip"> 
               <Layout> 
                 <PaymentsPage /> 
               </Layout> 
             </div> 
           } 
         /> 
       </Routes> 
     </Router> 
   ); 
 } 
 
 export default AppRoutes;