import Image from "next/image";
import Link from "next/link"

export default function Home() {
  return (
    <>

    <div className="h-screen flex justify-center items-center mt-3.5">
      <Link href='/fillform'>
        <button className="bg-blue-100 rounded-2xl text-black m-2.5 p-5 font-bold"> Start filling form</button>
      </Link>
    </div>
    </>
  );
}
