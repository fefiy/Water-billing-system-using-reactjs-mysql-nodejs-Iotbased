import React, { useState } from 'react'

const FormInput = (props) => {
  const [focused, setFocused] = useState(false)
   const {label,errorMessage, onChange,id , ...inputprops} = props
   const handleFocus = ()=>{
    setFocused(true)
   }
  return (
    <div className='formInput'>
        <label>{label}</label>
        <input {...inputprops} onChange={onChange} required onBlur={handleFocus} focused={focused.toString()} />
        <span>{errorMessage}</span>
    </div>
  )
}
// i have only need toggle the type from password to text
export default FormInput