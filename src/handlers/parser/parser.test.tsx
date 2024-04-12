import { parser, handlePriorityes, parseUserInput } from "./parser";
import ThirdPriorOperation from "@/pages/App/components/Operation";
import { TParsedUserInput } from "@/types";

describe("parser", () => {

    const test1 = {
        input: ["2", "+", "7", "*", <ThirdPriorOperation userInput="2" operation="^" power="3"/>],
        expectedResult: "58"
    }
    const test2 = {
        input: ["2", "+", "1"],
        expectedResult: "3"
    }

    test(`parser: Test#1`, () => {
        expect(parser(test1.input)).toStrictEqual(test1.expectedResult);
    });

    test(`parser: Test#2`, () => {
        expect(parser(test2.input)).toStrictEqual(test2.expectedResult);
    });
});

describe("parseUserInput", () => {

    const test1 = {
        input: ["41", "+", "7", "*", <ThirdPriorOperation userInput="4" operation="!"/>],
        expectedResult: ["41", "+", "7", "*", {
            userInput: "4",
            operation: "!"
        }]
    }

    test(`parseUserInput: Test#1`, () => {
        expect(parseUserInput(test1.input)).toStrictEqual(test1.expectedResult);
     });
});

describe("handlePriorityes", () => {

    const test1 : {input: TParsedUserInput, expectedResult: string} = {
        input: ["2", "+", "7", "*", {
            userInput: "3",
            operation: "!"
        }],
        expectedResult: "44"
    };

    const test2 : {input: TParsedUserInput, expectedResult: string} = {
        input: ["2", "-", "3"],
        expectedResult: "-1"
    }

    test(`handlePriorityes: Test#1`, () => {
        expect(handlePriorityes(test1.input)).toEqual(test1.expectedResult);
    });

    test(`handlePriorityes: Test#2`, () => {
        expect(handlePriorityes(test2.input)).toEqual(test2.expectedResult);
    });
});