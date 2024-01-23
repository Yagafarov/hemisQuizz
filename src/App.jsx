import React, { useState, useEffect } from 'react';
import quizData1 from './assets/data.json'; // Import your quiz data

function belgilanganSoniBoyiChaElementlarniTanlash(jsonMassiv, soni) {
  // Massivni aralashtirish (shuffle) qiling
  jsonMassiv.sort(function () {
    return 0.5 - Math.random();
  });

  // Berilgan soni bo'yicha elementlarni tanlang
  var tanlanganElementlar = jsonMassiv.slice(0, soni);

  return tanlanganElementlar;
}

// 50 elementdan 5 ta tanlangan
// var quizData = belgilanganSoniBoyiChaElementlarniTanlash(quizData1, 5);

function shuffleArray(array) {
  // Function to shuffle an array using Fisher-Yates algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [quizData, setDataSize] = useState(quizData1);
  const [quizStarted, setQuizStarted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null); // New state

  useEffect(() => {
    // Shuffle options whenever the current question changes
    setShuffledOptions(shuffleArray(quizData[currentQuestion].options));
  }, [currentQuestion]);

  const handleAnswerClick = (option) => {
    setSelectedOption(option); // Set the selected option
  };

  const handleNextQuestion = () => {
    if (selectedOption !== null) {
      // Proceed to the next question only if an option is selected
      const isCorrect = selectedOption === quizData[currentQuestion].answer;

      if (isCorrect) {
        setScore(score + 1);
      }

      if (currentQuestion + 1 < quizData.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null); // Reset selected option for the next question
        // Shuffle options for the next question
        setShuffledOptions(
          shuffleArray(quizData[currentQuestion + 1].options)
        );
      } else {
        setShowResult(true);
      }
    }
  };

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setDataSize(belgilanganSoniBoyiChaElementlarniTanlash(quizData1, 50));
  };

  const handleRestartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setQuizStarted(false);
    setDataSize(belgilanganSoniBoyiChaElementlarniTanlash(quizData1, 50));
  };

  return (
    <div className='quizz'>
      {!quizStarted ? (
        <div className='welcome'>
          <h1>Test trinajoriga xush kelibsiz!</h1>
          <button className='start__btn' onClick={handleStartQuiz}>
            Testni boshlash
          </button>
        </div>
      ) : !showResult ? (
        <div>
          <h2>
            {currentQuestion + 1}
            <span className='allQuizz'>/{quizData.length}</span>
          </h2>
          <p className='question'>{quizData[currentQuestion].question}</p>

          <ul>
            {shuffledOptions.map((option, index) => (
              <li
                key={index}
                onClick={() => handleAnswerClick(option)}
                className={
                  option === selectedOption ? 'selected' : ''
                }
              >
                {option}
              </li>
            ))}
          </ul>

          <p>To'g'ri savollar soni: {score}</p>

          <button
            className='start__btn'
            onClick={handleNextQuestion}
            disabled={selectedOption === null} // Disable the button if no option is selected
          >
            Keyingisi
          </button>
        </div>
      ) : (
        <div className='welcome'>
          <h2>Test yakunlandi</h2>
          <p>Sizning natijangiz: {score} / {quizData.length}</p>
          <button className='start__btn' onClick={handleRestartQuiz}>
            Qayta boshlash
          </button>
        </div>
      )}
    </div>
  );
}

export default App;