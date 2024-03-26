import { IButtonProps } from "@/types";
import styles from "@app-page/App.module.scss";
import { MouseEvent } from "react";

export default function Button({text, clickHandler} : IButtonProps) {
  return (
    <button className={styles["button-body"]} onClick={(evt : MouseEvent<HTMLButtonElement>) => clickHandler(evt.currentTarget.innerText)}>
      {text}
    </button>
  )
}
