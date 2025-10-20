import { Router } from "express";
import * as petShopController from './../controllers/petShopController.js'

const router = Router();

router.get("/", petShopController.listraTodos);
router.get("/:id", petShopController.listarUm);

export default router;