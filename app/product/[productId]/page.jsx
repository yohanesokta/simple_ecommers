"use client"
import {useState , useEffect} from "react"
import { AiFillHome, AiFillPlusCircle, AiOutlineShoppingCart, BsArrowLeft } from "@/app/Components/ReactIcons"
import { GetProductDetail } from "./handle"
export default function Page (params) {
    const [ProductData,SetProductData] = useState([])
    const [Token,SetToken] = useState("")
    const [OnLoading,SetLoading] = useState(true)
    useEffect(()=>{
      SetToken(localStorage.getItem("token") || "")
      params.params.then((e)=>{
        GetProductDetail(e.productId).then((element)=>{
          SetLoading(false)
          
          if (element) {
            SetProductData(element)

          }
        })
      })
    },[])

    return <>
        <nav className="fixed w-full bg-white flex text-md items-center  justify-between">
            <div className="p-4" onClick={()=>{window.history.back()}}><BsArrowLeft className="text-xl" /></div>
              <h1>Product Details</h1>
            <a className="p-4" href="/">
            <AiFillHome  className="text-xl" />  
            </a>
        </nav>
        <div className="h-14"></div>

        {(OnLoading)?
        <div className="w-full p-2 ">
        <div className="w-full h-50 bg-neutral-500 loading rounded-2xl"></div>
        <div className="w-full my-2 h-10 bg-neutral-500 loading rounded"></div>
        <div className="w-20 my-2 h-5 bg-neutral-500 loading rounded"></div>
        <div className="w-40 my-2 h-5 bg-neutral-500 loading rounded"></div>
      </div> : 
      <>
      <img className="w-full h-60 object-cover" src={ProductData?.data?.picture || "/img/dummy.png"} width={200} height={200} alt="image"/> 
        <div className="p-4">
          <h1 className="font-bold text-2xl">{ProductData.data?.name || ""}</h1>
          <h2 className="my-2 font-semibold text-green-800 text-xl">Rp {ProductData.data?.price || ""}</h2>
          <div className="flex w-full gap-2 py-4">
            <div className="w-15 h-15 my-auto">
              <img className="max-w-15 max-h-15 rounded-full" src={ProductData.toko?.picture_toko || "/img/dummy.png"}/>
            </div>
            <div className="">
              <h1 className="font-bold">{ProductData.toko?.name_toko || ""}</h1>
              <p className="text-gray-700">{ProductData.toko?.desc_toko || ""}</p>
            </div>
          </div>
          <h1 className="font-semibold py-4">Description</h1>
          <p>{ProductData.data?.desc || ""}.</p>
        </div>

      </>

        }
        

        

        <div className="h-12 w-full"></div>
        <footer className="fixed w-full px-4 py-1 gap-2 justify-between h-12 bg-white bottom-0 flex">
          {(Token) ? 
          
        <>
          <a href={"/pembelian"} className="border-1 px-5 text-center justify-center items-center flex rounded bg-white font-bold text-xl"><AiOutlineShoppingCart/></a>
          <a href={`/product/buy/${ProductData.data?.id || ""}`} className="flex-1 flex justify-center items-center bg-black rounded text-white">Buy Now</a>
        </> : 
         <>
         <a href="/" className="flex justify-center items-center border-1 px-5 rounded bg-white font-bold text-xl"><AiFillHome/></a>
         <a href="/auth/login" className="flex-1 flex justify-center items-center bg-black rounded text-white">Login</a>
       </>
         }

        </footer>
    </>
}