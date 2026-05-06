import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement>;
export default function FormSubmit(props : Props) {
  return (
   <input 
    type="submit" 
    className="bg-pink-600 p-2 uppercase font-black w-full text-white cursor-pointer mt-5"
    {...props}
    />
  )
}
