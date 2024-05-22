import { hidePopup } from "@/redux/CalculatorReducer/CalculatorReducer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

export default function Popup() {

  const popupTitle = useAppSelector((state) => state.CalculatorReducer.popupTitle);
  const popupDescription = useAppSelector((state) => state.CalculatorReducer.popupDescription);
  const dispatch = useAppDispatch();

  return (
    <div className={"pop-up " + (popupTitle ? "open" : "" )} onClick={() => dispatch(hidePopup())}>
        {popupTitle}
        {
          popupDescription && <p className={"pop-up_description"}>{popupDescription}</p>
        }
    </div>
  )
}
