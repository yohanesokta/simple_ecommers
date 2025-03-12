"use server"
import { prisma, supabase } from "../utils/supabase";
import jwt from "jsonwebtoken"

export async function uploadFoto(foto) {
    try {
    const {data,error} = await supabase.storage.from("app").upload(`toko/image${Date.now()}${Math.random() * 100}.jpg`,foto)
    if (!error){
        const url = supabase.storage.from("app").getPublicUrl(data.path)
        return url.data.publicUrl
    } else {
        return false
    }
    } catch(error) {
        return false
    }
}

export async function addToko(token,name_toko,desc_toko,alamat_toko,picture_toko) {
    try {
        const userdata = jwt.verify(token,process.env.NEXT_JWT_PRIVATE)
        console.log(userdata)
        await prisma.user.update({
            where : {
                email : userdata.email
            },
            data : {
                name_toko,
                desc_toko,
                alamat_toko,
                picture_toko
            }
        } )

        return true
    } catch (error) {
        console.log(error)
        return false
    }
    
}