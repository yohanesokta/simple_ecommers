"use client"
import { HomeNavigation } from "@/app/Components/HomeNavigation"
import { useState,useEffect, useRef } from "react"
import imageCompression from 'browser-image-compression';

import { userGetData } from "@/app/auth/middleware/userGetData"
import Image from "next/image"
import { uploadFoto } from "../handle";
import { addProduct } from "./handle";
const page = () => {
    const [Userdata,SetUserData] = useState()
    const [ImageURL,SetImageUrl] = useState()
    const [OnLoad,SetLoad] = useState("")
    const product_name  = useRef()
    const price = useRef()
    const desc = useRef()
    const category = useRef()
    const stock = useRef()

  useEffect(()=>{
    userGetData(SetUserData,localStorage.getItem("token"))
  },[])

  async function updateFoto (element) {
      SetLoad("loading")
    const image = element.target.files[0]
    const imageLowSize = await imageCompression(image,{
          maxSizeMB : 500, maxWidthOrHeight : 800 , useWebWorker : true
    })
    const upload = await uploadFoto(imageLowSize)
        if (upload) {
        SetLoad("")
        SetImageUrl(upload)
    }
  }

 async function submit (event) {
    event.preventDefault();
    if (ImageURL,product_name.current.value,price.current.value,desc.current.value,category.current.value,stock.current.value) {
        const status = await addProduct(
            localStorage.getItem("token"),
            product_name.current.value,
            category.current.value,
            desc.current.value,
            ImageURL,
            price.current.value,
            stock.current.value
        )
        if (status) {
            window.location.href = "/toko"
        }
    }
 } 
  return (
    <HomeNavigation userdata={Userdata}>

    <form onSubmit={submit} className="p-4 w-full" action="">
        <div className="flex flex-col border-1 relative justify-center items-center rounded border-dotted w-full h-40">
            
            <div className="flex flex-col justify-center gap-2 items-center">
                <img className={OnLoad} src={ImageURL || "/img/dummy.png"} width={100} height={100} alt="dummy"/>
                <p className="text-gray-600">Tab To upload image</p>
            </div>
            <input required onChange={updateFoto} type="file" className="absolute top-0 left-0 w-full h-full opacity-0" />
        </div>
        <div className="flex flex-col gap-2 py-2">
            <label htmlFor="name" >Product Name</label>
            <input required ref={product_name} type="text" id="name" name="name" placeholder="Masukkan Nama Produk" className="w-full border-1 border-gray-400 p-2 rounded" />
        </div>
        <div className="flex flex-col gap-2 py-2">
            <label htmlFor="price" >Price</label>
            <input required ref={price} type="number" id="price" name="price" placeholder="Masukkan Harga Produk" className="w-full border-1 border-gray-400 p-2 rounded" />
        </div>
        <div className="flex flex-col gap-2 py-2">
            <label htmlFor="category" >Category</label>
            <input required ref={category} type="text" id="category" name="category" placeholder="Masukkan Kategori Produk" className="w-full border-1 border-gray-400 p-2 rounded" />
        </div>
        <div className="flex flex-col gap-2 py-2">
            <label htmlFor="desc" >Description</label>
            <textarea required ref={desc} id="desc" name="desc" placeholder="Masukkan Deskripsi Produk" className="w-full border-1 border-gray-400 p-2 rounded h-25" />
        </div>
        <div className="flex flex-col gap-2 py-2">
            <label htmlFor="stoc" >Stock Quantity</label>
            <input required ref={stock} type="number" id="stoc" name="stoc" placeholder="Masukkan Stok Produk (-1 untuk selalu ready )" className="w-full border-1 border-gray-400 p-2 rounded" />
        </div>


        <button className="p-3 bg-black text-white w-full my-8 rounded">Tambah Produk</button>
    </form>
    </HomeNavigation>
  )
}

export default page