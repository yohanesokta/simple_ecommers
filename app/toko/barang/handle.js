"use server"
import jwt from "jsonwebtoken"
const { prisma } = require("@/app/utils/supabase");

export const addProduct = async (token,name,category,desc,picture,price,quantity) => {
    try{
        const userdata = jwt.decode(token);
        const data = await prisma.user.findFirst({where : {email : userdata.email}})
        await prisma.product.create({data : {
            user_id : data.id,
            email_id : data.email,
            name,
            category,
            desc,
            picture,
            price,
            quantity : parseInt(quantity)
        }})

        return true
    } catch(error) {
        console.log(error)
        return false
    }
}