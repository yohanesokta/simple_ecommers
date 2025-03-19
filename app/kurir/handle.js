"use server"
import jwt from "jsonwebtoken"
import { prisma } from "../utils/supabase"

export async function JoinKurir(token,name_driver,number_driver){
    try{
        const userdata = jwt.decode(token)
        const data = await prisma.user.update({
            where : {
                email : userdata.email
            },
            data : {
                role : 'driver',
                name_driver,
                number_driver
            }
        })
        return true
    } catch(error){
        console.error(error)
        return false
    }

}