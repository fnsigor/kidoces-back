import { Router } from "express";
import { ProductController } from "./controller/ProductController";

const controller = new ProductController()

const router = Router()

router.post('/createProduct', controller.createProduct)
router.get('/getAllProducts', controller.getAllProducts)


module.exports = router;