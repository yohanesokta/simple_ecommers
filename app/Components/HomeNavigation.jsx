"use client";
import { useState } from "react";
import {
  AiFillBell,
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
                  <div className="w-30  z-50 absolute top-10 right-5 rounded-sm bg-white shadow-2xs border-2 border-gray-200">
                    <ul className="p-2  text-sm font-bold flex flex-col gap-3">
                      <li>Profile</li>
                      <li><a href="/toko" >Toko</a></li>
                      <li><a href="/kurir" >Daftar Kurir</a></li>
                      <li>
                        <a href="/auth/logout">Logout</a>
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
              href=""
              className="cursor-pointer flex flex-col justify-center items-center text-sm"
            >
              <AiOutlineShoppingCart className="text-2xl" /> Keranjang
            </a>
            <a
              href="/toko"
              className="flex flex-col justify-center items-center text-sm"
            >
              <BsArchiveFill className="text-2xl" /> Toko
            </a>
          </>
        ) : (
          ""
        )}
      </footer>
    </div>
  );
};
