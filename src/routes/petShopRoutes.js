import { Router } from "express";
import * as petShopController from './../controllers/petShopController.js'

const router = Router();

router.get("/", petShopController.listarTodos);
router.get("/:id", petShopController.listarUm);
router.get("/", petShopController.criar);
router.get("/:id", petShopController.apagar);
router.get("/:id", petShopController.atualizar);

export default router;