"use client";
import { useState } from "react";

import { instance } from "../axios/axios";
import Button from "@/app/components/Button";
import InputField from "@/app/components/InputField";
import Link from "next/link";
import { toast } from "react-toastify";
const LoginPage = () => {
   const [isPending, setIsPending] = useState(false);
   const [credential, setCredential] = useState({
      email: "",
      password: "",
   });

   const handleSubmit = async (e) => {
      try {
         e.preventDefault();
         setIsPending(true);
         const res = await instance.post("/api/account/login", credential);
         console.log(res);
      } catch (error) {
         console.log(error);
         setIsPending(false);
         toast.error(error.response.data.message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
         });
      }
   };
   return (
      <div className="min-h-screen p-5 flex flex-col">
         <form
            action=""
            onSubmit={(e) => {
               handleSubmit(e);
            }}
            className="flex flex-col justify-between grow"
         >
            <div>
               <div className="text-center">
                  <h1 className="text-4xl font-semibold text-bgprimary mt-10">
                     WELCOME BACK!
                  </h1>
                  <p className="text-primary/60">Login to your account</p>
               </div>
               <div className="flex flex-col gap-6 mt-10">
                  <InputField
                     value={credential.email}
                     onChange={(e) => {
                        setCredential({ ...credential, email: e.target.value });
                     }}
                     name={"email"}
                     label="email"
                     icon={<i className="fi fi-sr-envelope"></i>}
                  />
                  <InputField
                     value={credential.password}
                     onChange={(e) => {
                        setCredential({
                           ...credential,
                           password: e.target.value,
                        });
                     }}
                     type="password"
                     name={"password"}
                     label="Password"
                     icon={<i className="fi fi-sr-lock"></i>}
                  />
               </div>
               <p className="font-semibold text-primary/60 italic text-sm p-2 text-right">
                  Forgot password?
               </p>
            </div>
            <div className="mb-10">
               <Button
                  isPending={isPending}
                  loadingName={"signing up"}
                  type="submit"
                  buttonStyle={"primary"}
                  className={"w-full py-2 "}
                  name={"Login"}
               />
               <div className="mt-2 font-semibold text-sm">
                  <p className="text-center">
                     <span className="italic  text-primary/60">
                        Don't have an account?{" "}
                     </span>{" "}
                     <Link href={"/signup"}>
                        <span className="text-bgprimary p-2">Sign up here</span>
                     </Link>
                  </p>
               </div>
            </div>
         </form>
      </div>
   );
};

export default LoginPage;
