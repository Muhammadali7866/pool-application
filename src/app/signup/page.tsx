import AuthForm from "@/src/components/AuthForm";

export default function SignUp() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <AuthForm type="signup" />
      </div>
    </>
  );
}
