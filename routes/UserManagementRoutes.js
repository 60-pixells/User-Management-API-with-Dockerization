import { Router } from "express";
import {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/UserManagementController.js";

const router = Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/", updateUser);
router.delete("/", deleteUser);



export default router;