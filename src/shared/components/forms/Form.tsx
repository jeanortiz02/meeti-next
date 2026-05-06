import { FormHTMLAttributes } from "react";

type Props = FormHTMLAttributes<HTMLFormElement>;

export default function Form(props : Props) {
  return <form className="mt-10 space-y-3" {...props}>
    {props.children}
  </form>;
}
