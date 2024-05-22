import { ReactElement } from "react"

interface ICalculatorSlice{
    input: Array<string | ReactElement>,
    result: string,
    isPowEntering: boolean,
    isDegreesEntering : boolean,
    openBracketsCount : number,
    messageToDisplay: string,
    isShowPopup: boolean,
    popupTitle: string,
    popupDescription: string,
    timeoutID?: NodeJS.Timeout
}

export type{
    ICalculatorSlice
}