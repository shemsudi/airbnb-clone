import { createBrowserRouter } from "react-router-dom";
// routes
// import ErrorPage from "./pages/errorPage.jsx";
import Root from "./pages/root";
// import NewRealeased from "./pages/realesedFeaures.jsx";
// import Icons from "../src/components/Icons.jsx";
// import HostHomes from "./pages/hostHomes.jsx";
// import BecameAhost from "./pages/became-a-host.jsx";
// import AboutYourPlace from "./pages/hostingSteps/aboutYourPlace.jsx";
// import HomeSturcture from "./pages/hostingSteps/homeStructure.jsx";
// import PrivacyType from "./pages/hostingSteps/privacyType.jsx";
// import LocationPage from "./pages/hostingSteps/locationPage.jsx";
// import FloorPlanPage from "./pages/hostingSteps/floorPlanpage.jsx";
// import StandOut from "./pages/hostingSteps/standOut.jsx";
// import AmenitiesPage from "./pages/hostingSteps/amenitesPage.jsx";
// import PhotosPage from "./pages/hostingSteps/photosPage.jsx";
// import TitlePage from "./pages/hostingSteps/titlePage.jsx";
// import DescriptionPage from "./pages/hostingSteps/descriptionPage.jsx";
// import FinishSetupPage from "./pages/hostingSteps/finishSetupPage.jsx";
// import InstantBookPage from "./pages/hostingSteps/instantBook.jsx";
// import VisiblityPage from "./pages/hostingSteps/visiblityPage.jsx";
// import PricePage from "./pages/hostingSteps/pricePage.jsx";
// import DiscountPage from "./pages/hostingSteps/discountPage.jsx";
// import LegalPage from "./pages/hostingSteps/legalPage.jsx";
// import ReceiptPage from "./pages/hostingSteps/receiptPage.jsx";
// import PublishCelebration from "./pages/hostingSteps/publishCelebration.jsx";
// import { useSelector } from "react-redux";

// const photoLoader = async () => {
//   // const host = useSelector((state) => state.host.host);
//   const response = await axios.get("http://localhost:3000/host/photos", {
//     params: { uuid: "d0c2e3b7-15da-4022-a487-a40ea9c2c40c" },
//   });
//   const Photos = response.data;
//   return { Photos } || null;
// };
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    // errorElement: <ErrorPage />,
    // children: [
    //     {
    //       index: true,
    //       element: <Icons />,
    //     },
    //     {
    //       path: "/icons",
    //       element: <Icons />,
    //     },
    //     {
    //       path: "/amazing-pools",
    //       element: <Icons />,
    //     },
    //     {
    //       path: "/Tropical",
    //       element: <Icons />,
    //     },
    //     {
    //       path: "/Top-cities",
    //       element: <Icons />,
    //     },
    //     {
    //       path: "/New",
    //       element: <Icons />,
    //     },
    //     {
    //       path: "/National-parks",
    //       element: <Icons />,
    //     },
    //     {
    //       path: "/Rooms",
    //       element: <Icons />,
    //     },
    //     {
    //       path: "/Lake-front",
    //       element: <Icons />,
    //     },
    //     {
    //       path: "/Design",
    //       element: <Icons />,
    //     },
    //     {
    //       path: "/Trending",
    //       element: <Icons />,
    //     },
    //     {
    //       path: "/Camping",
    //       element: <Icons />,
    //     },
    //   ],
    // },
    // { path: "host/homes", element: <HostHomes /> },
    // { path: "/became-a-host/overview", element: <BecameAhost /> },
    // {
    //   path: `/became-a-host/:uuid/about-your-place`,
    //   element: <AboutYourPlace />,
    // },
    // {
    //   path: `/became-a-host/:uuid/structure`,
    //   element: <HomeSturcture />,
    // },
    // {
    //   path: "/became-a-host/:uuid/privacyType",
    //   element: <PrivacyType />,
    // },
    // {
    //   path: "/became-a-host/:uuid/location",
    //   element: <LocationPage />,
    // },

    // {
    //   path: "/became-a-host/:uuid/floor-plan",
    //   element: <FloorPlanPage />,
    // },
    // {
    //   path: "/became-a-host/:uuid/stand-out",
    //   element: <StandOut />,
    // },
    // {
    //   path: "/became-a-host/:uuid/amenities",
    //   element: <AmenitiesPage />,
    // },
    // {
    //   path: "/became-a-host/:uuid/photos",
    //   element: <PhotosPage />,
    //   // loader: photoLoader,
    // },
    // {
    //   path: "/became-a-host/:uuid/title",
    //   element: <TitlePage />,
    // },
    // {
    //   path: "/became-a-host/:uuid/description",
    //   element: <DescriptionPage />,
    // },
    // {
    //   path: "/became-a-host/:uuid/finish-setup",
    //   element: <FinishSetupPage />,
    // },
    // {
    //   path: "/became-a-host/:uuid/instant-book",
    //   element: <InstantBookPage />,
    // },
    // {
    //   path: "/became-a-host/:uuid/visibility",
    //   element: <VisiblityPage />,
    // },
    // {
    //   path: "/became-a-host/:uuid/price",
    //   element: <PricePage />,
    // },
    // {
    //   path: "/became-a-host/:uuid/discount",
    //   element: <DiscountPage />,
    // },
    // {
    //   path: "/became-a-host/:uuid/legal",
    //   element: <LegalPage />,
    // },
    // {
    //   path: "/became-a-host/:uuid/receipt",
    //   element: <ReceiptPage />,
    // },
    // {
    //   path: "/became-a-host/:uuid/publish-celebration",
    //   element: <PublishCelebration />,
    // },
    // {
    //   path: "/release/features",
    //   element: <NewRealeased />,
    // },
    // {
    //   path: "/guest/messages",
    //   element: <NewRealeased />,
    // },
    // {
    //   path: "/notifications",
    //   element: <NewRealeased />,
    // },
    // {
    //   path: "/trips/v1",
    //   element: <NewRealeased />,
    // },
    // {
    //   path: "/whilsts",
    //   element: <NewRealeased />,
    // },
    // {
    //   path: "/account_settings",
    //   element: <NewRealeased />,
    // },

    // {
    //   path: "/giftcards",
    //   element: <NewRealeased />,
    // },

    // {
    //   path: "/help",
    //   element: <NewRealeased />,
  },
]);

export default router;
