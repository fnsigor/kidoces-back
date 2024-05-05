import { Request, Response } from "express";
import { SellerRepo } from "../repository/SellerRepo";

export class SellerController {

    private repository: SellerRepo

    constructor() {
        this.repository = new SellerRepo()
    }

    createSeller = async (req: Request, res: Response) => {
        try {

            const newSeller = req.body as any

            const response = await this.repository.createSeller(newSeller)

            return res.status(response.status).json({ ...response.data })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ message: 'erro ao criar vendedor' })
        }
    }

}