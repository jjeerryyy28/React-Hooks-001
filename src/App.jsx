import React, { useState, useEffect } from "react";
import "./App.css";

class Question {
  constructor(question, options, answer) {
    this.question = question;
    this.options = options;
    this.answer = answer;
  }
}


function Quiz() {
  const [score, setScore] = useState(0);
  const [submission, setsubmission] = useState([]);
  const [quizStatus, setQuizStatus] = useState(1);

  const setData = [
    new Question("what is the capital of france?",["Paris", "London", "Berlin", "Rome"],"Paris"),
    new Question("Who is the CEO of Tesla?",["Bill Gates", "Elon Musk", "Jeff Bezos", "Mark Zuckerberg"],"Elon Musk"),
    new Question("Capital of Canada is",["Toronto","Ottawa","Montreal","Vancouver"],"Toronto"),
    new Question("What is the largest planet in our solar system?",["Mars", "Jupiter", "Venus", "Saturn"],"Jupiter"),
    new Question("Canada is the largest exporter of",["Wood","Crude oil","Fresh water","Maple Syrup"],"Maple Syrup")
  ];

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  useEffect(() => {
    shuffle(setData);
    setCurrentQues({
      data: setData[0],
      s_no: 1,
    });
  }, []);

  const [currentQues, setCurrentQues] = useState({
    data: {
      question: "How many planets are in our solar system?",
      options: ["North Pole", "Alaska", "Ladakh", "South Pole"],
      answer: "North Pole",
    },
    s_no: 1,
  });

  const CheckAnswer = (value) => {
    setTimeout(() => {
      if (currentQues.data.answer === value) {
        setScore((preValue) => preValue + 5);
        setsubmission((preValue) => [...preValue, true]);
      } else {
        setsubmission((preValue) => [...preValue, false]);
      }
      if (currentQues.s_no === setData.length) {
        setQuizStatus(0);
      }
      setCurrentQues((preValue) => {
        return {
          data: setData[preValue.s_no],
          s_no: preValue.s_no + 1,
        };
      });
    }, 1000);
  };

  return (
    <div className="Quiz-container">
      <h2>React Quiz</h2>
      <p>Current Score: {score}</p>
      {quizStatus ? (
        <div className="QuizQuestion-container">
          <h2 style={{textAlign: "center"}}>
            Question {currentQues.s_no} out of {setData.length}
          </h2>
          <h4 style={{textAlign: "center", fontSize:"18px"}}>{currentQues.data.question}</h4>
          {currentQues.data.options.map((item, index) => (
            <div
            className={`QuizOption-container ${
              submission.length >= currentQues.s_no &&
              currentQues.data.answer !== item
                ? "dark" // Apply the "dark" class for incorrect answers
                : submission.length >= currentQues.s_no
                ? "light" // Apply the "light" class for correct answers
                : ""
            }`}
            key={index}
          >
            <h4 onClick={() => CheckAnswer(item)}>{item}</h4>
            {submission.length >= currentQues.s_no &&
              currentQues.data.answer !== item && (
                <p className="incorrect-msg">Incorrect</p>
              )}
            {submission.length >= currentQues.s_no &&
              currentQues.data.answer === item && (
                <p className="correct-msg">Correct</p>
              )}
          </div>
          ))}
        </div>
      ) : (
        <div>Quiz ended</div>
      )}
    </div>
  );
}

export default Quiz;
