import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import Hosting from "../models/host";
import passport from "passport";
import { Schema } from "mongoose";
import multer from "multer";

const router: Router = Router();

interface JwtPayload {
  id: Schema.Types.ObjectId;
}

router.get(
  "/generate-uuid",
  passport.authenticate("jwt", { session: false }),
  async (req: Request, res: Response): Promise<void> => {
    const user = req.user as JwtPayload | undefined;

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    console.log(user);
    const { id } = user;
    const generatedUuid: string = uuidv4();
    const hosting = new Hosting({
      uuid: generatedUuid,
      user: id,
      lastPage: "structure",
    });
    console.log(hosting);
    await hosting.save();

    res.json({ uuid: generatedUuid, lastPage: "structure" });
  }
);

interface StructureRequestBody {
  uuid: string;
  structure: string;
}

router.post(
  "/structure",
  passport.authenticate("jwt", { session: false }),
  async (req: Request<{}, {}, StructureRequestBody>, res: Response) => {
    const { uuid, structure } = req.body;

    try {
      const hosting = await Hosting.findOne({ uuid });

      if (!hosting) {
        res.status(404).json({ message: "Hosting not found" });
        return;
      }

      hosting.structure = structure;
      hosting.lastPage = "privacyType";
      await hosting.save();
      res.status(200).json({
        uuid: hosting.uuid,
        structure: hosting.structure,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

interface PrivacyTypeRequestBody {
  uuid: string;
  privacyType: string;
}

router.post(
  "/privacyType",
  passport.authenticate("jwt", { session: false }),
  async (req: Request<{}, {}, PrivacyTypeRequestBody>, res: Response) => {
    const { uuid, privacyType } = req.body;
    try {
      const hosting = await Hosting.findOne({ uuid });

      if (!hosting) {
        res.status(404).json({ message: "Hosting not found" });
        return;
      }
      hosting.privacyType = privacyType;
      hosting.lastPage = "location";
      await hosting.save();
      res.status(200).json({
        uuid: hosting.uuid,
        privacyType: hosting.privacyType,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);
interface LocationRequestBody {
  uuid: string;
  location: {
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
    address: string;
    floor: string;
    city: string;
    province: string;
    postalCode: string;
    showExactLocation: boolean;
  };
}
router.post(
  "/location",
  passport.authenticate("jwt", { session: false }),
  async (req: Request<{}, {}, LocationRequestBody>, res: Response) => {
    const { uuid, location } = req.body;
    try {
      const hosting = await Hosting.findOne({ uuid });

      if (!hosting) {
        res.status(404).json({ message: "Hosting not found" });
        return;
      }
      hosting.location.address = location.address;
      hosting.location.city = location.city;
      hosting.location.country = location.country;
      hosting.location.floor = location.floor;
      hosting.location.province = location.province;
      hosting.location.postalCode = location.postalCode;
      hosting.location.coordinates.lat = location.coordinates.lat;
      hosting.location.coordinates.lng = location.coordinates.lng;
      hosting.location.showExactLocation = location.showExactLocation;

      hosting.lastPage = "floor-plan";
      await hosting.save();
      res.status(200).json({
        uuid: hosting.uuid,
        location: hosting.location,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get(
  "/get-hosts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const userId = (req.user as { id: Schema.Types.ObjectId }).id;
      const hosts = await Hosting.find({ user: userId });
      res.status(200).json(hosts);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

interface FloorPlanRequestBody {
  uuid: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
}

router.post(
  "/floor-plan",
  passport.authenticate("jwt", { session: false }),
  async (req: Request<{}, {}, FloorPlanRequestBody>, res: Response) => {
    try {
      const { uuid, guests, bedrooms, beds, bathrooms } = req.body;
      const host = await Hosting.findOne({ uuid });
      if (!host) {
        res.status(404).json({ message: "Hosting not found" });
        return;
      }

      host.guests = guests;
      host.bedrooms = bedrooms;
      host.beds = beds;
      host.bathrooms = bathrooms;
      host.lastPage = "amenites";

      await host.save();
      res.status(200).json({
        uuid: host.uuid,
        guests: host.guests,
        bedrooms: host.bedrooms,
        beds: host.beds,
        bathrooms: host.bathrooms,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Internal server Eroor" });
    }
  }
);

interface AmenitesRequestBody {
  uuid: string;
  amenities: string[];
  uniqueAmenities: string[];
  safetyAmenities: string[];
}

router.post(
  "/amenities",
  passport.authenticate("jwt", { session: false }),
  async (req: Request<{}, {}, AmenitesRequestBody>, res: Response) => {
    try {
      const { uuid, amenities, uniqueAmenities, safetyAmenities } = req.body;
      const host = await Hosting.findOne({ uuid });

      if (!host) {
        res.status(404).json({ message: "Hosting not found" });
        return;
      }

      host.amenities = amenities;
      host.uniqueAmenities = uniqueAmenities;
      host.safetyAmenities = safetyAmenities;
      host.lastPage = "photos";

      await host.save();
      res.status(200).json({
        uuid: host.uuid,
        amenities: host.amenities,
        uniqueAmenities: host.uniqueAmenities,
        safetyAmenities: host.safetyAmenities,
      });
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: "Internal server Eroor" });
    }
  }
);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10000000 },
});

router.post(
  "/addPhotos",
  passport.authenticate("jwt", { session: false }),
  upload.array("photos", 10),
  async (req, res) => {
    try {
      const { uuid }: { uuid: string } = req.body;

      if (!req.files || req.files.length === 0) {
        res.status(400).json({ message: "No files uploaded." });
        return;
      }
      const fileUrls = (req.files as Express.Multer.File[]).map((file) => {
        return `http://localhost:3000/uploads/${file.filename}`;
      });
      const host = await Hosting.findOne({ uuid });
      if (!host) {
        res.status(404).json({ message: "Hosting not found." });
        return;
      }
      if (!host.photos) {
        host.photos = [];
      }
      host.photos = [...host.photos, ...fileUrls];
      await host.save();
      res.status(200).json({ photos: fileUrls });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.post(
  "/title",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { uuid, title }: { uuid: string; title: string } = req.body;
      const host = await Hosting.findOne({ uuid });

      if (!host) {
        res.status(404).json({ message: "Hosting not found" });
        return;
      }
      host.title = title;
      host.lastPage = "description";
      await host.save();
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.delete("/deletePhoto/:index", async (req, res) => {
  try {
    const index = Number(req.params.index);
    const { uuid } = req.query;
    const host = await Hosting.findOne({ uuid });
    console.log(host);
    if (!host) {
      res.status(404).json({ message: "Hosting not found." });
      return;
    }
    if (!host.photos) {
      host.photos = [];
    }
    host.photos.splice(index, 1);
    console.log(host.photos);
    await host.save();
    res.status(200).json();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/photos", async (req, res) => {
  try {
    const { uuid } = req.query;
    const host = await Hosting.findOne({ uuid });
    if (!host) {
      res.status(404).json({ message: "Hosting not found." });
      return;
    }
    res.status(200).json({ photos: host.photos });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

interface DescriptionRequestBody {
  uuid: string;
  description: string;
  highlights: string[];
}

router.post(
  "/description",
  passport.authenticate("jwt", { session: false }),
  async (req: Request<{}, {}, DescriptionRequestBody>, res) => {
    try {
      const { uuid, description, highlights } = req.body;
      const host = await Hosting.findOne({ uuid });
      if (!host) {
        res.status(404).json({ message: "Hosting not found" });
        return;
      }
      host.description = description;
      host.highlights = highlights;
      host.lastPage = "finishSetup";
      await host.save();
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.post(
  "/instant-book",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { uuid, instantBook }: { uuid: string; instantBook: string } =
        req.body;
      const host = await Hosting.findOne({ uuid });
      if (!host) {
        res.status(404).json({ message: "Hosting not found" });
        return;
      }
      host.instantBook = instantBook;
      host.lastPage = "visibility";
      await host.save();
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.post(
  "/visibility",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { uuid, visibility }: { uuid: string; visibility: string } =
        req.body;
      const host = await Hosting.findOne({ uuid });
      if (!host) {
        res.status(404).json({ message: "Hosting not found" });
        return;
      }
      host.visibility = visibility;
      host.lastPage = "price";
      await host.save();
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.post(
  "/price",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { uuid, price }: { uuid: string; price: number } = req.body;
      console.log(price);
      const host = await Hosting.findOne({ uuid });
      if (!host) {
        res.status(404).json({ message: "Hosting not found" });
        return;
      }
      if (!host.pricing) {
        host.pricing = {};
      }
      host.pricing.nightlyRate = price;
      host.lastPage = "availability";
      await host.save();
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.post(
  "/setDiscount",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      const { uuid, discount }: { uuid: string; discount: number[] } = req.body;
      console.log(uuid);
      const host = await Hosting.findOne({ uuid });
      // if (discount.weeklyDiscount) {
      //   host.discount.weeklyDiscount = discount.weeklyDiscount;
      // }
      // if (discount.monthlyDiscount) {
      //   host.discount.monthlyDiscount = discount.monthlyDiscount;
      // }
      // if (discount.newLPDiscount) {
      //   host.discount.newLPDiscount = discount.newLPDiscount;
      // }
      if (!host) {
        res.status(404).json({ message: "Hosting not found" });
        return;
      }
      host.discount = { ...host.discount, ...discount };
      host.lastPage = "final";
      await host.save();
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

interface LegalInfoRequestBody {
  uuid: string;
  legalInfo: {
    hostingType?: string;
    securityCameras?: {
      isAvailable?: boolean;
      description?: string;
    };
    noiseMonitors?: boolean;
    weapons?: boolean;
  };
}

router.post(
  "/setLegalInfo",
  passport.authenticate("jwt", { session: false }),
  async (req: Request<{}, {}, LegalInfoRequestBody>, res) => {
    try {
      const { uuid, legalInfo } = req.body;

      const host = await Hosting.findOne({ uuid });
      if (!host) {
        res.status(404).json({ message: "Hosting not found" });
        return;
      }
      if (!host.legalInfo) {
        host.legalInfo = {};
      }
      if (legalInfo.securityCameras) {
        if (!host.legalInfo.securityCameras) {
          host.legalInfo.securityCameras = {};
        }
        host.legalInfo.securityCameras.isAvailable =
          legalInfo.securityCameras.isAvailable ??
          host.legalInfo.securityCameras.isAvailable;
        host.legalInfo.securityCameras.description =
          legalInfo.securityCameras.description ||
          host.legalInfo.securityCameras.description;
      }
      host.legalInfo.hostingType =
        legalInfo.hostingType || host.legalInfo.hostingType;
      host.legalInfo.noiseMonitors =
        legalInfo.noiseMonitors ?? host.legalInfo.noiseMonitors;
      host.legalInfo.weapons = legalInfo.weapons ?? host.legalInfo.weapons;

      host.lastPage = "discount";
      await host.save();
      res.status(200).json();
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.post(
  "/publish",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { uuid } = req.body;
    try {
      const host = await Hosting.findOne({ uuid });
      if (!host) {
        res.status(404).json({ message: "Hosting not found" });
        return;
      }
      host.isCompleted = true;
      await host.save();
      res.json({
        suceess: "Hosting completed sucessfully",
      });
    } catch (error) {
      console.log(error);
    }
  }
);

export default router;
