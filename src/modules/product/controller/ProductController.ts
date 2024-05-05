import { Request, Response } from "express";
import { ProductRepo } from "../repository/ProductRepo";

export class ProductController {

    private repository: ProductRepo

    constructor() {
        this.repository = new ProductRepo()
    }

    createProduct = async (req: Request, res: Response) => {
        try {

            const newProduct = req.body as any

            const response = await this.repository.createProduct(newProduct)

            return res.status(response.status).json({ ...response.data })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'erro ao criar produto' })
        }
    }

    getAllProducts = async (req: Request, res: Response) => {
        try {

            
            const response = await this.repository.getAllProducts(req.query.limit as any, req.query.name as any)

            return res.status(response.status).json({ ...response.data })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'erro ao buscar produtos' })
        }
    }

}