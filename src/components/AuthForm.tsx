"use client"
import { supabase } from '@/src/lib/supabase';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
interface AuthFormProps {
  type: 'signin' | 'signup'
}


export default function AuthForm({ type }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false);

  const isSignIn = type === 'signin'
  const router = useRouter();
  const handleRedirect = () => {
    router.push(isSignIn ? '/signup' : 'signin')

  }

  const handleSignUp = async (e: React.FormEvent) => {
    setLoading(true);
    e.preventDefault();
    try {
      
  
    if (isSignIn) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      }); if (error) {
          alert(error.message);
          return;
        }

        router.push('/dashboard');
    } else {

      const {  error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        alert(error.message);
        return;
      }
      alert("Sign-up successful. Please check your email to confirm.");
      router.push('/signin'); // or wait until confirmed
    }
      } catch (error) {
       console.error('Auth error:', error);
      alert('Something went wrong. Please try again.');
    }finally {
      setLoading(false);
    }
  }
  return (

    <form action="" className='bg-white p-8 rounded shadow-2xl w-full max-w-md  justify-center items-center' onSubmit={handleSignUp}
    >
      <h1 className='text-2xl font-semibold mb-4 text-gray-800'>
        {isSignIn ? 'Welcome back' : 'Create an Account'}
      </h1>
      <div className='mb-4'>
        <label className='bock text-gray-700 mb-2' >Email</label>
        <input type="text" className='w-full p-2 border rounded' value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className='mb-4'>
        <label className='bock text-gray-700 mb-2' >Password</label>
        <input type="password" className='w-full p-2 border rounded' value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button type="submit" className={`w-full text-white p-2 rounded ${loading? 'bg-gray-400 cursor-not-allowed':'bg-blue-500'}`} disabled={loading}>
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