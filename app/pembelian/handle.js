"use server"
import { prisma } from "../utils/supabase"
import jwt from "jsonwebtoken"
export const getPembelian = async (token) => {
    try {
        const tokens = jwt.decode(token)
        const userdata = await prisma.user.findFirst({where : {email : tokens.email}})
        const data = await prisma.ticket.findMany({
            where : {
                user_id : userdata.id
            },
            orderBy : {
                time : "desc"
            }
        })
        console.log(data)
        return data
    } catch (error) {
        return false
    }
}