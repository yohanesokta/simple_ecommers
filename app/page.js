import { HomeNavigation } from "./Components/HomeNavigation";
import { AiOutlineSearch } from "./Components/ReactIcons";

export default function  Home () {
  return (<>
    <HomeNavigation>
      <div className="w-full p-4">
        <div className="flex shadow-md shadow-gray-300 px-2 py-3 items-center w-full rounded border-neutral-400 bg-white focus-within:shadow-gray-500">
          <input type="text" name="" id="" className="px-2 flex-1 border-0 outline-0"  placeholder="Search Product"/>
          <AiOutlineSearch className="text-2xl text-gray-500"/>
        </div>
        <div className="">
          <h1 className="mt-8 mb-4 font-bold">Categorie</h1>
          <div className="flex gap-2">
            <button className="p-1 px-5 bg-black text-white rounded-xl text-sm border-1 border-gray-300">All</button>
            <button className="p-1 px-5 bg-white rounded-xl text-sm border-1 border-gray-300">Snack</button>
            <button className="p-1 px-5 bg-white rounded-xl text-sm border-1 border-gray-300">Snack</button>
            <button className="p-1 px-5 bg-white rounded-xl text-sm border-1 border-gray-300">Snack</button>
          </div>
          <h1 className="my-5">Featured Product</h1>

          <div className="flex gap-2 flex-wrap justify-between">
            <div className="w-40 h-50 bg-white border-2 border-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </HomeNavigation>
  </>)
}