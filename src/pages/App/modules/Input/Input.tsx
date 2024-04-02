import { useAppSelector } from "@/redux/hooks";
import styles from "@app-page/App.module.scss";

export default function Input() {
  console.log("Input render");
  const input = useAppSelector((state) => state.CalculatorReducer.input);

  return (
    <div className={styles["input-block"]}>
        <p className={styles["input"]}>
          {
            input.map(el => el)
          }
        </p>
    </div>
  )
}
