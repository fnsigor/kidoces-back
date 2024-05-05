import { Router } from "express";
import { SellerController } from "./controller/SellerController";

const controller = new SellerController()

const router = Router()

router.post('/createSeller', controller.createSeller)


module.exports = router;