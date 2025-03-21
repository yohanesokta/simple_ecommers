"use server"
import { prisma } from "@/app/utils/supabase"

export async function editProduct(product_id,name,category,desc,price,quantity,picture){
    try{
        await prisma.product.update({
            where : {
                id : product_id
            },
            data :{
                category,
                desc,
                name,
                price,
                quantity : parseInt(quantity),
                picture
            }
        })
        return true
    }catch (error){
        console.log(error)
        return false
    }
}
export async function  deleteProduct(product_id) {
    try {
        
        await prisma.product.delete({
            where : {
                id : product_id
            }
        })
        return true
    } catch (error) {
        console.log(error)
        return false
    }
    
}