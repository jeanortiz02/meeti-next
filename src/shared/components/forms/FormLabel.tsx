import { clsx } from "clsx";
import { LabelHTMLAttributes } from "react";

type Props = LabelHTMLAttributes<HTMLLabelElement>;

export default function FormLabel(props: Props) {
  return (
    <label {...props} className={clsx("block", props.className)}>
      {props.children}
    </label>
  )
}
