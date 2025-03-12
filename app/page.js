"use client"
import { useEffect, useState } from "react";
import { HomeNavigation } from "./Components/HomeNavigation";
import { AiOutlineSearch } from "./Components/ReactIcons";
import Image from "next/image";
import { userGetData } from "./auth/middleware/userGetData";
export default function  Home () {
  const [Userdata,SetUserdata] = useState()
  useEffect(()=>{
    userGetData(SetUserdata,localStorage.getItem("token"))
  },[])
  return (<>
    <HomeNavigation userdata={Userdata}  home={true}>
      <div className="w-full p-4">
        <div className="flex shadow-md shadow-gray-300 px-2 py-3 items-center w-full rounded border-neutral-400 bg-white focus-within:shadow-gray-500">
          <input type="text" name="" id="" className="px-2 flex-1 border-0 outline-0"  placeholder="Search Product"/>
          <AiOutlineSearch className="text-2xl text-gray-500"/>
        </div>
        <div className="">
          <h1 className="mt-8 mb-4 font-bold">Categorie</h1>
          <div className="flex gap-2">
            <button className="p-1 px-5 bg-black text-white rounded-xl text-sm border-1 border-gray-300">All</button>
            <button className="p-1 px-5 bg-white rounded-xl text-sm border-1 border-gray-300">Snack</button>
            <button className="p-1 px-5 bg-white rounded-xl text-sm border-1 border-gray-300">Snack</button>
            <button className="p-1 px-5 bg-white rounded-xl text-sm border-1 border-gray-300">Snack</button>
          </div>
          <h1 className="my-5">Featured Product</h1>

          <div className="m-auto justify-between w-90 max-w-screen flex gap-2 flex-wrap">
            <div className="w-40 h-60 relative overflow-hidden bg-white border-2 border-gray-200 rounded-xl">
              <Image className="w-full h-35 object-cover" src="/img/makanan.jpeg" width={100} height={100} alt="Image"/>
              <p className="m-2 text-[8pt] font-bold max-h-8 overflow-hidden">Warung Sambal Nyos Asli Enak Lorem ipsum dolor</p>
              <span className="mx-2 mt-0 p-0 text-[9pt] font-semibold text-green-900">Rp 10.000</span>
            </div>

            <div className="w-40 h-60 relative overflow-hidden bg-white border-2 border-gray-200 rounded-xl">
              <Image className="w-full h-35 object-cover" src="/img/makanan.jpeg" width={100} height={100} alt="Image"/>
              <p className="m-2 text-[8pt] font-bold max-h-8 overflow-hidden">Warung Sambal Nyos Asli Enak Lorem ipsum dolor</p>
              <span className="mx-2 mt-0 p-0 text-[9pt] font-semibold text-green-900">Rp 10.000</span>
            </div>

            <div className="w-40 h-60 relative overflow-hidden bg-white border-2 border-gray-200 rounded-xl">
              <Image className="w-full h-35 object-cover" src="/img/makanan.jpeg" width={100} height={100} alt="Image"/>
              <p className="m-2 text-[8pt] font-bold max-h-8 overflow-hidden">Warung Sambal Nyos Asli Enak Lorem ipsum dolor</p>
              <span className="mx-2 mt-0 p-0 text-[9pt] font-semibold text-green-900">Rp 10.000</span>
            </div>
          </div>
        </div>
      </div>
    </HomeNavigation>
  </>)
}