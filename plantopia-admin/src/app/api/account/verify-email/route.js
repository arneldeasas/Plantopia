import { db } from "@/app/firebaseConfig/firebase";
import { format } from "date-fns";
import {
   collection,
   doc,
   getDocs,
   query,
   serverTimestamp,
   and,
   updateDoc,
   where,
} from "firebase/firestore";
import { NextResponse } from "next/server";

export async function POST(req) {
   try {
      const { token } = await req.json();
      console.log("token:", token);
      console.log("date:", format(new Date(), "MMM dd,yyyy h:mm a"));
      const Q_EmailThatHasToken = query(
         collection(db, "users"),
         and(
            where("verifyEmailToken", "==", token.toString()),
            where("dateVerified", "==", "")
         )
      );
      const docSnaps = await getDocs(Q_EmailThatHasToken);
            console.log();
      if (!docSnaps.empty) {
         const user = { id: docSnaps.docs[0].id, ...docSnaps.docs[0].data() };
         console.log("user:", user);
         if(user?.verifyEmailTokenExpiry.toDate() < new Date()){
            return NextResponse.json(
                { message: "token expired" },
                { status: 400 }
             );
         }
         updateDoc(doc(db, "users", user.id), {
            dateVerified: serverTimestamp(),
         });
         return NextResponse.json({ message: "success" }, { status: 200 });
      } else {
         return NextResponse.json(
            { message: "invalid token" },
            { status: 400 }
         );
      }
   } catch (error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
   }
}
