"use server"
import { prisma } from "../../utils/supabase"
import jwt from "jsonwebtoken"
export const getPembelian = async (token) => {
    try {
        const tokens = jwt.decode(token)
        const userdata = await prisma.user.findFirst({where : {email : tokens.email}})
        const data = await prisma.ticket.findMany({
            where : {
                driver_id : userdata.id
            },
            orderBy : {
                update : "desc"
            }
        })
        console.log(data)
        return data
    } catch (error) {
        return false
    }
}

export const CompletePembelian = async (token,id) => {
    try {
        const tokens = jwt.decode(token)
        await prisma.user.update({
            where : {
                email : tokens.email
            },data : {
                driver_ready : true
            }
        })
        await prisma.ticket.update({
            where : {
                id : id
            },
            data : {
                status : "success"
            }
        })
        
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}