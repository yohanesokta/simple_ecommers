"use client"
import { AiOutlineUser, BsLockFill, IoMdArrowRoundBack } from "@/app/Components/ReactIcons"
import Link from "next/link"
import { useState , useRef } from "react"
import { loginHandle } from "./handle"
import { LoaderComponent } from "@/app/product/buy/[productId]/searchingDriver"
export default function Page() {
         const emailRef = useRef()
        const passwordRef = useRef()
        const [Loadiing,SetLoading] = useState(false)
        const [Broker,SetBroker] = useState("")
    
        function BrokerMessage(message){
            SetBroker(message);
            setTimeout(()=>{
                SetBroker("")
            },5000)
        }
    
        async function SubmitHandle(event) {
            event.preventDefault()
            SetLoading(true)
            const status = await loginHandle(emailRef.current.value,passwordRef.current.value)
            console.log(status)
            SetLoading(false)
            if (status.status) {
                localStorage.setItem("token",status.token)
                window.location.href = "/"
            } else {
                BrokerMessage(status.message)
            }
        }   
    return (<>
        <div className="w-full h-screen bg-white">
            <nav className="p-3 bg-white border-b-1 border-gray-500">
                <Link href="/" className="flex gap-2 items-center text-xl"> <IoMdArrowRoundBack/> Login </Link>
            </nav>
            <h1 className="text-center font-bold text-3xl p-5">Camilan <span className="text-red-400">99</span></h1>
            <form onSubmit={SubmitHandle}  className=" m-auto p-4 flex flex-col gap-3 bg-white">
                <div className="flex gap-2 items-cente p-3 border-b-1 border-gray-400">
                    <AiOutlineUser/>
                    <input ref={emailRef} required className="flex-1 outline-0" type="email" id="email" name="email" placeholder="Email Address" />
                </div>
                <div className="flex gap-2 items-cente p-3 border-b-1 border-gray-400">
                    <BsLockFill/>
                    <input ref={passwordRef} required className="flex-1 outline-0" type="password" id="password" name="password" placeholder="Password" />
                    <button type="button">Lupa?</button>
                </div>

                {(Broker)?     
                <p className="text-red-500">{Broker}</p> : ""
                }
                <button type="submit" className="w-full p-2 bg-white border-1 border-gray-500 rounded">Login</button>

                <p className="text-center p-2">Atau</p>
                <Link href="/auth/sign" className="w-full p-2 bg-white border-1 text-center border-gray-500 rounded">Daftar akun baru</Link>

            </form>
            {(Loadiing) ? 
            <LoaderComponent text="Please wait.."/> : ""
            }

            <footer className=""></footer>
        </div> 
    </>)
}