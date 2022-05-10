import { CounterType } from "types";
import { calculateProgress, increment, updateTimestamps } from "./project";

describe("project service", () => {
  describe("increment", () => {
    it("should add one to the current row value", () => {
      expect(
        increment(
          [
            { type: CounterType.ROW, currentCount: 15, maxCount: 23 },
            { type: CounterType.REPEAT, currentCount: 0, maxCount: 0 },
            false,
          ],
          CounterType.ROW
        )
      ).toMatchObject([
        [
          { type: CounterType.ROW, currentCount: 16, maxCount: 23 },
          { type: CounterType.REPEAT, currentCount: 0, maxCount: 0 },
          false,
        ],
        false,
      ]);
    });

    it("should reset the current row value to 0", () => {
      expect(
        increment(
          [
            { type: CounterType.ROW, currentCount: 14, maxCount: 15 },
            { type: CounterType.REPEAT, currentCount: 0, maxCount: 0 },
            false,
          ],
          CounterType.ROW
        )
      ).toMatchObject([
        [
          { type: CounterType.ROW, currentCount: 0, maxCount: 15 },
          { type: CounterType.REPEAT, currentCount: 0, maxCount: 0 },
          false,
        ],
        true,
      ]);
    });

    it("should update the repeat & row value when max row count is reached & counters are linked", () => {
      expect(
        increment(
          [
            { type: CounterType.ROW, currentCount: 14, maxCount: 15 },
            { type: CounterType.REPEAT, currentCount: 0, maxCount: 5 },
            true,
          ],
          CounterType.ROW
        )
      ).toMatchObject([
        [
          { type: CounterType.ROW, currentCount: 0, maxCount: 15 },
          { type: CounterType.REPEAT, currentCount: 1, maxCount: 5 },
          true,
        ],
        false,
      ]);
    });
  });

  describe("calculateProgress", () => {
    it("should return 0 if the repeat & row counts are at 0", () => {
      expect(
        calculateProgress([
          { type: CounterType.ROW, currentCount: 0, maxCount: 0 },
          { type: CounterType.REPEAT, currentCount: 0, maxCount: 0 },
          false,
        ])
      ).toEqual(0);
    });

    it("should return a value based on the row progress", () => {
      expect(
        calculateProgress([
          { type: CounterType.ROW, currentCount: 2, maxCount: 10 },
          { type: CounterType.REPEAT, currentCount: 0, maxCount: 0 },
          false,
        ])
      ).toEqual(20);
    });

    it("should return a value based on the repeat progress", () => {
      expect(
        calculateProgress([
          { type: CounterType.ROW, currentCount: 2, maxCount: 10 },
          { type: CounterType.REPEAT, currentCount: 2, maxCount: 100 },
          false,
        ])
      ).toEqual(2);
    });
  });

  describe("updateTimestamps", () => {
    const date = new Date(2022, 4, 1).toISOString();

    beforeAll(() => {
      jest.useFakeTimers("modern");
      jest.setSystemTime(new Date(2022, 4, 1));
    });

    afterAll(() => {
      jest.useRealTimers();
    });
    it("should set the started & updated time but leave the completed time", () => {
      expect(
        updateTimestamps(
          { started: null, completed: null, updated: null },
          false
        )
      ).toMatchObject({ started: date, completed: null, updated: date });
    });

    it("should update the completed and update time, but leave the started time", () => {
      const started = new Date(2022, 3, 30).toISOString();
      expect(
        updateTimestamps(
          { started: started, completed: null, updated: started },
          true
        )
      ).toMatchObject({
        started,
        completed: date,
        updated: date,
      });
    });

    it("should update the updated time, but leave started & completed", () => {
      const started = new Date(2022, 3, 30).toISOString();
      expect(
        updateTimestamps(
          { started: started, completed: null, updated: started },
          false
        )
      ).toMatchObject({
        started,
        completed: null,
        updated: date,
      });
    });
  });
});
