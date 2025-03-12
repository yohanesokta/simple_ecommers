"use server";
import bcryptjs from "bcryptjs"
import { prisma } from "@/app/utils/supabase";

export async function signHandle(email, password, repassword) {
  if ((email, password, repassword)) {
    if (password == repassword) {
      try {
        const data = await prisma.user.create({
          data: {
            email: email,
            password: await bcryptjs.hash(password,4),
            role: "user",
          },
        });
        return {
          status: true,
          message: "success",
        };
      } catch (error) {
        console.log(error)
        if (error.code = "P2002") {          
          return {
            status: false,
            message: "email yang di gunakan sudah terdaftar",
          };
        } else {
          return {
            status : false,
            message : "internal server error"
          }
        }
      }
    } else {
        return {
            status : false,
            message : "password & repassword cant differn"
        }
    }
  }
}
