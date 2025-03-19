"use client";
import { useState } from "react";
import {
  AiFillBell,
  AiFillCar,
  AiFillHome,
  AiOutlineShoppingCart,
  BsArchiveFill,
} from "./ReactIcons";
import Link from "next/link";

export const HomeNavigation = (props) => {
  const [ViewProfile, SetViewProfile] = useState(false);

  return (
    <div className="flex flex-col h-screen">
      <nav className="w-full h-18 bg-white border-1 items-center justify-between border-gray-300 text-gray-600 flex">
        <div className="m-4">
          <span className="font-bold">Camilan 99</span>
        </div>

        <div className=" h-10 m-4 flex">
          <div className="w-10 h-10 flex justify-center items-center">
            <AiFillBell className="text-2xl" />
          </div>

          {props.userdata?.data ? (
            <div
              className="w-10 h-10"
              onClick={() => {
                SetViewProfile(!ViewProfile);
              }}
            >
              <div className="w-10 h-10 bg-neutral-600 rounded-full flex justify-center items-center relative">
                <span className="text-white font-bold">
                  {String(props.userdata.data.email).split("")[0].toUpperCase()}
                </span>

                {ViewProfile ? (
                  <div className="fixed w-screen h-screen top-15 left-0 flex  z-50 bg-white p-3">
                    <ul className="p-2 text-md  w-full font-bold flex flex-col gap-3">
                      <li className="w-full">Profile</li>
                      <li className="w-full">
                        <a className="w-full" href="/pembelian"><p>Pembelian</p></a>
                      </li>

                      <li><a href="/toko" >Toko</a></li>
                      {(props.userdata?.data.role != "driver") ? 
                      
                      <li><a href="/kurir" >Daftar Kurir</a></li> :""
                    }
                      <li className="w-full">
                        <a className="w-full" href="/auth/logout"><p>Logout</p></a>
                      </li>
                    </ul>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          ) : (
            <Link
              href="/auth/login"
              className="py-2 px-4 border-1 border-neutral-500 rounded"
            >
              Login
            </Link>
          )}
        </div>
      </nav>

      <div className="flex flex-1 overflow-y-scroll">
        {(props.userdata?.onload || props.home) ? (
          props.children
        ) : (
          <>
            <span className="loader"></span>
          </>
        )}
      </div>

      <footer className="w-full flex  items-center justify-around h-15 bg-white border-1 border-gray-300">
        <a
          href="/"
          className="flex flex-col justify-center items-center text-sm"
        >
          <AiFillHome className="text-2xl" /> Home
        </a>

        {props.userdata?.data ? (
          <>
            <a
              href="/pembelian"
              className="cursor-pointer flex flex-col justify-center items-center text-sm"
            >
              <AiOutlineShoppingCart className="text-2xl" /> Pembelian
            </a>
            <a
              href="/toko"
              className="flex flex-col justify-center items-center text-sm"
            >
              <BsArchiveFill className="text-2xl" /> Toko
            </a>
          {(props.userdata.data.role == "driver") ? 
            <a
              href="/kurir/tabel"
              className="flex flex-col justify-center items-center text-sm"
            >
              <AiFillCar className="text-2xl" /> Kurir
            </a> : ""
        }
          </>
        ) : (
          ""
        )}
      </footer>
    </div>
  );
};
