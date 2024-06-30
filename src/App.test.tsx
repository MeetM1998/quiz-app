import React, {act} from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("App component", () => {
  const { getByTestId } = render(<App />)
  const quizComponent = getByTestId("quiz-component");
  expect(quizComponent).toBeInTheDocument();
});