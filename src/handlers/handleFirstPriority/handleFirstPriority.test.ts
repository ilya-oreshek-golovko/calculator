import handleFirstPriority from "./handleFirstPriority";

describe("handleFirstPriority", () => {

    const test1 = {
        input: ["41", "+", "7", "-", "1"],
        expectedResult: "40"
    }

    test(`First Priotiry: First Test`, () => {
        expect(handleFirstPriority(test1.input)).toBe("47");
    });
    // test(`["41", "+", "7", "-", "8", "*", "3"] should throw PrioritiesError`, () => {
    //     expect(handleFirstPriority(["41", "+", "7", "-", "8", "*", "3"])).toThrow(PrioritiesError);
    // });
    // test(`["41", "+", "7", "-", "8", "*", "sin(3)"] should throw PrioritiesError`, () => {
    //     expect(handleFirstPriority(["41", "+", "7", "-", "8", "*", "sin(3)"])).toThrow(PrioritiesError);
    // });
    // test(`["41", "+", "7", "-", "8", "*", "3!"] should throw PrioritiesError`, () => {
    //     expect(handleFirstPriority(["41", "+", "7", "-", "8", "*", "3!"])).toThrow(PrioritiesError);
    // });
    // test(`["41", "+", "7", "-", "8", "*", "3^4"] should throw PrioritiesError`, () => {
    //     expect(handleFirstPriority(["41", "+", "7", "-", "8", "*", "3^4"])).toThrow(PrioritiesError);
    // });
    // test(`["41", "+", "(", "7", "-", "8", ")", "*", "3"] should throw PrioritiesError`, () => {
    //     expect(handleFirstPriority(["41", "+", "(", "7", "-", "8", ")", "*", "3"])).toThrow(PrioritiesError);
    // });
});
