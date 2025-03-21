'use client'
import { userGetData } from "@/app/auth/middleware/userGetData"
import { HomeNavigation } from "@/app/Components/HomeNavigation"
import { useEffect, useState , useRef} from "react"
import { LoaderComponent } from "@/app/product/buy/[productId]/searchingDriver"
import { GetProductDetail } from "@/app/product/[productId]/handle"
import { deleteProduct, editProduct } from "./handle"
import imageCompression from 'browser-image-compression';
import { uploadFoto } from "../../handle"


const page = ({params}) => {
    const [Userdata,SetUserdata] = useState([])
    const[Loadiing,SetLoading] = useState(false)
    const [Product,SetProduct] = useState([])
    const [ImageURL,SetImageUrl] = useState("")
    const [Load,SetLoad] = useState("")
        const product_name  = useRef()
        const price = useRef()
        const desc = useRef()
        const category = useRef()
        const stock = useRef()
    
    async function submitEdit(event){
        event.preventDefault()
        SetLoading(true)
        const action = await editProduct(
            Product?.data?.id,
            product_name.current.value,
            category.current.value,
            desc.current.value,
            price.current.value,
            stock.current.value,
            ImageURL
        )
        SetLoading(false)
        if (action) {
            window.location.href = "/toko"
        } else {
            window.alert("Internal Server Error!")
        }
    }

    async function  handleDelete() {
        SetLoading(true)
        const action = await deleteProduct(Product?.data?.id);
        SetLoading(false)
        if (action) {
            window.location.href = "/toko"
        } else {
            window.alert("Internal Server Error!")
        }
    }


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

    useEffect(()=>{
        SetLoading(true)
        userGetData(SetUserdata,localStorage.getItem("token"))
        params.then((param)=>{
            GetProductDetail(param.id).then((details)=>{
                SetLoading(false)
                if (details) {
                    SetProduct(details)
                    SetImageUrl(details.data.picture)
                    product_name.current.value = details.data.name
                    price.current.value = details.data.price
                    category.current.value = details.data.category
                    desc.current.value = details.data.desc
                    stock.current.value = details.data.quantity
                }
            })
        })
    },[])
  return (
    <HomeNavigation userdata={Userdata}>
         <form onSubmit={submitEdit} className="p-4 w-full" action="">
        <div className="flex flex-col border-1 relative justify-center items-center rounded border-dotted w-full h-40">
            
            <div className="flex flex-col h-full w-full relative justify-center gap-2 items-center">
                <img className={"h-full w-full object-cover " + Load} src={ImageURL || "/img/dummy.png"} width={100} height={100} alt="dummy"/>
                <label htmlFor="files" className="p-2 bg-white opacity-50 absolute bottom-5 rounded">Ubah Gambar</label>
                <input onChange={updateFoto} type="file" name="files" id="files" className="hidden"/>
            </div>
        </div>
        <div className="flex flex-col gap-2 py-2">
            <label htmlFor="name" >Product Name</label>
            <input required ref={product_name} type="text" id="name" name="name" placeholder="Masukkan Nama Produk" className="w-full border-1 border-gray-400 p-2 rounded" />
        </div>
        <div className="flex flex-col gap-2 py-2">
            <label htmlFor="price" >Price</label>
            <input required ref={price} type="number" id="price" name="price" placeholder="Masukkan Harga Produk" className="w-full border-1 border-gray-400 p-2 rounded"  />
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


        <button className="p-3 bg-black text-white w-full my-8 rounded">Edit Produk</button>
        <button onClick={handleDelete} type="button" className="p-3 bg-red-600 text-white w-full mb-2 rounded">Delete Produk</button>

    </form>

        {(Loadiing) ? 
                <LoaderComponent text="Please wait.."/> : ""
                }
    </HomeNavigation>
  )
}
export default page