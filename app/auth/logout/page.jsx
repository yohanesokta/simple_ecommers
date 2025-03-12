"use client"
import React, { useEffect } from 'react'

export default function Page  () {
    useEffect(()=>{
        localStorage.removeItem("token");
        window.location.href = "/auth/login"
    },[])
}
