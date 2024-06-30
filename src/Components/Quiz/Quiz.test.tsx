import { jest } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import React, { act } from "react";
import Quiz from "./";
import axios, { AxiosResponse } from "axios";

const mockApiResponse = {
  response_code: 0,
  results: [
    {
      type: "multiple",
      difficulty: "hard",
      category: "Science: Computers",
      question: "Which RAID array type is associated with data mirroring?",
      correct_answer: "RAID 1",
      incorrect_answers: ["RAID 0", "RAID 10", "RAID 5"],
    },
    {
      type: "multiple",
      difficulty: "medium",
      category: "Geography",
      question:
        "The Principality of Sealand is an unrecognized micronation off the coast of what country?",
      correct_answer: "The United Kingdom",
      incorrect_answers: ["Japan", "Austrailia", "Argentina"],
    },
  ],
};

beforeEach(() => {
  jest
    .spyOn(axios, "get")
    .mockImplementationOnce(() =>
      Promise.resolve({ data: mockApiResponse } as AxiosResponse)
    );
});

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders loading state initially", () => {
  act(() => {
    render(<Quiz />);
  });

  const loadingElement = screen.getByText(/Loading.../i);
  expect(loadingElement).toBeInTheDocument();
});

test("fetches quiz data and displays", async () => {
  await act(async () => {
    render(<Quiz />);
  });

  await waitFor(() => {
    const questionElement = screen.getByText(
      mockApiResponse.results[0].question
    );
    expect(questionElement).toBeInTheDocument();
  });
});

test("handle questions and displays result", async () => {
  await act(async() => {
    render(<Quiz />);
  });

  await waitFor(() => {
    const questionElement = screen.getByText(
      mockApiResponse.results[0].question
    );
    expect(questionElement).toBeInTheDocument();
  });

  const answerButton = screen.getByText("RAID 1");
  fireEvent.click(answerButton);

  const nextButton = screen.getByText("Next");
  fireEvent.click(nextButton);

  const resultHeading = await screen.findByText(/Finish/i);
  expect(resultHeading).toBeInTheDocument();
});

test("restarts quiz", async () => {
  await act(async() => {
    render(<Quiz />);
  });

  await waitFor(() => {
    const questionElement = screen.getByText(
      mockApiResponse.results[0].question
    );
    expect(questionElement).toBeInTheDocument();
  });

  const answerButton = screen.getByText("RAID 10");
  fireEvent.click(answerButton);

  const nextButton = screen.getByText("Next");
  fireEvent.click(nextButton);

  const resultHeading = await screen.findByText(/The United Kingdom/i);
  expect(resultHeading).toBeInTheDocument();

  const restartButton = screen.getByText(/Finish/i);
  fireEvent.click(restartButton);

});
