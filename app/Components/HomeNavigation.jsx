import { AiFillBell } from "./ReactIcons"

export const HomeNavigation = (props) => {
  console.log(props)
  return (
    <div className="flex flex-col h-screen">
      <nav className="w-full h-18 bg-white border-1 items-center justify-between border-gray-300 text-gray-600 flex">
        <div className="m-4">
          <span className="font-bold">Camilan 99</span>
        </div>
        <div className=" h-10 m-4 flex">
            <div className="w-10 h-10 flex justify-center items-center">
                <AiFillBell className="text-2xl"/>
            </div>
            <button className="py-2 px-4 border-1 border-neutral-500 rounded">Login</button>
        </div>
      </nav>

      <div className="flex flex-1 overflow-y-scroll">
        {props.children}
      </div>

      <footer className="w-full h-15 bg-gray-300">

      </footer>

    </div>
    
  )
}
