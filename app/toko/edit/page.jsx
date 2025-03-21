"use client"
import { useState , useRef, useEffect} from "react"
import { addToko, uploadFoto } from "../handle"
import imageCompression from 'browser-image-compression';
import { userGetData } from "@/app/auth/middleware/userGetData";
import { deleteToko, getTokoData } from "./handle";
import { LoaderComponent } from "@/app/product/buy/[productId]/searchingDriver";


export default function page () {
  const [Saving,SetSaving] = useState(false)
  const [ImageURL,SetImageURL] = useState()
  const [Onload,SetLoad] = useState("")
  const [OnError,SetError] = useState(false)
  const [Loading,SetLoading] = useState(true)

  function showError() {
    SetError(true)
    setTimeout(()=>{
      SetError(false)
    },5000)
  }

  const namatokoRef = useRef()
  const desctokoRef = useRef()
  const alamattokoRef = useRef()
  const buttonRef = useRef()

  function CheckValue() {
    if (namatokoRef.current.value && desctokoRef.current.value && alamattokoRef.current.value && ImageURL) {
      SetSaving(true)
      buttonRef.current.disabled = false
    } else {
      buttonRef.current.disabled = true
      SetSaving(false)
    }
  }

  async function imageUpdate(element) {
    SetLoad("loading")
    const image = element.target.files[0]
    const imageLowSize = await imageCompression(image,{
      maxSizeMB : 500, maxWidthOrHeight : 800 , useWebWorker : true
    })
    const upload = await uploadFoto(imageLowSize)
    if (upload) {
      SetLoad("")
      SetImageURL(upload)
    }
  }
  async function submitingAction(event) {
    event.preventDefault();
    SetLoading(true)
    const submit = await addToko(
      localStorage.getItem("token"),
      namatokoRef.current.value,
      desctokoRef.current.value,
      alamattokoRef.current.value,
      ImageURL
  )
  SetLoading(false)
  if (submit) {
    window.location.href = "/toko"
  } else {
    showError()
  }
    
  }

  async function hapus() {
    const token = localStorage.getItem("token")
    if (confirm("Apakah Anda Yakin?")){
      SetLoading(true)
      const action = await deleteToko(token)
      SetLoading(false)
      if (action) {
        window.location.href = "/toko"
      }

    }
  }
  
  useEffect(()=>{
    getTokoData(localStorage.getItem("token")).then((data)=>{
      SetLoading(false)
      SetImageURL(data.picture_toko)
      namatokoRef.current.value = data.name_toko
      desctokoRef.current.value = data.desc_toko
      alamattokoRef.current.value = data.alamat_toko
      buttonRef.current.disabled = false
      SetSaving(true)
    })
  },[])
  
  return (
      <div className="w-full h-30 px-4 py-5">
        <h1 className="text-xl">Edit Toko</h1>
        <form onSubmit={submitingAction} onChange={CheckValue} action="" className="py-4 flex flex-col gap-3 w-full">
          <div className="flex gap-2">

            <img className={`w-30 h-30 object-cover ${Onload} rounded-2xl`} src={ImageURL || "/img/dummy.png"} alt="" />
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">Foto Toko</h1>
              <label htmlFor="file" className="p-2 border-1 rounded-sm">Upload Foto</label>
              <input onChange={imageUpdate} className="hidden" id="file" name="file" type="file" />
            </div>
          </div>
          <label className="px-3 py-2">Nama Toko</label>
          <input ref={namatokoRef} required className="bg-gray-100 rounded-md text-black  p-3 pl-4 " type="text" placeholder="Nama Toko" />
          <label className="px-3 py-2">Deskripsi Toko</label>

          <textarea ref={desctokoRef} required className="bg-gray-100 rounded-md text-black  p-3 pl-4" type="text" placeholder="Descripsi Toko" />
          <label className="px-3 py-2 ">Alamat Toko</label>

          <textarea ref={alamattokoRef} required className="bg-gray-100 rounded-md text-black  p-3 pl-4 " type="text" placeholder="Alamat Toko" />
          {(OnError) ?
            <p className="text-red-500">Gagal melakukan update toko</p> : ""
           }
        <button ref={buttonRef} className={`p-2 text-white font-bold rounded-md ${(Saving) ? "bg-amber-500" : "bg-amber-200"}`}>Simpan Toko</button>
        <button onClick={hapus} type="button" ref={buttonRef} className={`p-2 mt-4 text-white font-bold rounded-md ${(Saving) ? "bg-red-600" : "bg-amber-200"}`}>Hapus Toko</button>
        
        </form>
          {(Loading) ? 
        <LoaderComponent/> : ""
          }
      </div>
  )
}