import Image from 'next/image';

export default function Home() {
  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-0 left-0 w-full z-10 flex items-center justify-between p-6 text-white bg-black bg-opacity-50"> <div className="text-2xl font-bold">MyApp</div>
        <div className="space-x-4">
          <a href="/signin" className="hover:underline">Sign In</a>
          <a href="/signup" className="hover:underline">Sign Up</a>
        </div></div>
      <Image
        src="/vote.png"
        alt="Full Screen Image"
        fill
        className="object-cover"
        priority
      />
    </div>
  );
}
