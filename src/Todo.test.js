import React from 'react';
import ReactDOM from 'react-dom';
import Todo from './Todo';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';





// h1 Todo List
// button add task
// button Switch mode


describe("initial elements", () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Todo />, div);
  });

  test('renders title', () => {
    render(<Todo />);
    const element = screen.getByText(/Todo list/i);
    expect(element).toBeInTheDocument();
  });

  test('renders "add task" button', () => {
    render(<Todo />);
    const element = screen.getByText(/add task/i);
    expect(element).toBeInTheDocument();
  });

  test('renders "switch mode" button', () => {
    render(<Todo />);
    const element = screen.getByText(/switch mode/i);
    expect(element).toBeInTheDocument();
  });

  test('renders text box', () => {
    render(<Todo />);
    const element = screen.getByRole("textbox");
    expect(element).toBeInTheDocument();
  });

  test('renders buttons', () => {
    render(<Todo />);
    const element = screen.getAllByRole("button");
    expect(element.length).toBe(2)
  });
});

describe("text input", () => {
  test("input element is in the document", () => {
    render(<Todo />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument()
  })
      
  test("input element value changes with new input", () => {
    render(<Todo />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "here is a task"} });
    expect(input.value).toBe("here is a task");
  })

  test("input is added to the document after button press", () => {
    render(<Todo />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "here is a task"} });
    const button = screen.getByText(/add task/i);
    fireEvent.click(button);
    const element = screen.getByText(/here is a task/i);
    expect(element).toBeInTheDocument();
  })

  test("input element is empty after adding task", () => {
    render(<Todo />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "here is a task"} });
    const button = screen.getByText(/add task/i);
    fireEvent.click(button);
    expect(input.value).toBe("");
  })
})

describe("after adding one task", () => {
  test("delete button is added to the document", () => {
    render(<Todo />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "here is a task"} });
    const button = screen.getByText(/add task/i);
    fireEvent.click(button);
    const element = screen.getByText(/delete/i);
    expect(element).toBeInTheDocument();
  })

  test("archive button is added to the document", () => {
    render(<Todo />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "here is a task"} });
    const button = screen.getByText(/add task/i);
    fireEvent.click(button);
    const element = screen.getByText(/archive/i);
    expect(element).toBeInTheDocument();
  })

  test("edit button is added to the document", () => {
    render(<Todo />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "here is a task"} });
    const button = screen.getByText(/add task/i);
    fireEvent.click(button);
    const element = screen.getByText(/edit/i);
    expect(element).toBeInTheDocument();
  })

  test('renders buttons', () => {
    render(<Todo />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "here is a task"} });
    const button = screen.getByText(/add task/i);
    fireEvent.click(button);
    const element = screen.getAllByRole("button");
    expect(element.length).toBe(5)
  });
})
