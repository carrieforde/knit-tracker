import { Button, Input } from "@mui/material";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Form } from "./Form";

const formTitle = "title";
const onSubmit = jest.fn();

function renderForm() {
  render(
    <Form
      title={formTitle}
      onSubmit={onSubmit}
      actions={<Button type="submit">Submit</Button>}
    >
      <Input name="name" />
    </Form>
  );
}

describe("Form", () => {
  it("should render the form title", () => {
    renderForm();

    expect(screen.getByText(formTitle)).toBeInTheDocument();
  });

  it("should call submit when the supplied button is clicked", () => {
    renderForm();

    userEvent.click(screen.getByRole("button"));

    expect(onSubmit).toHaveBeenCalled();
  });
});
