import { Router, Request, Response } from "express";
import Host from "../models/host";

const router: Router = Router();

router.get("/test", (req: Request, res: Response) => {
  res.send("Hello World!");
});

router.get("/getAllListings", async (req: Request, res: Response) => {
  try {
    const homes = await Host.find({
      structure: req.query.category_tag,
      isCompleted: true,
    });
    res.status(200).json(homes);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/getListingById/:uuid", async (req: Request, res: Response) => {
  try {
    const host = await Host.findOne({ uuid: req.params.uuid }).populate(
      "user",
      "firstName"
    );
    if (host) {
      res.status(200).json(host);
    } else {
      res.status(404).json({ message: "Host not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
