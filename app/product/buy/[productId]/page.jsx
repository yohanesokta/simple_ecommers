'use client'
import { useEffect, useRef, useState } from "react"
import { userGetData } from "@/app/auth/middleware/userGetData"
import { HomeNavigation } from "@/app/Components/HomeNavigation"
import { GetProductDetail } from "../../[productId]/handle"
import { createTicket } from "./handle"
import { LoaderComponent } from "./searchingDriver"
const page = (params) => {

  const [Userdata , SetUserData] = useState()
  const [ProductData,SetProductData] = useState()
  const [Action,SetAction] = useState(false)
  const alamat  = useRef()
  const number = useRef()

  useEffect(()=>{
          userGetData(SetUserData,localStorage.getItem("token"))
          params.params.then((e)=>{
                  GetProductDetail(e.productId).then((element)=>{
                    console.log(element)
                    if (element) {
                      SetProductData(element)
                    }
                  })
                })
      },[])

     async function submitHandle (event) {
       event.preventDefault()
       SetAction(true)  
       const action = await createTicket(
          localStorage.getItem("token"),
          ProductData?.data?.id,
          ProductData?.data?.name,
          alamat.current.value,
          number.current.value,
          ProductData?.data?.picture
        )
        SetAction(false);

        if (action.status == "success") {
          window.location.href = "/"
        } else {
            window.alert(action.message)
        }

      }
  return (
    <HomeNavigation userdata={Userdata}>
      <div className="block w-full px-4 py-2">
          <form onSubmit={submitHandle} className="w-full flex flex-col gap-2">
                <label htmlFor="name">Nama Product</label>
                <input disabled  className="bg-white resize-none py-3 px-4 rounded-md w-full border-1 border-gray-500 mb-2 text-gray-500" value={ProductData?.data?.name || ""}/>

                <label htmlFor="name">Alamat Kamu</label>
                <textarea required ref={alamat} className="bg-white resize-none py-3 px-4 rounded-md w-full border-1 border-gray-500 mb-2" placeholder="Alamat Lengkap" />

                <label htmlFor="whatsapp">Whatsapp</label>
                <input required ref={number} className="bg-white py-3 px-4 rounded-md w-full border-1 border-gray-500 mb-2" placeholder="No Whatsapp (Opsional)" type="text" />
                
                <button type="submit" className="w-full p-3 rounded-md font-bold text-white bg-black">Beli</button>
            </form>
        </div>
        {(Action) ? 
        <LoaderComponent text={"Searching Driver"}/> : ""
      }
    </HomeNavigation>
  )
}

export default page