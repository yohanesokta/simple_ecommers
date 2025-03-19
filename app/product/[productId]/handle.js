"use server"
import { prisma } from "@/app/utils/supabase";
export async function GetProductDetail(product_id){
    try{
        
        const data = await prisma.product.findFirst({
            where : { id : product_id }
        })
        const toko = await prisma.user.findUnique({
            where : {email : data.email_id}
        })
        

        console.log(toko)
        return {data,toko}
    } catch (error){
        return data
    } 
}