import Button from "@pages/App/components/Button/Button";
import styles from "@app-page/App.module.scss";
import { useClickManagement } from "./hooks";
import { memo } from "react";

const Numbers = () => {
  const {handleNumberInput,handleEnterInput} = useClickManagement();

  return (
    <div className={styles["numbers-block"]}>
        <Button text="1" onClick={handleNumberInput}/>
        <Button text="2" onClick={handleNumberInput}/>
        <Button text="3" onClick={handleNumberInput}/>
        <Button text="4" onClick={handleNumberInput}/>
        <Button text="5" onClick={handleNumberInput}/>
        <Button text="6" onClick={handleNumberInput}/>
        <Button text="7" onClick={handleNumberInput}/>
        <Button text="8" onClick={handleNumberInput}/>
        <Button text="9" onClick={handleNumberInput}/>
        <Button text="0" onClick={handleNumberInput}/>
        <Button text="." onClick={handleEnterInput}/>
        <Button text="=" onClick={handleEnterInput}/>
    </div>
  )
}

export default memo(Numbers);