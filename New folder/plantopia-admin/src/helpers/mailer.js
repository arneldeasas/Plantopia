import { db } from "@/app/firebaseConfig/firebase";
import bcryptjs from 'bcryptjs';
import { addHours } from "date-fns";
import { doc, updateDoc } from "firebase/firestore";

export const sendEmail = async (emailType,email,userId) => {
   const sgMail = require("@sendgrid/mail");
   sgMail.setApiKey(process.env.SENDGRID_API_KEY);

   const hashedToken = await bcryptjs.hash(userId,10)
    if(emailType==='VERIFY'){
        await updateDoc(doc(db,'users',userId),{
            verifyEmailToken:hashedToken,
            verifyEmailTokenExpiry: addHours(new Date(),1)
        })
    }else if(emailType==='RESET'){
        await updateDoc(doc(db,'users',userId),{
            forgotPasswordToken:hashedToken,
            forgotPasswordTokenExpiry: addHours(new Date(),1)
        })
    }

   const msg = {
      to: {email}, // Change to your recipient
      from: "plantopiacaps123@gmail.com", // Change to your verified sender
      subject: `${emailType==='VERIFY'?'Email verification':'Password reset'}`,
      text: "Maging plantito at plantito ngayon na!",
      html: "<strong>and easy to do anywhere, even with Node.js</strong>",
   };


   sgMail
      .send(msg)
      .then(() => {
         console.log("Email sent");
      })
      .catch((error) => {
         console.error(error);
      });
};
