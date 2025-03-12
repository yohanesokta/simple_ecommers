"use client"
import { HomeNavigation } from "@/app/Components/HomeNavigation"
import { useState,useEffect, useRef } from "react"
import { userGetData } from "@/app/auth/middleware/userGetData"
import Image from "next/image"
const page = () => {
    const [Userdata,SetUserData] = useState()
    const [ImageURL,SetImageUrl] = useState()
    const product_name  = useRef()
    const price = useRef()
    const desc = useRef()
    const category = useRef()
    const stock = useRef()

  useEffect(()=>{
    userGetData(SetUserData,localStorage.getItem("token"))
  },[])

  return (
    <HomeNavigation userdata={Userdata}>

    <form className="p-4 w-full" action="">
        <div className="flex flex-col border-1 relative justify-center items-center rounded border-dotted w-full h-40">
            
            <div className="flex flex-col justify-center gap-2 items-center">
                <Image className=" " src={"/img/dummy.png"} width={100} height={100} alt="dummy"/>
                <p className="text-gray-600">Tab To upload image</p>
            </div>
            <input type="file" className="absolute top-0 left-0 w-full h-full opacity-0" />
        </div>
        <div className="flex flex-col gap-2 py-2">
            <label htmlFor="name" >Product Name</label>
            <input ref={product_name} type="text" id="name" name="name" placeholder="Masukkan Nama Produk" className="w-full border-1 border-gray-400 p-2 rounded" />
        </div>
        <div className="flex flex-col gap-2 py-2">
            <label htmlFor="price" >Price</label>
            <input ref={price} type="number" id="price" name="price" placeholder="Masukkan Harga Produk" className="w-full border-1 border-gray-400 p-2 rounded" />
        </div>
        <div className="flex flex-col gap-2 py-2">
            <label htmlFor="category" >Category</label>
            <input ref={category} type="number" id="category" name="category" placeholder="Masukkan Kategori Produk" className="w-full border-1 border-gray-400 p-2 rounded" />
        </div>
        <div className="flex flex-col gap-2 py-2">
            <label htmlFor="desc" >Description</label>
            <textarea ref={desc} id="desc" name="desc" placeholder="Masukkan Deskripsi Produk" className="w-full border-1 border-gray-400 p-2 rounded h-25" />
        </div>
        <div className="flex flex-col gap-2 py-2">
            <label htmlFor="stoc" >Stock Quantity</label>
            <input ref={stock} type="number" id="stoc" name="stoc" placeholder="Masukkan Stok Produk (-1 untuk selalu ready )" className="w-full border-1 border-gray-400 p-2 rounded" />
        </div>


        <button className="p-3 bg-black text-white w-full my-8 rounded">Tambah Produk</button>
    </form>
    </HomeNavigation>
  )
}

export default page