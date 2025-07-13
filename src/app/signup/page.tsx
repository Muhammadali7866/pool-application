import AuthForm from "@/src/components/AuthForm";
import Navbar from "../../components/Navbar";

export default function SignUp() {
  return (
    <>
      <Navbar />
      <div className=" flex justify-center mt-5">
        <AuthForm type="signup" />
      </div>
    </>
  );
}
