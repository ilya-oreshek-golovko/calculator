import { IPopupProps } from "@/types";
import styles from "./Popup.module.scss";

export default function Popup({messageToRender, description} : IPopupProps) {
  return (
    <div className={styles["pop-up"] + (messageToRender ? " " + styles["open"] : "" )}>
        {messageToRender}
        {
          description && <p className={styles["pop-up_description"]}>{description}</p>
        }
    </div>
  )
}
