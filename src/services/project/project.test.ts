import { CounterType, ICounters, IProject, IProjectStatus } from "types";
import {
  addProject,
  calculateProgress,
  calculateStatus,
  decrement,
  increment,
  updateProject,
  updateTimestamps,
  UpdateType,
} from "./project";

describe("project service", () => {
  describe("addProject", () => {
    it("should return a project with initialized values", () => {
      expect(
        addProject({
          name: "my project",
          counters: [
            { type: CounterType.ROW, currentCount: 0, maxCount: 5 },
            { type: CounterType.REPEAT, currentCount: 0, maxCount: 5 },
            false,
          ],
        })
      ).toMatchObject({
        name: "my project",
        slug: "my-project",
        timestamps: {
          started: null,
          updated: null,
          completed: null,
        },
        progress: 0,
        status: IProjectStatus.notStarted,
      });
    });
  });

  describe("updateProject", () => {
    const originalDate = new Date(2022, 3, 30).toISOString();
    const date = new Date(2022, 4, 1).toISOString();

    const baseProject: IProject = {
      name: "project",
      slug: "project",
      counters: [
        { type: CounterType.ROW, currentCount: 3, maxCount: 5 },
        { type: CounterType.REPEAT, currentCount: 3, maxCount: 5 },
        false,
      ],
      progress: 60,
      timestamps: {
        added: originalDate,
        started: originalDate,
        updated: originalDate,
        completed: null,
      },
      status: IProjectStatus.inProgress,
    };

    beforeAll(() => {
      jest.useFakeTimers("modern");
      jest.setSystemTime(new Date(2022, 4, 1));
    });

    afterAll(() => {
      jest.useRealTimers();
    });

    it("should update the project with an incremented row", () => {
      const [row, repeat, isLinked] = [...baseProject.counters];
      const { updated, ...rest } = baseProject.timestamps;

      expect(updateProject(baseProject, UpdateType.incrementRow)).toMatchObject(
        {
          ...baseProject,
          counters: [{ ...row, currentCount: 4 }, repeat, isLinked],
          timestamps: {
            ...rest,
            updated: date,
          },
        }
      );
    });

    it("should update the project with an decremented row", () => {
      const [row, repeat, isLinked] = [...baseProject.counters];
      const { updated, ...rest } = baseProject.timestamps;

      expect(updateProject(baseProject, UpdateType.decrementRow)).toMatchObject(
        {
          ...baseProject,
          counters: [{ ...row, currentCount: 2 }, repeat, isLinked],
          timestamps: {
            ...rest,
            updated: date,
          },
        }
      );
    });

    it("should update the project with an incremented repeat", () => {
      const [row, repeat, isLinked] = [...baseProject.counters];
      const { updated, ...rest } = baseProject.timestamps;

      expect(
        updateProject(baseProject, UpdateType.incrementRepeat)
      ).toMatchObject({
        ...baseProject,
        counters: [row, { ...repeat, currentCount: 4 }, isLinked],
        timestamps: {
          ...rest,
          updated: date,
        },
        progress: 80,
      });
    });

    it("should update the project with an decremented repeat", () => {
      const [row, repeat, isLinked] = [...baseProject.counters];
      const { updated, ...rest } = baseProject.timestamps;

      expect(
        updateProject(baseProject, UpdateType.decrementRepeat)
      ).toMatchObject({
        ...baseProject,
        counters: [row, { ...repeat, currentCount: 2 }, isLinked],
        timestamps: {
          ...rest,
          updated: date,
        },
        progress: 40,
      });
    });

    it("should only update the project timestamps", () => {
      const { updated, ...rest } = baseProject.timestamps;

      expect(updateProject(baseProject)).toMatchObject({
        ...baseProject,
        timestamps: {
          ...rest,
          updated: date,
        },
      });
    });
  });

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

  describe("decrement", () => {
    it("should decrement a row", () => {
      expect(
        decrement(
          [
            { type: CounterType.ROW, currentCount: 1, maxCount: 5 },
            { type: CounterType.REPEAT, currentCount: 0, maxCount: 0 },
            false,
          ],
          CounterType.ROW
        )
      ).toMatchObject([
        { type: CounterType.ROW, currentCount: 0, maxCount: 5 },
        { type: CounterType.REPEAT, currentCount: 0, maxCount: 0 },
        false,
      ]);
    });

    it("should decrement a repeat", () => {
      expect(
        decrement(
          [
            { type: CounterType.ROW, currentCount: 1, maxCount: 5 },
            { type: CounterType.REPEAT, currentCount: 5, maxCount: 10 },
            false,
          ],
          CounterType.REPEAT
        )
      ).toMatchObject([
        { type: CounterType.ROW, currentCount: 1, maxCount: 5 },
        { type: CounterType.REPEAT, currentCount: 4, maxCount: 10 },
        false,
      ]);
    });

    it("should not decrement below 0", () => {
      expect(
        decrement(
          [
            { type: CounterType.ROW, currentCount: 0, maxCount: 5 },
            { type: CounterType.REPEAT, currentCount: 0, maxCount: 0 },
            false,
          ],
          CounterType.ROW
        )
      ).toMatchObject([
        { type: CounterType.ROW, currentCount: 0, maxCount: 5 },
        { type: CounterType.REPEAT, currentCount: 0, maxCount: 0 },
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
      expect(updateTimestamps({ isStarted: true })).toMatchObject({
        started: date,
        completed: null,
        updated: date,
      });
    });

    it("should update the completed and update time, but leave the started time", () => {
      const started = new Date(2022, 3, 30).toISOString();
      expect(
        updateTimestamps({
          timestamps: {
            added: started,
            started,
            completed: null,
            updated: started,
          },
          isCompleted: true,
          isStarted: true,
        })
      ).toMatchObject({
        started,
        completed: date,
        updated: date,
      });
    });

    it("should update the updated time, but leave started & completed", () => {
      const started = new Date(2022, 3, 30).toISOString();
      expect(
        updateTimestamps({
          timestamps: {
            added: started,
            started: started,
            completed: null,
            updated: started,
          },
          isCompleted: false,
          isStarted: true,
        })
      ).toMatchObject({
        started,
        completed: null,
        updated: date,
      });
    });
  });

  describe("calculateStatus", () => {
    it("should return 'Not Started' when all counters are at 0", () => {
      const counters: ICounters = [
        { type: CounterType.ROW, currentCount: 0, maxCount: 5 },
        { type: CounterType.REPEAT, currentCount: 0, maxCount: 5 },
        true,
      ];

      expect(calculateStatus(counters)).toEqual(IProjectStatus.notStarted);
    });

    it("should return 'In Progress' when row count is greater than 0, but less than max count", () => {
      const counters: ICounters = [
        { type: CounterType.ROW, currentCount: 3, maxCount: 5 },
        { type: CounterType.REPEAT, currentCount: 0, maxCount: 0 },
        false,
      ];

      expect(calculateStatus(counters)).toEqual(IProjectStatus.inProgress);
    });

    it("should return 'Complete' when row count is greater than 0, and equal to max count", () => {
      const counters: ICounters = [
        { type: CounterType.ROW, currentCount: 5, maxCount: 5 },
        { type: CounterType.REPEAT, currentCount: 0, maxCount: 0 },
        false,
      ];

      expect(calculateStatus(counters)).toEqual(IProjectStatus.complete);
    });

    it("should return 'In Progress' when repeat max count and current count is greater than 0, but are not equal", () => {
      const counters: ICounters = [
        { type: CounterType.ROW, currentCount: 0, maxCount: 5 },
        { type: CounterType.REPEAT, currentCount: 3, maxCount: 5 },
        true,
      ];

      expect(calculateStatus(counters)).toEqual(IProjectStatus.inProgress);
    });

    it("should return 'Complete' when repeat max count and current count is greater than 0 and are equal", () => {
      const counters: ICounters = [
        { type: CounterType.ROW, currentCount: 0, maxCount: 5 },
        { type: CounterType.REPEAT, currentCount: 5, maxCount: 5 },
        true,
      ];

      expect(calculateStatus(counters)).toEqual(IProjectStatus.complete);
    });
  });
});
