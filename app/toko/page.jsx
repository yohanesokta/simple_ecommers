"use client"
import { CreateToko } from "./createToko"
import { HomeNavigation } from "../Components/HomeNavigation"
import { userGetData } from "../auth/middleware/userGetData"
import { useState , useEffect} from "react"
import Image from "next/image"
import { getDataMyProduct } from "./handle"
const Page = () => {
  const [Userdata,SetUserdata] = useState()
  const [DataProduct,SetDataProduct] = useState([])
  useEffect(()=>{
    const token = localStorage.getItem("token")
    userGetData(SetUserdata,token)
    getDataMyProduct(token).then((element) => {
      if (element) {
        SetDataProduct(element)
      }
    })
  },[])
  return (
    <HomeNavigation userdata={Userdata}>
    {(Userdata?.data?.name_toko) ? 
    <>
      <div className="p-4 w-full h-full " >
        <div className="flex gap-4">
          <h1 className="text-xl font-bold">Tokomu</h1>
          <button className="border-1 px-2 rounded">Edit</button>
        </div>
        <div className="flex pt-8 pb-5">
          <img className="w-30 h-30 object-cover rounded-2xl" src={Userdata.data.picture_toko} alt="Profile Toko"/>
          <div className="px-2">
            <h1 className="font-bold text-xl">{Userdata.data.name_toko}</h1>
            <p className="max-h-19 overflow-ellipsis overflow-hidden">{Userdata.data.desc_toko}</p>
          </div>
        </div>
        <div className="">
          <p><span className="font-semibold">Location : </span>{Userdata.data.alamat_toko}</p>
        </div>
        <div className="py-5 flex flex-col ">
          <div className="flex gap-4">
            <h1 className="text-xl text-gray-700 font-bold">Barang</h1>
            <a href="/toko/barang" className="border-1  px-2 rounded">Tambah</a>
          </div>
          <div className="py-4 flex flex-wrap gap-5">
        {DataProduct.map((element,index)=>{
        return (
            <div key={String(index)} className="w-40 h-60 relative overflow-hidden bg-white border-2 border-gray-200 rounded-xl">
              <img className="w-full h-35 object-cover" src={element.picture} width={100} height={100} alt="Image"/>
              <p className="m-2 text-[10pt] font-bold max-h-10 overflow-hidden">{element.name}</p>
              <span className="mx-2 mt-0 p-0 text-[9pt] font-semibold text-green-900">Rp {element.price}</span>
            </div>)
        })}

          </div>
        </div>
      </div>
    </>
    :<CreateToko/>
    }
    </HomeNavigation>
  )
}

export default Page