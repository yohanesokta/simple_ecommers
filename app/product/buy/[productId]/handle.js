"use server"
import { prisma } from "@/app/utils/supabase";
import jwt from "jsonwebtoken"

export async function createTicket(token,product_id,name_product,alamat,number,product_image) {
    try {
        const tokens = jwt.decode(token)
        const user_data = await prisma.user.findUnique({
            where : {
                email : tokens.email
            }
        })
        const data = await prisma.user.findFirst({
            where : {
                role : "driver",
                driver_ready : true
            }
        })
        if (!data) {
            return {
                status : "error",
                message : "Driver Tidak Tersedia"
            }
        }
        await prisma.user.update({
            where : {
                id : data.id
            },
            data : {
                driver_ready : false
            }
        })
        await prisma.ticket.create({
            data : {
                user_id : user_data.id,
                driver_id : data.id,
                driver_number : data.number_driver,
                product_name : name_product,
                product_id : product_id,
                user_alamat : alamat,
                user_number : number,
                status : "process",
                pruduct_image : product_image
            }
        })
        return {
            status : "success",
            message : "success"
        }
        

    } catch (error) {
        console.log(error)
        return {
            status : "error",
            message : "Internal Server Error"
        }
    }
}