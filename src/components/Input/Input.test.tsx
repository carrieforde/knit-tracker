import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Input, InputProps } from "./Input";

const defaultProps = {
  label: "First Name",
  name: "firstName",
};

function renderInput(props?: Partial<InputProps>) {
  const p = { ...defaultProps, ...props };
  render(<Input {...p} />);
}

describe("Input", () => {
  it("should render the default type", () => {
    renderInput();
    expect(screen.getByRole("textbox")).toHaveAttribute("type", "text");
  });

  it("should render the input with the correct label, name, and type", () => {
    const props: InputProps = { type: "email", name: "email", label: "email" };

    renderInput(props);

    const input = screen.getByRole("textbox");

    expect(input).toHaveAttribute("type", props.type);
    expect(input).toHaveAttribute("name", props.name);
    expect(screen.getByLabelText(props.label)).toBeInTheDocument();
  });

  it("should call the passed onChange", () => {
    const onChange = jest.fn();

    renderInput({ onChange });

    const input = screen.getByRole("textbox");

    userEvent.clear(input);
    userEvent.type(input, "text");

    expect(onChange).toHaveBeenCalled();
  });
});
