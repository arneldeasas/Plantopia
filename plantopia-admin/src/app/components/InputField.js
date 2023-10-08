"use client";

const InputField = ({
   className,
   name,
   value,
   onChange,
   type = "text",
   required = true,
   errorMessage = "",
   label,
   icon
}) => {
   return (
      <div className={`${className} flex flex-col gap-2 `}>
         <div className="input-container w-full rounded-lg border-bgprimary border-2 overflow-clip flex items-center">
            <div className="mx-3 text-primary">
               {icon}
            </div>
            <input
               className="p-2 pl-0 bg-transparent w-full "
               value={value}
               onChange={onChange}
               type={type}
               required={required}
               placeholder={label}
               name={name}
            />
         </div>
         {errorMessage.length > 0 && <p className="text-sm mb-2">{errorMessage}</p>}
      </div>
   );
};

export default InputField;
