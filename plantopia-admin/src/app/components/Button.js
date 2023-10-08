"use client";
import { useRef, useEffect } from "react";

import lottie from "lottie-web";

const Button = ({
   onClick,
   name,
   type = "button",
   buttonStyle,
   className,
   disabled,
   loadingname,
   isPending,
}) => {
   const primary = "bg-bgprimary text-white font-semibold duration-100 ease-in active:bg-bgprimary/70";
   const secondary = 'bg-white border-2 border-bgprimary text-primary font-semibold duration-100 ease-in active:bg-bgprimary/20'
   const divRef = useRef();
   useEffect(() => {
      if (isPending) {
         lottie.loadAnimation({
            container: divRef.current,
            animationData: require("loader.json"),
            renderer: "svg", // Required
            loop: true, // Optional
            autoplay: true, // Optional
            name: "load", // Name for future reference. Optional.
            rendererSettings: {},
         });
      } else {
         lottie.destroy("load");
      }
   }, [isPending]);
   return isPending ? (
      <button
         disabled
         type={type}
    
         className={`${className} uppercase rounded-xl  ${
            buttonStyle === "primary" && primary
         } disabled:bg-bgprimary/60 uppercase flex items-center gap-2 justify-center`}
      >
         <div ref={divRef} className="shrink-0 w-[30px]"></div>
         {loadingname}
      </button>
   ) : (
      <button
         onClick={onClick}
         disabled={disabled}
         type={type}
       
         className={`${className} uppercase rounded-xl  ${
            buttonStyle === "primary" && primary
         } ${buttonStyle==='secondary' && secondary}`}
      >
         {name}
      </button>
   );
};

export default Button;
