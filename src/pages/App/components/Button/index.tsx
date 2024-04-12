import { IButtonProps } from "@/types";
import { memo } from "react";

const Button = ({text, onClick} : IButtonProps) => {
  console.log("Button render");
  return (
    <button className={"button-body"} onClick={onClick}>
      {text}
    </button>
  )
}

export default memo(Button);