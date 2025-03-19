"use server"

import { prisma } from "./supabase"

export async function PublicProduct() {
    try{ 
        const data = await prisma.product.findMany();
        return data

    }catch(error){
        console.log(error)
        return false
    }
}

