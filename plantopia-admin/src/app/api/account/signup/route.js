import { NextResponse } from "next/server";
import { db } from "@/app/firebaseConfig/firebase";
import { addDoc, collection, doc, getDocs, query, serverTimestamp, setDoc, where } from "firebase/firestore";
import { sendEmail } from "@/helpers/mailer";
import { nanoid } from "nanoid";
var bcrypt = require('bcryptjs');
export async function POST(request) {
   try {
      const {email,password,confirmPassword,name} = await request.json()
      const docSnaps = await getDocs(query(collection(db,'users'),where('email','==',email)))
      let uid;
      if(!docSnaps.empty){
         if(docSnaps.docs[0].data()?.dateVerified){
            return NextResponse.json({ message: 'Email address is already in use.' }, { status: 400 });
         }
         uid=docSnaps.docs[0].id
      }else{
         uid = nanoid()
      }
      const hash = bcrypt.hashSync(password,10)
     
      setDoc(doc(db,'users',uid),{
         name,
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