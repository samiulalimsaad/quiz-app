import { div } from "./div";

test("adds 1 + 2 to equal 3", () => {
    expect(div(10, 2)).toBe(5);
    expect(div(20, 2)).toBe(10);
});
