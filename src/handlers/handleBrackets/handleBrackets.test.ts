import { TParsedUserInput } from "@/types";
import handleBrackets from "./handleBrackets";

describe("handleBrackets", () => {

    const test1 = {
        input: ["5", "*", "(", "2", "-", "3", ")", "/", "(", "1", "+", "1", ")"],
        expectedResult: ["5", "*", "-1", "/", "2"]
    };

    const test2 : {input: TParsedUserInput, expectedResult : Error} = {
        input: ["1", "*", "(", "2", "-", "3", "+", {userInput: "45",operation: "tg"}, ")", "/", "(", "1", "+", "1", "/", {
            userInput: "90",
            operation: "cos"
        }, ")"],
        expectedResult: Error("Division by zero is prohibited")
    };

    const test3 : {input: TParsedUserInput, expectedResult : string[]} = {
        input: ["1", "*", "(", "2", "-", "3", "+", {userInput: "0",operation: "tg"}, ")", "/", "(", "1", "+", "1", "/", {
            userInput: "0",
            operation: "cos"
        }, ")"],
        expectedResult: ["1", "*", "-1", "/", "2"]
    };

    test(`handleBrackets: Test#1`, () => {
        expect(handleBrackets(test1.input)).toStrictEqual(test1.expectedResult);
    });
    test(`handleBrackets: Test#2`, () => {
        expect(() => handleBrackets(test2.input)).toThrow(test2.expectedResult);
    });
    test(`handleBrackets: Test#3`, () => {
        expect(handleBrackets(test3.input)).toStrictEqual(test3.expectedResult);
    });
});