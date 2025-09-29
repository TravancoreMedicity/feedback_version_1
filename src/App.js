import React, { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import "./App.css";
import Home from "./Pages/Home";
import Colors from "./Pages/Colors";
import ErrorElement from "./Pages/ErrorElement";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider } from "./Context/AuthProvider";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CustomBackDropWithOutState from "./Components/CustomBackDropWithOutState";
import CommonFinalFeedSkeleton from './Feedback/Commoncomponents/commonFinalFeedSkeleton';
import AllReports from "./Modules/Reports/AllReports.jsx";
import CommonFeedbackReport from "./Modules/Reports/CommonFeedbackReport/CommonFeedbackReport.jsx";
import IpFeedbackReport from "./Modules/Reports/IpFeedbackReport/IpFeedbackReport.jsx";



// import { socket } from "./ws/socket";
// import Scanner from "./Components/Scanner.jsx";
// import HkContainer from "./Modules/HouseKeeping.jsx/HkContainer.jsx";
// import DischargePatient from "./Modules/DischargePatientFeedback/DischargePatient.jsx";

// Main Modules
const Dashboard = lazy(() => import("./Modules/Dashboard/Dashboard.jsx"));
const RoootLayouts = lazy(() => import("./routes/RoootLayouts"));
const Settings = lazy(() => import("./Modules/Settings/Settings.jsx"));

//all components

const RootLayoutSkeleton = lazy(() => import("./Components/RootLayoutSkeleton.jsx"));
const HkEmployeeDetailMaster = lazy(() => import("./Masters/HkEmployeeDetailMaster.jsx"));
const DischargeRoomCleaningMaster = lazy(() => import("./Masters/DischargeRoomCleaningMaster.jsx"));
const Qrscan = lazy(() => import("./Pages/Qrscan.jsx"));
const FeedBackSubCategoryMaster = lazy(() => import("./Modules/Settings/FeedBackSubCategoryMaster/FeedBackSubCategoryMaster"));
const FeedBackCategoryMaster = lazy(() => import("./Modules/Settings/FeedBackCategoryMaster/FeedBackCategoryMaster.jsx"));
const FeedBackColletionType = lazy(() => import("./Modules/Settings/FeedBackColletionType/FeedBackColletionType.jsx"));
const Feedback = lazy(() => import("./Modules/FeedbackForms/Feedback.jsx"));
const FeedbackMaster = lazy(() => import("./Modules/Settings/FeedbackMaster/FeedbackMaster.jsx"));
const FeedBackDetail = lazy(() => import("./Modules/Settings/FeedBackDetail/FeedBackDetail.jsx"));
const FeedbackForm = lazy(() => import("./Modules/FeedbackForms/FeedbackForm.jsx"));
const Feedbackcollection = lazy(() => import("./Modules/FeedbackCollections/Feedbackcollection.jsx"));
const ModuleMaster = lazy(() => import("./Masters/ModuleMaster.jsx"));
const MenuMaster = lazy(() => import("./Masters/MenuMaster.jsx"));
const UserGroupMaster = lazy(() => import("./Masters/UserGroupMaster.jsx"));
const UserGroupRightMaster = lazy(() => import("./Masters/UserGroupRightMaster.jsx"));
const UserRightMaster = lazy(() => import("./Masters/UserRightMaster.jsx"));
const UserModuleRightMaster = lazy(() => import("./Masters/UserModuleRightMaster.jsx"));
const NurstationMaster = lazy(() => import("./Masters/NurstationMaster.jsx"));
const Maintenance = lazy(() => import("./Modules/Maintentance/Maintenance.jsx"));
const InfromationTechnology = lazy(() => import("./Modules/IT/InfromationTechnology.jsx"));
const Biomedical = lazy(() => import("./Modules/Biomedical/Biomedical.jsx"));
// const HouseKeeping = lazy(() => import("./Modules/HouseKeeping.jsx/HouseKeeping.jsx"));
const RoomMaster = lazy(() => import("./Masters/RoomMaster.jsx"));
const AssetIemMaster = lazy(() => import("./Masters/AssetIemMaster.jsx"));
const AssetMapMaster = lazy(() => import("./Masters/AssetMapMaster.jsx"));
const RoomChecklistMaster = lazy(() => import("./Masters/RoomChecklistMaster.jsx"));
const Prochecklist = lazy(() => import("./Modules/ProchecheckList/Prochecklist.jsx"));
const HkContainer = lazy(() => import("./Modules/HouseKeeping.jsx/HkContainer.jsx"));
const DischargePatient = lazy(() => import("./Modules/DischargePatientFeedback/DischargePatient.jsx"));
const FollowupPatient = lazy(() => import("./Modules/ProFollowup/FollowupPatient.jsx"));
const SearchPatientModal = lazy(() => import("./Modules/FeedbackForms/SearchPatientModal.jsx"));
const Prem = lazy(() => import("./Modules/PREM/Prem.jsx"));


//Feedback
// const ChooseFeedbacks = lazy(() => import("./Feedback/ChooseFeedbacks.jsx"));
// const RadiologyFeedback = lazy(() => import('./Feedback/RadiologyFeedback/RadiologyFeedback'))
// const PharmacyFeedback = lazy(() => import('./Feedback/PharmacyFeedback/PharmacyFeedback'))
// const Opfeedback = lazy(() => import('./Feedback/OPfeedback/Opfeedback'))
// const Ipfeedback = lazy(() => import('./Feedback/IpFeedback/IpFeedback'))
// const LaboratoryFeedback = lazy(() => import('./Feedback/Laboratory/LaboratoryFeedback'))
// const AdvancedSearch = lazy(() =>
//   import("./Modules/Search/AdvancedSearch.jsx")
// );
// const FileUpload = lazy(() => import("./Modules/FileUpload/FileUpload.jsx"));



const routes = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<RootLayoutSkeleton />}> <RoootLayouts /></Suspense>,
    children: [],
    errorElement: <ErrorElement />,
  },
  {
    path: "/feedback/:encodedId",
    element: (
      <Suspense fallback={<CommonFinalFeedSkeleton />}>
        <FeedbackForm />
      </Suspense>
    ),
    errorElement: <ErrorElement />
  },
  {
    path: "/feedback/searchmodal/:feedbackId",
    element: (
      <Suspense fallback={<CommonFinalFeedSkeleton />}>
        <SearchPatientModal />
      </Suspense>
    ),
    errorElement: <ErrorElement />
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/Home",
        element: <Home />,
        children: [
          {
            path: "Dashboard", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <Dashboard />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "AdvancedSearch", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                {/* <AdvancedSearch /> */}
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "FileUpload", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                {/* <FileUpload /> */}
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "Feedbackdetail", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <Feedback />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "collectiondetail", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <Feedbackcollection />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "Settings", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <Settings />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "FileSearch", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                {/* <FileApprovals /> */}
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "modulemaster", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <ModuleMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "groupmaster", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <UserGroupMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "usergroupright", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <UserGroupRightMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "userrights", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <UserRightMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "usermoduleright", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <UserModuleRightMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "nursestationmast", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <NurstationMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "roommaster", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <RoomMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "menumaster", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <MenuMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "subcatgMaster", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <FeedBackSubCategoryMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "catgMaster", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <FeedBackCategoryMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "collectiontype", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <FeedBackColletionType />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "feedback", element:
              <Suspense fallback={<CommonFinalFeedSkeleton />} >
                <FeedbackMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "feedbackTransactdetail", element:
              <Suspense fallback={<CommonFinalFeedSkeleton />} >
                <FeedBackDetail />
              </Suspense>, errorElement: <ErrorElement />
          }, {
            path: "Maintenace", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <Maintenance />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "it", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <InfromationTechnology />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "biomedical", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <Biomedical />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "housekeeping", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                {/* <HouseKeeping /> */}
                <HkContainer />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "assetitem", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <AssetIemMaster />
              </Suspense>, errorElement: <ErrorElement />
          }, {
            path: "assetmapping", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <AssetMapMaster />
              </Suspense>, errorElement: <ErrorElement />
          }, {
            path: "roomchecklist", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <RoomChecklistMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "prochecklist", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <Prochecklist />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "dischargeroomcleaning", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <DischargeRoomCleaningMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "houskeepingempmaster", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <HkEmployeeDetailMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "dischargepatient", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <DischargePatient />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "followupratient", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <FollowupPatient />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "commonfbreport", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <CommonFeedbackReport />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "ipfbreport", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <IpFeedbackReport />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "AllReports", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <AllReports />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "Prem", element:
              <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
                <Prem />
              </Suspense>, errorElement: <ErrorElement />
          },
        ],
      },
      {
        path: "/qrscan",
        element: <Qrscan />,
      },
      { path: "/Color", element: <Colors /> },
    ],
    errorElement: <ErrorElement />,
  },
]);

const queryClient = new QueryClient();

function App() {

  useEffect(() => {

    // socket.on("connect", () => {
    //   console.log("Connected");
    // });

    // socket.on("multiple-login", (message) => {
    //   console.log(message);
    //   localStorage.removeItem("app_auth");
    //   toast.error(
    //     <div className='flex h-20 flex-col' >{message}</div>, {
    //     position: "top-center",
    //     autoClose: 5000,
    //     hideProgressBar: false,
    //     closeOnClick: true,
    //     pauseOnHover: true,
    //     draggable: true,
    //     progress: undefined,
    //     theme: "light",
    //   });
    //   // Redirect to login page
    //   setTimeout(() => {
    //     // warningNofity(message);
    //     window.location.href = "/";
    //   }, 3000); // Wait 3 seconds before redirecting
    // });

  }, [])

  useLayoutEffect(() => {
    document.body.classList.add("light");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <AuthProvider>
        <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />}>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={routes} />
          </QueryClientProvider>
        </Suspense>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
