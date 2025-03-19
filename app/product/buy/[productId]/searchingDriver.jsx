
export function LoaderComponent ({text}) {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center">
        <div className="bg-white w-60 h-60 flex shadow-2xl rounded-2xl justify-center items-center">
            <div className="flex flex-col">
                <div className="loader"></div>
                <p className="text-center">{text}</p>
            </div>
        </div>

    </div>
  )
}
