import { db } from "@/app/firebaseConfig/firebase";
import { and, collection, getDocs, query, where } from "firebase/firestore";
import { NextResponse } from "next/server";
var bcrypt = require('bcryptjs');

export async function  POST(req){
try {
    const {email,password} = await req.json()
    
    const Q_UserAccount = query(collection(db,'users'),where('email','==',email))
    const docSnaps = await getDocs(Q_UserAccount);

    if(!docSnaps.empty){
        const user = {id:docSnaps.docs[0].id,...docSnaps.docs[0].data()}
        if(!user.dateVerified){
            return NextResponse.json({message:'Account is not already verified.'},{status:400})
        }
        const isMatch = await bcrypt.compare(password,user.hash)
        if(isMatch){
            return NextResponse.json({message:'success'},{status:200})
            
        }else{
            return NextResponse.json({message:'Either email or password is incorrect.'},{status:400})
        }
        
    }
    
} catch (error) {
    return NextResponse.json({message:error.message},{status:400})
}
}

export async function OPTIONS(request) {
    try {
 
       return NextResponse.json({status:200})
    } catch (error) {
       return NextResponse.json({ message: error.message }, { status: 400 });
    }
 }