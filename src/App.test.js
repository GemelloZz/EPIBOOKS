import { render, screen } from "@testing-library/react";
import App from "./App";
import Welcome from "./components/Welcome";
import BookList from "./components/BookList";
import book from "./data/fantasy.json";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe("Welcome Component", () => {
  test("renders Welcome component with the correct heading text", () => {
    render(<Welcome />);
    const headingElement = screen.getByRole("heading", { level: 1 });
    expect(headingElement).toBeInTheDocument();
    expect(headingElement).toHaveTextContent("Benvenuti in EpiBooks!");
  });
});

describe("BookList", () => {
  it("dovrebbe renderizzare tante carte quanti sono i libri", () => {
    render(<BookList books={book} />);
    const cards = screen.getAllByTestId("single-book");
    expect(cards.length).toBe(book.length);
  });
});
