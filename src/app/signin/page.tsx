import AuthForm from "@/components/AuthForm"

export default function Login (){
    return (
        <>
 <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <AuthForm type="signin" />
    </div>        </>
    )
}