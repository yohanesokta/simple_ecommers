"use client"
import { useState, useEffect } from "react"
import { HomeNavigation } from "../Components/HomeNavigation"
import { userGetData } from "../auth/middleware/userGetData"
import { getPembelian } from "./handle"
import { convertIndonesianNumber, formated_date } from "../utils/client_utility"
const page = () => {
    const [Userdata,SetUserData] = useState()
    const [DataPembelian,SetDataPembelian] = useState([])
    useEffect(()=>{
        userGetData(SetUserData,localStorage.getItem("token"))
        getPembelian(localStorage.getItem("token")).then((element)=>{
            if (element) {
                SetDataPembelian(element)
            }
        })
    },[])

  return (
    <HomeNavigation userdata={Userdata}>
        <div  className="p-4  w-full flex flex-col gap-3">
            {DataPembelian?.length == 0 && <p className="text-center text-gray-500">Belum ada pembelian</p>}
            {DataPembelian?.map((element,index) => {
                 return (
                    <div key={String(index)} className="flex flex-col">
                    <a href={`https://wa.me/${convertIndonesianNumber(element?.driver_number)}`} target="_blank" className="w-full h-30 bg-white rounded shadow-xl flex overflow-hidden">
                            <img src={element?.pruduct_image || "/img/dummy.png"} alt="image" className="rounded w-30 h-30 object-cover"/>
                            <div className="flex-1 p-2 h-full">
                                <h1 className="font-bold">{element?.product_name}</h1>
                                <p className="mt-2 text-sm text-gray-500"><span className={"font-bold  bg-neutral-600 p-1 px-2 rounded mr-2" + (element?.status === "process" ? " text-yellow-300" : (element?.status == "success" ? " text-green-300" : " text-red-500") )}>{element?.status}</span>{formated_date(element?.update)}</p>
                                <p className="my-2 text-sm text-gray-500">Dibeli : {formated_date(element?.time)}</p>
                            </div>
                        </a>
                        <p className="text-sm text-center p-2 bg-green-500 rounded-b font-bold text-white">Click Atas untuk Whatsapp Kurir</p>
                    </div>
                    
                 )
            })}

        </div>
        

    </HomeNavigation>
  )
}

export default page