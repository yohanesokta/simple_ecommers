export default async function Page ({params}) {
    const name = await params.name
    return <>
        Hello World
        {name}
    </>
}