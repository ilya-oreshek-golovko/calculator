import { IButtonProps } from "@/types";
import { memo, MouseEvent } from "react";

const Button = ({text, onClick} : IButtonProps) => {
  console.log("Button render");
  return (
    <button className={"button-body"} onClick={(evt : MouseEvent<HTMLButtonElement>) => onClick(evt.currentTarget.innerText)}>
      {text}
    </button>
  )
}

export default memo(Button);