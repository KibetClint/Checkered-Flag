import { Router, type Request, type Response } from "express";
import { Contact } from "../models/contact.js";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const message = await Contact.create(req.body);
    res.status(201).json({ success: true, message });
  } catch (error) {
    res.status(500).json({ success: false, error: "Failed to send message" });
  }
});

export default router;
