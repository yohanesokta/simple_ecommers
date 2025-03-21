"use server"

import { prisma } from "@/app/utils/supabase"
import jwt from "jsonwebtoken"
export async function getTokoData(token){
    try{
        const tokens = jwt.decode(token)
        const data = await prisma.user.findUnique({
            where : {
                email : tokens.email
            }
        })
        return data
    }catch(error){
        return false
    }
}

export async function deleteToko(token) {
    try{
        const tokens = jwt.decode(token)
        const userdata = await prisma.user.findUnique({
            where : {
                email : tokens.email
            }
        })

        await prisma.product.deleteMany({
            where : {
                user_id : userdata.id
            }
        })

        const update = await prisma.user.update({
            where : {
                id : userdata.id
            },
            data :{
                name_toko : "",
                desc_toko : "",
                alamat_toko : "",
                picture_toko : ""
            }
        })
        console.log(update)
        return true
    } catch (error) {
        console.log(error)
        return false
    }
}