import { IButtonProps } from "@/types";
import styles from "@app-page/App.module.scss";
import { memo } from "react";

const Button = ({text, onClick} : IButtonProps) => {
  console.log("Button render");
  return (
    <button className={styles["button-body"]} onClick={onClick}>
      {text}
    </button>
  )
}

export default memo(Button);