import { useAppSelector } from "@/redux/hooks";

export default function Input() {
  console.log("Input render");
  const input = useAppSelector((state) => state.CalculatorReducer.input);

  return (
    <div className={"input-block"}>
        <p className={"input"}>
          {
            input.map(el => el)
          }
        </p>
    </div>
  )
}
