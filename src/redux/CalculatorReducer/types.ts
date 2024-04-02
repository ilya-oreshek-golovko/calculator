import { ReactElement } from "react"

interface ICalculatorSlice{
    input: Array<string | ReactElement>,
    result: string,
    isPowEntering: boolean,
    isDegreesEntering : boolean,
    openBracketsCount : number,
    messageToDisplay: string
}

export type{
    ICalculatorSlice
}