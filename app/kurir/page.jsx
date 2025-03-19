"use client"

import { useState , useEffect, useRef } from "react"
import { userGetData } from "../auth/middleware/userGetData"
import { HomeNavigation } from "../Components/HomeNavigation"
import { JoinKurir } from "./handle"
const page = () => {
    const [Userdata,SetUserData] = useState()
    const name = useRef()
    const number = useRef()

    useEffect(()=>{
        userGetData(SetUserData,localStorage.getItem("token"))
    },[])

    async function SubmitAction(event){
        event.preventDefault()
        const status = await JoinKurir(
            localStorage.getItem("token"),
            name.current.value,
            number.current.value
        )
        if (status) {
            window.location.href = "/"
        } else {
            window.alert("Internal Server Error")
            window.location.reload()
        }
    }

  return (
    <HomeNavigation userdata={Userdata}>
        <div className="block w-full px-4 py-2">
            <h1 className="text-2xl font-bold py-4">Daftar Kurir</h1>
            <form onSubmit={SubmitAction} className="w-full flex flex-col gap-2">
                
                <label htmlFor="name">Nama Asli</label>
                <input required ref={name} className="bg-white py-3 px-4 rounded-md w-full border-1 border-gray-500 mb-2" placeholder="Nama lengkap" type="text" />

                <label htmlFor="whatsapp">Whatsapp</label>
                <input required ref={number} className="bg-white py-3 px-4 rounded-md w-full border-1 border-gray-500 mb-2" placeholder="No Whatsapp" type="text" />
                
                <button type="submit" className="w-full p-3 rounded-md font-bold text-white bg-black">Daftar</button>

            </form>
        </div>
    </HomeNavigation>
  )
}

export default page