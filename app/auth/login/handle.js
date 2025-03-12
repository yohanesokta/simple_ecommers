"use server"
import { PrismaClient } from "@prisma/client"
import bycript from "bcryptjs"
import jwt from "jsonwebtoken"
const prisma = new PrismaClient()
export async function loginHandle(email,password) {
    if (email,password) {
        try {
            
            const data = await prisma.user.findFirst({
                where : {email : email}
            })
            if (data) {
                 if ( await bycript.compare(password,data.password)) {
                    const token = jwt.sign({
                        email,
                        password,
                        role : data.role
                    },process.env.NEXT_JWT_PRIVATE)
                    console.log(token)
                    return {
                        status : true,
                        token
                    }
                 } else {
                    throw new Error()
                 }
            } else {
                throw new Error()
            }
        } catch (error) {
            console.log(error)
            return {
                status : false,
                message : "Cant Login with email & password"
            }
        }
    }
}