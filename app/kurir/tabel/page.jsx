"use client"
import { useState, useEffect, useRef } from "react"
import { HomeNavigation } from "../../Components/HomeNavigation"
import { userGetData } from "../../auth/middleware/userGetData"
import { CompletePembelian, getPembelian } from "./handle"
import { convertIndonesianNumber, formated_date } from "../../utils/client_utility"
import { LoaderComponent } from "@/app/product/buy/[productId]/searchingDriver"
const page = () => {
    const [Userdata,SetUserData] = useState()
    const [OnLoader,SetLoader] = useState(false)
    const [DataPembelian,SetDataPembelian] = useState([])
    useEffect(()=>{
        userGetData(SetUserData,localStorage.getItem("token"))
        getPembelian(localStorage.getItem("token")).then((element)=>{
            if (element) {
                SetDataPembelian(element)
            }
        })
    },[])

   async function CompletePembelianAction(id) {
        SetLoader(true)
        console.log("clicked")
        const element = await CompletePembelian(localStorage.getItem("token"),id)

            if (element) {
                SetLoader(false)
                window.location.reload()
            }
    }

  return (
    <HomeNavigation userdata={Userdata}>
        <div  className="p-4  w-full flex flex-col gap-3">
            {DataPembelian?.length == 0 && <p className="text-center text-gray-500">Belum ada pembelian</p>}
            {DataPembelian?.map((element,index) => {
                 return (
                    <div className="flex flex-col" key={String(index)}>
                        <div className="w-full h-30 bg-white rounded shadow-xl flex overflow-hidden">
                                <img src={element?.pruduct_image || "/img/dummy.png"} alt="image" className="rounded w-30 h-30 object-cover"/>
                                <div className="flex-1 p-2 h-full">
                                    <h1 className="font-bold">{element?.product_name}</h1>
                                    <p className="mt-2 text-sm text-gray-500"><span className={"font-bold  bg-neutral-600 p-1 px-2 rounded mr-2" + (element?.status === "process" ? " text-yellow-300" : (element?.status == "success" ? " text-green-300" : " text-red-500") )}>{element?.status}</span>{formated_date(element?.update)}</p>
                                    <p className="my-2 text-sm text-gray-500">Dibeli : {formated_date(element?.time)}</p>
                                </div>
                            </div>
                            {(element.status == "process") ?  
                            
                            <div className="flex w-full">
                                <button onClick={()=>{CompletePembelianAction(element?.id)}} className="cursor-pointer bg-white w-[50%] p-2 text-sm rounded-bl">Click To Complete</button>


                                <a href={`https://wa.me/${convertIndonesianNumber(element?.driver_number)}`} target="_blank" className="bg-green-500 text-center flex-1 text-white p-2 text-sm font-normal rounded-br">Whatsapp</a>
                            </div> : <></>
                            }
                    </div>
                 )
            })}

        </div>
            {(OnLoader) ? 
                <LoaderComponent text={"Loading..."}/> : ""
            }
    </HomeNavigation>
  )
}

export default page