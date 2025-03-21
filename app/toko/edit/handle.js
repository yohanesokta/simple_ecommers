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