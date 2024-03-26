import { IPopupProps } from "@/types";
import styles from "./Popup.module.scss";

export default function Popup({messageToRender, clickHandler} : IPopupProps) {
  return (
    <div onClick={() => clickHandler()} className={styles["pop-up"] + (messageToRender ? " " + styles["open"] : "" )}>
        {messageToRender}
    </div>
  )
}
