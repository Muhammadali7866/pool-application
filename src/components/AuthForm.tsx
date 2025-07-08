"use client"
import { useRouter } from 'next/navigation';
interface AuthFormProps {
    type:'signin' | 'signup'
}


export default function AuthForm ({type}:AuthFormProps){
    const isSignIn = type === 'signin'
    const router = useRouter();
    const handleRedirect = ()=>{
  router.push(isSignIn?'/signup':'signin')
}
    return (

        <form action="" className='bg-white p-8 rounded shadow-2xl w-full max-w-md  justify-center items-center'>
            <h1 className='text-2xl font-semibold mb-4 text-gray-800'>
                {isSignIn ? 'Welcome back':'Create an Account'}
                </h1>
            <div className='mb-4'>
              <label className='bock text-gray-700 mb-2' >Email</label>
              <input type="text" className='w-full p-2 border rounded' />
            </div>
            <div className='mb-4'>
              <label className='bock text-gray-700 mb-2' >Password</label>
              <input type="password" className='w-full p-2 border rounded' />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
        {isSignIn ? 'Login' : 'Sign Up'}
            </button>
<button
        type="button"
        onClick={handleRedirect}
        className="w-full text-blue-600 hover:underline mt-3 cursor-pointer"
      >
        {isSignIn ? 'Don’t have an account?' : 'I already have an account'}
      </button>          </form>

    )
}