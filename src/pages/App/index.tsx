import Popup from "@/pages/App/components/Popup";
import Input from "./modules/Input";
import Operations from "./modules/Operations";
import Numbers from "./modules/Numbers";
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
    <div className={"background"}>
      <section className={"calc-body"}>
        <Input />
        <div className={"bottom-block"}>
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
