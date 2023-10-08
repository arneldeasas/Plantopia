const verifyEmail = async (token) => {
   const message = fetch(`${process.env.NEXT_PUBLIC_BASEURL}/api/account/verify-email`, {
      body: JSON.stringify({ token }),
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },cache:"no-cache"
   }).then(async (res) => {
     const {message} = await res.json();
    console.log('ressss',message);
     return message
   });

   return message
};
const EmailVericationConfirmationPage = async ({ searchParams }) => {
   const message = await verifyEmail(searchParams.token);

   return (
      <div>
         {message === "success" &&
            <div>
               <h1>Email Verified!</h1>
               <p>You can now access your account through our mobile application!</p>
            </div>}
     
            {message === 'invalid token' && <div>Invalid Token</div>}
       
      </div>

   );
   }
export default EmailVericationConfirmationPage;
