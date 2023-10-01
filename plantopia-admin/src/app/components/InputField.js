'use client'

const InputField = ({className,name,value,onChange,type='text',required=true}) => {
    return ( 
        <div className={`${className}`}>
            <label >{name}</label>
            <input value={value} onChange={onChange} type={type} required={required} />
        </div>
     );
}
 
export default InputField;