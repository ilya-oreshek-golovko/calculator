import styles from "./App.module.scss";
import Popup from "@app-page/components/Popup/Popup";
import Input from "./modules/Input/Input";
import Operations from "./modules/Operations/Operations";
import Numbers from "./modules/Numbers/Numbers";
import { useAppSelector } from "@/redux/hooks";
import { useDegreeInput } from "./hooks/AppHooks";

export default function App() {
  
  // useManualInputManagement({
  //   handleButtunInput, handleOperationInput, handleLastCharacterRemove, handleFullRemove, AppState: state
  // });
  const messageToDisplay = useAppSelector((state) => state.CalculatorReducer.messageToDisplay);
  const result = useAppSelector((state) => state.CalculatorReducer.result);

  const DegreeInput = useDegreeInput();

  return (
    <div className={styles["background"]}>
      <section className={styles["calc-body"]}>
        <Input />
        <div className={styles["bottom-block"]}>
          <Operations />
          <Numbers />
        </div>
      </section>
      {
        messageToDisplay &&
        <Popup messageToRender={messageToDisplay} />
      }
      {
        result.length > 0 &&
        <Popup messageToRender={result} />
      }
      <DegreeInput />
    </div>
  )
}
