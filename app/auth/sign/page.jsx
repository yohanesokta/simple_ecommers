"use client"
import Link from "next/link"
import { AiOutlineUser, BsLockFill, IoMdArrowRoundBack } from "@/app/Components/ReactIcons"
import { useRef, useState } from "react"
import { signHandle } from "./handle"
export default function Page() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const repasswordRef = useRef()
    const [Broker,SetBroker] = useState("")

    function BrokerMessage(message){
        SetBroker(message);
        setTimeout(()=>{
            SetBroker("")
        },5000)
    }

    async function SubmitHandle(event) {
        event.preventDefault()
        const status = await signHandle(emailRef.current.value,passwordRef.current.value,repasswordRef.current.value)
        if (status.status) {
            window.location.href = "/auth/login"
        } else {
            BrokerMessage(status.message)
        }
    }   

    return (<>
        <div className="w-full h-screen bg-white">
            <nav className="p-3 bg-white border-b-1 border-gray-500">
                <Link href="/auth/login" className="flex gap-2 items-center text-xl">  <IoMdArrowRoundBack/> Sign </Link>
            </nav>
            <form onSubmit={SubmitHandle} className="m-auto p-4 flex flex-col gap-3 bg-white">
                <div className="flex gap-2 items-cente p-3 border-b-1 border-gray-400">
                    <AiOutlineUser/>
                    <input ref={emailRef} required className="flex-1 outline-0" type="email" id="email" name="email" placeholder="Email Address" />
                </div>
                <div className="flex gap-2 items-cente p-3 border-b-1 border-gray-400">
                    <BsLockFill/>
                    <input ref={passwordRef} required className="flex-1 outline-0" type="password" id="password" name="password" placeholder="Password" />
                </div>
                <div className="flex gap-2 items-cente p-3 border-b-1 border-gray-400">
                    <BsLockFill/>
                    <input ref={repasswordRef} required className="flex-1 outline-0" type="password" id="password2" name="password2" placeholder="Retype Password" />
                </div>

                {(Broker) ? 
                <p className="text-red-500">{Broker}</p> : "" }
                <button type="submit" className="w-full p-2 bg-white border-1 border-gray-500 rounded">Daftar</button>

                <p className="text-center p-2">Atau</p>
                <Link href="/auth/login" className="text-center w-full p-2 bg-white border-1 border-gray-500 rounded">Login dengan akun</Link>

            </form>


            <footer className=""></footer>
        </div> 
    </>)
}