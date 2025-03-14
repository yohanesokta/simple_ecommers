"use server"
import { prisma } from "@/app/utils/supabase"
import jwt from "jsonwebtoken"

export const userMiddleware = async (token) => {
    try {
        const verify = jwt.verify(token,process.env.NEXT_JWT_PRIVATE)
        if (verify) {
            if (verify.role == "user" || verify.role == "driver") {
                const data = await prisma.user.findFirst({where : {email : verify.email}})
                return {
                    status : true,
                    data
                }
            } else {
                throw new Error()
            }
        } else {
            throw new Error()
        }
    } catch (error) {
        console.log(error)
        if (error) {
            return {
                status : false 
            }
        }
    }
}