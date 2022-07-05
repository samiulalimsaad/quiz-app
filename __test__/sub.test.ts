import { sub } from "./sub";

test("sub 1 + 2 to equal 3", () => {
    expect(sub(5, 2)).toBe(3);
    expect(sub(15, 2)).toBe(13);
});
