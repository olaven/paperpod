import { sleep } from "./sleep";

describe("Utility function for forcing a wait", () => {

    it("Does not throw", () => {

        expect(sleep(1)).resolves.not.toThrow()
    });

    it("Does wait for some amount of time", async () => {

        const before = Date.now();
        await sleep(1000);
        const after = Date.now();

        const difference = after - before;
        expect(difference).toBeGreaterThan(900);
        expect(difference).toBeLessThan(1100);
    })
})