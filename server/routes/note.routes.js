import { Router } from "express";
import * as NoteController from "../controllers/note.controller";

const router = new Router();

// Add a new Note
router.route("/notes").post(NoteController.addNote);
router.route("/notes").delete(NoteController.deleteNote);
router.route("/notes/:id").put(NoteController.editNote);

export default router;
