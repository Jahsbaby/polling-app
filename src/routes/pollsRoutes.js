import express from "express";
import { createPollController, castVoteController, getPollsController } from "../controllers/pollsController.js";
import adminAuth from "../middleware/adminAuth.js";

const router = express.Router();

router.get("/", getPollsController);
router.post("/", adminAuth, createPollController);
router.post("/:id/vote", castVoteController);

// src/routes/pollsRoutes.test.js
describe("Polls Routes", () => {
  it("should pass a dummy test", () => {
    expect(true).toBe(true);
  });
});


export default router;
