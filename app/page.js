"use client"
import { useEffect, useRef, useState } from "react";
import { HomeNavigation } from "./Components/HomeNavigation";
import { AiOutlineSearch } from "./Components/ReactIcons";
import Image from "next/image";
import { userGetData } from "./auth/middleware/userGetData";
import { PublicProduct } from "./utils/public_handle";
export default function  Home () {
  const [Userdata,SetUserdata] = useState()
  const [ProductData,SetProductData] = useState([])
  const [LoadingData,SetLoadingData] = useState(false)
  const [Search,SetSearch] = useState("")

  useEffect(()=>{
    userGetData(SetUserdata,localStorage.getItem("token"))
    PublicProduct().then((element)=>{
      SetLoadingData(true)
      if (element){
        console.log(element)
        SetProductData(element)
      }
    })
  },[])
  return (<>
    <HomeNavigation userdata={Userdata}  >
      <div className="w-full p-4">
        <div className="flex shadow-md shadow-gray-300 px-2 py-3 items-center w-full rounded border-neutral-400 bg-white focus-within:shadow-gray-500">
          <input onKeyUp={(event)=>{SetSearch(event.target.value)}} type="text" name="" id="" className="px-2 flex-1 border-0 outline-0"  placeholder="Search Product"/>
          <AiOutlineSearch className="text-2xl text-gray-500"/>
        </div>
        <div className="">
          <h1 className="mt-8 mb-4 font-bold">Kategori</h1>
          <div className="flex gap-2">
            <button className="p-1 px-5 bg-black text-white rounded-xl text-sm border-1 border-gray-300">All</button>
            {/* <button className="p-1 px-5 bg-white rounded-xl text-sm border-1 border-gray-300">Snack</button>
            <button className="p-1 px-5 bg-white rounded-xl text-sm border-1 border-gray-300">Snack</button>
            <button className="p-1 px-5 bg-white rounded-xl text-sm border-1 border-gray-300">Snack</button> */}
          </div>
          <h1 className="my-5">Tampil Product</h1>
          <div className="m-auto justify-between w-full max-w-screen flex gap-2 flex-wrap">
          {(LoadingData)?
           <>{ProductData.filter((element) => (element.name.toLowerCase().includes(Search.toLowerCase()))).map((element,index) =>{
            return <div key={String(index)} onClick={()=>{window.location.href = `/product/${element.id}`}} className="w-[45%] pb-2 relative overflow-hidden bg-white border-2 border-gray-200 rounded-xl">
              <img className="w-full h-35 object-cover" src={element.picture} width={100} height={100} alt="Image"/>
              <p className="m-2 text-[10pt] font-bold max-h-10 overflow-hidden">{element.name}</p>
              <p className="text-[8pt] px-2 text-neutral-600 h-8 overflow-hidden">{element.desc}</p>
              <div className="flex relative">
              <p className="mx-2 mt-2 text-[12pt] font-semibold text-green-900"><span className="font-semibold text-sm">Rp</span>  {element.price}</p>
              <p className="m-2 absolute right-0 text-[8pt] bg-red-500 px-[10px] py-[1px] font-bold text-white">COD</p>
              </div>
              <div className="flex px-2 my-1">
                <p className="text-[8pt] py-[2px] px-2 rounded text-white bg-neutral-700">{element.category}</p>
              </div>
            </div>
          })}</> :
          <div className="w-[50%] h-70 bg-white border-2 border-gray-200    rounded-md">
            <div className="w-[90%] loading h-35 mx-auto my-2 rounded bg-gray-300"></div>
            <div className="w-[90%] loading h-10 mx-auto my-2 rounded bg-gray-300"></div>
            <div className="w-20 h-5 loading delay-75 mx-4 my-2 rounded bg-gray-300"></div>
          </div>
          
        }
          
          

          </div>
        </div>
      </div>
    </HomeNavigation>
  </>)
}