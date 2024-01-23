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
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  useEffect(() => {
    // Shuffle options whenever the current question changes
    setShuffledOptions(shuffleArray(quizData[currentQuestion].options));
  }, [currentQuestion]);

  const handleAnswerClick = (option) => {
    setSelectedOption(option); // Set the selected option

    // Check if the selected option is correct and update the state
    setShowCorrectAnswer(option === quizData[currentQuestion].answer);
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
        setShowCorrectAnswer(false); // Reset the correct answer display
        // Shuffle options for the next question
        // setShuffledOptions(
        //   shuffleArray(quizData[currentQuestion + 1].options)
        // );
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
          </button><br/>
          <a href="https://anodra.uz" target={'_blank'} className="start__btn">Biz haqimizda</a>
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
                  option === selectedOption
                    ? 'selected'
                    : option === quizData[currentQuestion].answer &&
                      showCorrectAnswer
                    ? 'correct'
                    : ''
                }
              >
                {option}
              </li>
            ))}
          </ul>

          <p>To'g'ri savollar soni: {score}</p>

          {/* "To'g'ri javob" button */}
          <button
            className='start__btn'
            onClick={() => setShowCorrectAnswer(true)}
            disabled={showCorrectAnswer || selectedOption === null}
          >
            To'g'ri javob
          </button>
          <button
            className='start__btn'
            onClick={handleNextQuestion}
            disabled={selectedOption === null}
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
