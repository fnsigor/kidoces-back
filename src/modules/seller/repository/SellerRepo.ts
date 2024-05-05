import { PrismaClient } from '@prisma/client'

export interface ISeller {
    id: string
    name: string
    email: string
    password: string
    whatsapp: string
    createdAt: Date
    updatedAt: Date
}

export interface ICreateSeller extends Omit<ISeller, 'id' | 'createdAt' | 'updatedAt'> { }


export class SellerRepo {

    private prisma: PrismaClient

    constructor() {
        this.prisma = new PrismaClient({})
    }

    async createSeller({ email, name, password, whatsapp }: ICreateSeller) {
        try {

            if (!email) {
                return { status: 400, data: { message: 'não foi possivel criar o vendedor, email não informado' } }
            }

            if (!name) {
                return { status: 400, data: { message: 'não foi possivel criar o vendedor, nome não informado' } }

            }

            if (!password) {
                return { status: 400, data: { message: 'não foi possivel criar o vendedor, senha não informada' } }

            }

            if (!whatsapp) {
                return { status: 400, data: { message: 'não foi possivel criar o vendedor, whatsapp não informado' } }
            }

            const seller = await this.prisma.seller.create({
                data: {
                    email,
                    name,
                    password,
                    whatsapp,
                },
            })

            return { status: 200, data: { seller, message: 'vendedor criado com sucessso' } }
        } catch (error) {
            console.log(error)
            return { status: 500, data: { message: 'não foi possivel criar o vendedor' } }
        }
    }
}


