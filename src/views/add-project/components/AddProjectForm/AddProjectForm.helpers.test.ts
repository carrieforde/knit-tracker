import { CounterType } from "types";
import {
  defaultAddProjectValues,
  getMappedProjectValues,
} from "./AddProjectForm.helpers";

describe("mapProjectValues", () => {
  it("should map values entered in the form to a DB friendly format", () => {
    const mapped = getMappedProjectValues({
      ...defaultAddProjectValues,
      name: "My hat",
      maxRowCount: "30",
      currentRowCount: 5,
      maxRepeatCount: "0",
      currentRepeatCount: 0,
      isLinked: "false",
    });

    expect(mapped).toMatchObject({
      name: "My hat",
      slug: "my-hat",
      counters: [
        {
          type: CounterType.ROW,
          maxCount: 30,
          currentCount: 5,
        },
        {
          type: CounterType.REPEAT,
          maxCount: 0,
          currentCount: 0,
        },
        false,
      ],
    });
  });
});
