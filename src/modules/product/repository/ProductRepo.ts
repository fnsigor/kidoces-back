import { PrismaClient } from '@prisma/client'

export interface IProduct {
    description: string,
    name: string,
    value: number,
    idSeller: string,
    createdAt: Date
    updatedAt: Date,
    imageUrl: string
    id: number
}

export interface ICreateProduct extends Omit<IProduct, 'id' | 'createdAt' | 'updatedAt'> { }


export class ProductRepo {

    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient({})
    }

    async createProduct({ description, idSeller, name, value, imageUrl }: ICreateProduct) {
        try {

            if (!description) {
                return { status: 400, data: { message: 'não foi possivel criar o produto, email não informado' } }
            }

            if (!name) {
                return { status: 400, data: { message: 'não foi possivel criar o produto, nome não informado' } }

            }

            if (!value) {
                return { status: 400, data: { message: 'não foi possivel criar o produto, valor não informado' } }

            }

            if (!idSeller) {
                return { status: 400, data: { message: 'não foi possivel criar o produto, vendedor não informado' } }
            }

            if (!imageUrl) {
                return { status: 400, data: { message: 'não foi possivel criar o produto, imagem não informada' } }
            }

            const product = await this.prisma.product.create({
                data: {
                    description,
                    name,
                    value,
                    idSeller,
                    imageUrl
                },
            })

            return { status: 200, data: { product, message: 'produto criado com sucessso' } }
        } catch (error) {
            console.log(error)
            return { status: 500, data: { message: 'não foi possivel criar o produto' } }
        }
    }

    getAllProducts = async (limit: number | undefined = undefined) => {

        const queryParams: any = {}
        if(limit){
            queryParams.take = Number(limit)
        }

        try {
            const products = await this.prisma.product.findMany({
                include: {
                    seller: true
                },
                ...queryParams
            })

            return { status: 200, data: { products } }
        } catch (error) {
            console.log(error)
            return { status: 500, data: { message: 'não foi possivel buscar os produtos' } }
        }

    }
}


