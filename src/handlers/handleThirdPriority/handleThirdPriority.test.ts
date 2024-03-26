import { TParsedUserInput } from "@/types";
import handleThirdPriority  from "./handleThirdPriority";

describe("handleThirdPriority", () => {

    const test1 : {input : TParsedUserInput, expectedResult: Array<string>} = {
        input: ["1", "+", "2", "*", {
            userInput: "4",
            operation: "!"
        }],
        expectedResult: ["1", "+", "2", "*", "24"]
    };

    const test2 : {input : TParsedUserInput, expectedResult: Array<string>} = {
        input: ["1", "+", "2", "*", {
            userInput: "30",
            operation: "sin"
        }],
        expectedResult: ["1", "+", "2", "*", "0.5"]
    };

    const test3 : {input : TParsedUserInput, expectedResult: Array<string>} = {
        input: ["1", "+", "2", "*", {
            userInput: "3",
            operation: "^",
            power: "3"
        }],
        expectedResult: ["1", "+", "2", "*", "27"]
    };

    const test4 : {input : TParsedUserInput, expectedResult: string[]} = {
        input: ["1", "+", "1", "/", {
            userInput: "90",
            operation: "cos"
        }],
        expectedResult: ["1", "+", "1", "/", "0"]
    };

    const test5 : {input : TParsedUserInput, expectedResult: string[]} = {
        input: ["1", "+", "1", "-", "2"],
        expectedResult: ["1", "+", "1", "-", "2"],
    };

    test(`Third Priority: Test#1`, () => {
        expect(handleThirdPriority(test1.input)).toStrictEqual(test1.expectedResult);
    });
    test(`Third Priority: Test#2`, () => {
        expect(handleThirdPriority(test2.input)).toStrictEqual(test2.expectedResult);
    });
    test(`Third Priority: Test#3`, () => {
        expect(handleThirdPriority(test3.input)).toStrictEqual(test3.expectedResult);
    });
    test(`Third Priority: Test#4`, () => {
        expect(handleThirdPriority(test4.input)).toStrictEqual(test4.expectedResult);
    });
    test(`Third Priority: Test#5`, () => {
        expect(handleThirdPriority(test5.input)).toStrictEqual(test5.expectedResult);
    });
});