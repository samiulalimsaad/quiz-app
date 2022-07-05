import { mul } from "./mul";

test("adds 1 + 2 to equal 3", () => {
    expect(mul(5, 2)).toBe(10);
    expect(mul(50, 2)).toBe(100);
});
