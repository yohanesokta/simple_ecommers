"use client"
import { useState , useRef} from "react"
import { addToko, uploadFoto } from "./handle"
import imageCompression from 'browser-image-compression';


export const CreateToko = ({data_toko}) => {
  const [Saving,SetSaving] = useState(false)
  const [ImageURL,SetImageURL] = useState()
  const [Onload,SetLoad] = useState("")
  const [OnError,SetError] = useState(false)

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
    const submit = await addToko(
      localStorage.getItem("token"),
      namatokoRef.current.value,
      desctokoRef.current.value,
      alamattokoRef.current.value,
      ImageURL
  )
  if (submit) {
    window.location.href = "/toko"
  } else {
    showError()
  }
    
  }
  
  return (
      <div className="w-full h-30 px-4 py-5">
        <h1 className="text-xl">Buat Toko</h1>
        <form onSubmit={submitingAction} onChange={CheckValue} action="" className="py-4 flex flex-col gap-3 w-full">
          <div className="flex gap-2">

            <img className={`w-30 h-30 object-cover ${Onload} rounded-2xl`} src={ImageURL || "/img/dummy.png"} alt="" />
            <div className="flex flex-col gap-2">
              <h1 className="font-bold">Foto Toko</h1>
              <label htmlFor="file" className="p-2 border-1 rounded-sm">Upload Foto</label>
              <input onChange={imageUpdate} required className="hidden" id="file" name="file" type="file" />
            </div>
          </div>
          <input ref={namatokoRef} required className="bg-gray-100 rounded-md text-black  p-3 pl-4 " type="text" placeholder="Nama Toko" />
          <textarea ref={desctokoRef} required className="bg-gray-100 rounded-md text-black  p-3 pl-4 " type="text" placeholder="Descripsi Toko" />
          <textarea ref={alamattokoRef} required className="bg-gray-100 rounded-md text-black  p-3 pl-4 " type="text" placeholder="Alamat Toko" />
          {(OnError) ?
            <p className="text-red-500">Gagal melakukan update toko</p> : ""
           }
        <button ref={buttonRef} className={`p-2 text-white font-bold rounded-md ${(Saving) ? "bg-amber-500" : "bg-amber-200"}`}>Simpan Toko</button>
        </form>
      </div>
  )
}