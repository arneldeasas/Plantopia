import { NextResponse } from "next/server";
import { db } from "@/app/firebaseConfig/firebase";
import { addDoc, collection, doc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { sendEmail } from "@/helpers/mailer";
import { nanoid } from "nanoid";
var bcrypt = require('bcryptjs');
export async function POST(request) {
   try {
      const {email,password,confirmPassword} = await request.json()
      const docSnaps = await getDocs(query(collection(db,'users'),where('email','==',email)))
      if(!docSnaps.empty){
         throw new Error('Email already registered.')
      }
      const hash = bcrypt.hashSync(password,10)
      const uid = nanoid()
      setDoc(doc(db,'users',uid),{
         email,
         hash,
         forgotPasswordToken:'',
         forgotPasswordTokenExpiry:'',
         verifyEmailToken:'',
         verifyEmailTokenExpiry:'',
         dateVerified:'',
         dateCreated: serverTimestamp()
      }).then(async()=>{
         const mailRes = await sendEmail('VERIFY',email,uid)
         console.log(mailRes);
      })
      return NextResponse.json({email,password,confirmPassword},{status:200})
   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
   }
}


export async function OPTIONS(request) {
   try {

      return NextResponse.json({status:200})
   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
   }
}