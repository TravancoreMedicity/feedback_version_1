import React, { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Pages/Home";
import ProtectedRoute from "./routes/ProtectedRoute";
import Colors from "./Pages/Colors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CustomBackDropWithOutState from "./Components/CustomBackDropWithOutState";
import "./App.css";
import { AuthProvider } from "./Context/AuthProvider";
import ErrorElement from "./Pages/ErrorElement";
// import { socket } from "./ws/socket";
import { ToastContainer } from "react-toastify";
import RootLayoutSkeleton from "./Components/RootLayoutSkeleton.jsx";
import Qrscan from "./Pages/Qrscan.jsx";
import CommonFinalFeedSkeleton from './Feedback/Commoncomponents/commonFinalFeedSkeleton';
import RadiologyFeedbackSkeleton from './Feedback/Commoncomponents/RadiologyFeedbackSkeleton';
import Opskeleton from './Feedback/Commoncomponents/Opskeleton';

import FeedBackSubCategoryMaster from "./Modules/Settings/FeedBackSubCategoryMaster/FeedBackSubCategoryMaster";
import FeedBackCategoryMaster from "./Modules/Settings/FeedBackCategoryMaster/FeedBackCategoryMaster.jsx";
import FeedBackColletionType from "./Modules/Settings/FeedBackColletionType/FeedBackColletionType.jsx";
import Feedback from "./Modules/FeedbackForms/Feedback.jsx";
import FeedbackMaster from "./Modules/Settings/FeedbackMaster/FeedbackMaster.jsx";
import FeedBackDetail from "./Modules/Settings/FeedBackDetail/FeedBackDetail.jsx";
import FeedbackForm from "./Modules/FeedbackForms/FeedbackForm.jsx";
import Feedbackcollection from "./Modules/FeedbackCollections/Feedbackcollection.jsx";
import ModuleMaster from "./Masters/ModuleMaster.jsx";
import MenuMaster from "./Masters/MenuMaster.jsx";
import UserGroupMaster from "./Masters/UserGroupMaster.jsx";
import UserGroupRightMaster from "./Masters/UserGroupRightMaster.jsx";
import UserRightMaster from "./Masters/UserRightMaster.jsx";
import Scanner from "./Components/Scanner.jsx";
import UserModuleRightMaster from "./Masters/UserModuleRightMaster.jsx";
import NurstationMaster from "./Masters/NurstationMaster.jsx";
import Maintenance from "./Modules/Maintentance/Maintenance.jsx";
import InfromationTechnology from "./Modules/IT/InfromationTechnology.jsx";
import Biomedical from "./Modules/Biomedical/Biomedical.jsx";
import HouseKeeping from "./Modules/HouseKeeping.jsx/HouseKeeping.jsx";




// Main Modules
const Dashboard = lazy(() => import("./Modules/Dashboard/Dashboard.jsx"));
const RoootLayouts = lazy(() => import("./routes/RoootLayouts"));


//Feedback
const ChooseFeedbacks = lazy(() => import("./Feedback/ChooseFeedbacks.jsx"));
const RadiologyFeedback = lazy(() => import('./Feedback/RadiologyFeedback/RadiologyFeedback'))
const PharmacyFeedback = lazy(() => import('./Feedback/PharmacyFeedback/PharmacyFeedback'))
const Opfeedback = lazy(() => import('./Feedback/OPfeedback/Opfeedback'))
const Ipfeedback = lazy(() => import('./Feedback/IpFeedback/IpFeedback'))
const LaboratoryFeedback = lazy(() => import('./Feedback/Laboratory/LaboratoryFeedback'))
// const AdvancedSearch = lazy(() =>
//   import("./Modules/Search/AdvancedSearch.jsx")
// );
// const FileUpload = lazy(() => import("./Modules/FileUpload/FileUpload.jsx"));
const Settings = lazy(() => import("./Modules/Settings/Settings.jsx"));

// Sub Modules
// const UserManagement = lazy(() => import("./Modules/Settings/UserMangement/UserCreation.jsx"));
// const DocTypeMaster = lazy(() => import("./Modules/Settings/DocumentTypeMaster/DoctypeMaster.jsx"));
// const SubTypeMaster = lazy(() => import("./Modules/Settings/SubTypeMaster/SubTypeMaster.jsx"));
// const DocCategory = lazy(() => import("./Modules/Settings/DocumentCategory/DocCategoryMaster.jsx"));
// const DocSubCategory = lazy(() => import("./Modules/Settings/DocumentSubCategory/DocumentSubCategory.jsx"));
// const DocGroup = lazy(() => import("./Modules/Settings/DocumentGroup/DocumentGroup.jsx"));
// const InstituteTypeMaster = lazy(() => import("./Modules/Settings/InstituteTypeMaster/InstituteTypeMaster.jsx"));
// const InstitutionMaster = lazy(() => import("./Modules/Settings/InstitutionMaster/InstitutionMaster.jsx"));
// const CourseType = lazy(() => import("./Modules/Settings/CourseType/CourseType.jsx"));
// const CourseMaster = lazy(() => import("./Modules/Settings/CourseMaster/CourseMaster.jsx"));
// const RackMaster = lazy(() => import("./Modules/Settings/RackMaster/RackMaster.jsx"));
// const LocationMaster = lazy(() => import("./Modules/Settings/LocationMaster/LocationMaster.jsx"));
// const CustodianMaster = lazy(() => import("./Modules/Settings/CustomdienMaster/CustodianMaster.jsx"));
// const CustodianDepartment = lazy(() => import("./Modules/Settings/CustodienDepartment/CustodianDepartment.jsx"));
// const FileApprovals = lazy(() => import("./Modules/FileApprovals/FileApprovals.jsx"));

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Suspense fallback={<RootLayoutSkeleton />}> <RoootLayouts /></Suspense>,
    children: [],
    errorElement: <ErrorElement />,
  },
  // {
  //   path: "scanner", element:
  //     <Suspense fallback={<CommonFinalFeedSkeleton />} >
  //       <Scanner />
  //     </Suspense>, errorElement: <ErrorElement />
  // },
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
          // {
          //   path: "FeedbackCollection", element:
          //     <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
          //       <Feedbackcollection />
          //     </Suspense>, errorElement: <ErrorElement />
          // },
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
              <Suspense fallback={<CommonFinalFeedSkeleton />} >
                <ModuleMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "groupmaster", element:
              <Suspense fallback={<CommonFinalFeedSkeleton />} >
                <UserGroupMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "usergroupright", element:
              <Suspense fallback={<CommonFinalFeedSkeleton />} >
                <UserGroupRightMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "userrights", element:
              <Suspense fallback={<CommonFinalFeedSkeleton />} >
                <UserRightMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "usermoduleright", element:
              <Suspense fallback={<CommonFinalFeedSkeleton />} >
                <UserModuleRightMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "nursestationmast", element:
              <Suspense fallback={<CommonFinalFeedSkeleton />} >
                <NurstationMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "menumaster", element:
              <Suspense fallback={<CommonFinalFeedSkeleton />} >
                <MenuMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "subcatgMaster", element:
              <Suspense fallback={<CommonFinalFeedSkeleton />} >
                <FeedBackSubCategoryMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "catgMaster", element:
              <Suspense fallback={<CommonFinalFeedSkeleton />} >
                <FeedBackCategoryMaster />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "collectiontype", element:
              <Suspense fallback={<CommonFinalFeedSkeleton />} >
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
              <Suspense fallback={<CommonFinalFeedSkeleton />} >
                <Maintenance />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "it", element:
              <Suspense fallback={<CommonFinalFeedSkeleton />} >
                <InfromationTechnology />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "biomedical", element:
              <Suspense fallback={<CommonFinalFeedSkeleton />} >
                <Biomedical />
              </Suspense>, errorElement: <ErrorElement />
          },
          {
            path: "housekeeping", element:
              <Suspense fallback={<CommonFinalFeedSkeleton />} >
                <HouseKeeping />
              </Suspense>, errorElement: <ErrorElement />
          }




          // { path: "UserManagement", element: <UserManagement />, errorElement: <ErrorElement /> },
          // { path: "DocTypeMaster", element: <DocTypeMaster />, errorElement: <ErrorElement /> },
          // { path: "SubTypeMaster", element: <SubTypeMaster />, errorElement: <ErrorElement /> },
          // { path: "DocCategory", element: <DocCategory />, errorElement: <ErrorElement /> },
          // { path: "DocSubCategory", element: <DocSubCategory />, errorElement: <ErrorElement /> },
          // { path: "DocGroup", element: <DocGroup />, errorElement: <ErrorElement /> },
          // { path: "InstituteTypeMaster", element: <InstituteTypeMaster />, errorElement: <ErrorElement /> },
          // { path: "InstitutionMaster", element: <InstitutionMaster />, errorElement: <ErrorElement /> },
          // { path: "CourseType", element: <CourseType />, errorElement: <ErrorElement /> },
          // { path: "CourseMaster", element: <CourseMaster />, errorElement: <ErrorElement /> },
          // { path: "RackMaster", element: <RackMaster />, errorElement: <ErrorElement /> },
          // { path: "LocationMaster", element: <LocationMaster />, errorElement: <ErrorElement /> },
          // { path: "CustodianMaster", element: <CustodianMaster />, errorElement: <ErrorElement /> },
          // { path: "CustodianDepartment", element: <CustodianDepartment />, errorElement: <ErrorElement /> },
          // { path: "Color", element: <Colors />, errorElement: <ErrorElement /> },
        ],
      },
      {
        path: "/qrscan",
        element: <Qrscan />,
      },
      // {
      //   path: "/ChooseFeedback", element:
      //     <Suspense fallback={<CustomBackDropWithOutState message={"Loading..."} />} >
      //       <ChooseFeedbacks />
      //     </Suspense>,
      //   errorElement: <ErrorElement />
      // },
      // {
      //   path: "/opFeedback", element:
      //     <Suspense fallback={<Opskeleton />} >
      //       <Opfeedback />
      //     </Suspense>, errorElement: <ErrorElement />
      // },
      // {
      //   path: "/ipFeedback", element:
      //     <Suspense fallback={<Opskeleton />} >
      //       <Ipfeedback />
      //     </Suspense>, errorElement: <ErrorElement />
      // },
      // {
      //   path: "/labFeedback", element:
      //     <Suspense fallback={<Opskeleton />} >
      //       <LaboratoryFeedback />
      //     </Suspense>, errorElement: <ErrorElement />
      // },
      // {
      //   path: "/PharmacyFeedback", element:
      //     <Suspense fallback={<CommonFinalFeedSkeleton />} >
      //       <PharmacyFeedback />
      //     </Suspense>, errorElement: <ErrorElement />
      // },
      // {
      //   path: "/radiologyfeed", element:
      //     <Suspense fallback={<RadiologyFeedbackSkeleton />} >
      //       <RadiologyFeedback />
      //     </Suspense>, errorElement: <ErrorElement />
      // },
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
