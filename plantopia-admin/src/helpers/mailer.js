import { db } from "@/app/firebaseConfig/firebase";
import bcryptjs from "bcryptjs";
import { addHours } from "date-fns";
import { doc, updateDoc } from "firebase/firestore";

export const sendEmail = async (emailType, email, userId) => {
   const sgMail = require("@sendgrid/mail");
   sgMail.setApiKey(process.env.SENDGRID_API_KEY);

   const hashedToken = await bcryptjs.hash(userId, 10);
   if (emailType === "VERIFY") {
      await updateDoc(doc(db, "users", userId), {
         verifyEmailToken: hashedToken,
         verifyEmailTokenExpiry: addHours(new Date(), 1),
      });
   } else if (emailType === "RESET") {
      await updateDoc(doc(db, "users", userId), {
         forgotPasswordToken: hashedToken,
         forgotPasswordTokenExpiry: addHours(new Date(), 1),
      });
   }

   const msg = {
      to: { email }, // Change to your recipient
      from: "plantopiacaps123@gmail.com", // Change to your verified sender
      subject: `${
         emailType === "VERIFY" ? "Email verification" : "Password reset"
      }`,
      text: "Maging plantito at plantito ngayon na!",
      html: `<div style="text-align: left; padding: 10px;">
    <div style="background-color: #ffffff; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="font-weight: bold; font-size: 18px;">Hello ${email},</h1>
        <p style="margin-top: 10px; font-size: 14px;">
            This is to verify that your email address is active and working.
        </p>
        <a ><table cellspacing="0" cellpadding="0" style="margin:20px 0 0">
      
            <td align="center" bgcolor="#007BFF" style="border-radius: 3px;">
                <a href="${process.env.NEXT_PUBLIC_BASEURL}/verify-email?token=${hashedToken}"  target="_blank" style="font-size: 16px; font-weight: bold; color: #ffffff; text-decoration: none; display: inline-block; padding: 10px 20px; background-color: #007BFF; border-radius: 3px;">
                    VERIFY EMAIL
                </a>
            </td>
     
    </table></a>
        <p style="margin-top: 10px; font-size: 14px;">
            If you did not initiate this request, please ignore this email.
        </p>
        <div style="margin-top: 20px; font-size: 14px;">
            <p>Thank you,</p>
            <p>The Plantopia Team</p>
        </div>
    </div>
</div>
`,
   };

   await sgMail.send(msg)
     
};
