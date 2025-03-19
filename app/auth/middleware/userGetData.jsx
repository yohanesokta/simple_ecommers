"use client"
import { userMiddleware } from "./user"

export const userGetData = (SetUserdata,token)=>{
    if (token) {
      userMiddleware(token).then((element)=>{
        if (element.status) {
          console.log(element)
          SetUserdata({
            onload : true,
            data : element.data
          })
        } else {
          localStorage.removeItem("token")
          console.log(element)
          window.location.href = "/auth/login"
        }
      })
    } else {
      SetUserdata({
        onload : true,
        data : false
      })
    }
  }