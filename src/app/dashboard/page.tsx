import Link from "next/link";

export default function Dashboard() {
    return (
        <>
            <div className="bg-blue-950 h-screen" >
                <h2 className="text-white font-bold text-2xl flex justify-center p-10">Welcome Back</h2>
                <Link href='/poll' className="flex justify-center p-10 font-bold text-white text-2xl">Create Poll</Link>
                <h2>Your Polls</h2>     
                {/* will add  */}
            </div>
        </>
    )
}