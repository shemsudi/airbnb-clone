import { createBrowserRouter } from "react-router-dom";
// routes
import ErrorPage from "./pages/errorPage";
import Root from "./pages/root";
// import NewRealeased from "./pages/realesedFeaures.jsx";
import Icons from "../src/components/Icons.tsx";
import HostHomes from "./pages/hostHomes";
import BecameAhost from "./pages/become-a-host";
import AboutYourPlace from "./pages/aboutYourPlace";
import HomeSturcture from "./pages/homeStructure.jsx";
import PrivacyType from "./pages/privacyType.js";
import LocationPage from "./pages/locationPage.js";
import FloorPlanPage from "./pages/floorPlanpage.js";
import StandOut from "./pages/standOut.tsx";
import AmenitiesPage from "./pages/amenitesPage.tsx";
import PhotosPage from "./pages/photosPage.js";
import TitlePage from "./pages/titlePage.tsx";
import DescriptionPage from "./pages/descriptionPage.tsx";
import FinishSetupPage from "./pages/finishSetupPage.tsx";
import InstantBookPage from "./pages/instantBook.tsx";
import VisiblityPage from "./pages/visiblityPage.tsx";
import PricePage from "./pages/pricePage.tsx";
import DiscountPage from "./pages/discountPage.tsx";
import LegalPage from "./pages/legalPage.jsx";
import ReceiptPage from "./pages/receiptPage.jsx";
import PublishCelebration from "./pages/publishCelebration.jsx";
import hostloader from "./loaders/placeLoader.ts";
import { hostloader2 } from "./loaders/placeLoader.ts";
import Icons2 from "./components/Icons2.tsx";
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
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Icons />,
        loader: hostloader,
      },
      {
        path: "/icons",
        element: <Icons />,
        loader: hostloader,
      },
      {
        path: "/amazing-pools",
        element: <Icons2 />,
        loader: hostloader2,
      },
      {
        path: "/Tropical",
        element: <Icons />,
      },
      {
        path: "/Top-cities",
        element: <Icons />,
      },
      {
        path: "/New",
        element: <Icons />,
      },
      {
        path: "/National-parks",
        element: <Icons />,
      },
      {
        path: "/Rooms",
        element: <Icons />,
      },
      {
        path: "/Lake-front",
        element: <Icons />,
      },
      {
        path: "/Design",
        element: <Icons />,
      },
      {
        path: "/Trending",
        element: <Icons />,
      },
      {
        path: "/Camping",
        element: <Icons />,
      },
    ],
  },
  { path: "host/homes", element: <HostHomes /> },
  { path: "/became-a-host/overview", element: <BecameAhost /> },
  {
    path: `/became-a-host/:uuid/about-your-place`,
    element: <AboutYourPlace />,
  },
  {
    path: `/became-a-host/:uuid/structure`,
    element: <HomeSturcture />,
  },
  {
    path: "/became-a-host/:uuid/privacyType",
    element: <PrivacyType />,
  },
  {
    path: "/became-a-host/:uuid/location",
    element: <LocationPage />,
  },

  {
    path: "/became-a-host/:uuid/floor-plan",
    element: <FloorPlanPage />,
  },
  {
    path: "/became-a-host/:uuid/stand-out",
    element: <StandOut />,
  },
  {
    path: "/became-a-host/:uuid/amenities",
    element: <AmenitiesPage />,
  },
  {
    path: "/became-a-host/:uuid/photos",
    element: <PhotosPage />,
    // loader: photoLoader,
  },
  {
    path: "/became-a-host/:uuid/title",
    element: <TitlePage />,
  },
  {
    path: "/became-a-host/:uuid/description",
    element: <DescriptionPage />,
  },
  {
    path: "/became-a-host/:uuid/finish-setup",
    element: <FinishSetupPage />,
  },
  {
    path: "/became-a-host/:uuid/instant-book",
    element: <InstantBookPage />,
  },
  {
    path: "/became-a-host/:uuid/visibility",
    element: <VisiblityPage />,
  },
  {
    path: "/became-a-host/:uuid/price",
    element: <PricePage />,
  },
  {
    path: "/became-a-host/:uuid/discount",
    element: <DiscountPage />,
  },
  {
    path: "/became-a-host/:uuid/legal",
    element: <LegalPage />,
  },
  {
    path: "/became-a-host/:uuid/receipt",
    element: <ReceiptPage />,
  },
  {
    path: "/became-a-host/:uuid/publish-celebration",
    element: <PublishCelebration />,
  },
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
  // },
]);

export default router;
