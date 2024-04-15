import Popup from "@/pages/App/components/Popup";
import Input from "./modules/Input";
import Operations from "./modules/Operations";
import Numbers from "./modules/Numbers";
import { useAppSelector } from "@/redux/hooks";
import { useDegreeInput } from "./hooks/AppHooks";

export default function App() {
  
  const isShowPopup = useAppSelector((state) => state.CalculatorReducer.isShowPopup);
  useDegreeInput();

  return (
    <div className={"background"}>
      {
        isShowPopup &&
        <Popup />
      }
      <section className={"calc-body"}>
        <Input />
        <div className={"bottom-block"}>
          <Operations />
          <Numbers />
        </div>
      </section>
    </div>
  )
}
