import React, { useState } from 'react';
import Question from './Question';
import Result from './Result';
import Progress from './Progress';
import './Quiz.css';

const questions = [
    {
        questionText: 'Which team won the NBA Championship in 2024?',
        options: [
            { answerText: 'Denver Nuggets', isCorrect: false },
            { answerText: 'Miami Heat', isCorrect: false },
            { answerText: 'Golden State Warriors', isCorrect: false },
            { answerText: 'Boston Celtics', isCorrect: true },
        ],
    },
    {
        questionText: 'Which team won the NBA Championship in 2023?',
        options: [
            { answerText: 'Denver Nuggets', isCorrect: true },
            { answerText: 'Miami Heat', isCorrect: false },
            { answerText: 'Golden State Warriors', isCorrect: false },
            { answerText: 'Boston Celtics', isCorrect: false },
        ],
    },
    {
        questionText: 'Which team claimed the NBA title in 2022?',
        options: [
            { answerText: 'Golden State Warriors', isCorrect: true },
            { answerText: 'Boston Celtics', isCorrect: false },
            { answerText: 'Milwaukee Bucks', isCorrect: false },
            { answerText: 'Phoenix Suns', isCorrect: false },
        ],
    },
    {
        questionText: 'Which team won the NBA Championship in 2021?',
        options: [
            { answerText: 'Milwaukee Bucks', isCorrect: true },
            { answerText: 'Phoenix Suns', isCorrect: false },
            { answerText: 'Los Angeles Lakers', isCorrect: false },
            { answerText: 'Atlanta Hawks', isCorrect: false },
        ],
    },
    {
        questionText: 'Which team won the NBA title in 2020?',
        options: [
            { answerText: 'Los Angeles Lakers', isCorrect: true },
            { answerText: 'Miami Heat', isCorrect: false },
            { answerText: 'Toronto Raptors', isCorrect: false },
            { answerText: 'Boston Celtics', isCorrect: false },
        ],
    },
    {
        questionText: 'Which team was the runner-up in the NBA Finals in 2022?',
        options: [
            { answerText: 'Boston Celtics', isCorrect: true },
            { answerText: 'Golden State Warriors', isCorrect: false },
            { answerText: 'Miami Heat', isCorrect: false },
            { answerText: 'Milwaukee Bucks', isCorrect: false },
        ],
    },
];

var answer = [];

function Quiz() {
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [answerCount, setAnswersCount] = useState(answer.length)
    const [disableFlag, setDisableFlag] = useState(false)

    // timer
    setTimeout(
            ()=>{
                setDisableFlag(true);
            }, 2 *60 * 1000
    )

    const updateProgress = (questionIndex) => {
        if(!answer.includes(questionIndex)){
            answer.push(questionIndex);
            let progress = answer.length/6 * 100;
            setAnswersCount(progress);
        }
    }

    const handleAnswerOptionClick = (questionIndex, isCorrect) => {
        const newAnswers = [...answers];
        newAnswers[questionIndex] = isCorrect;
        updateProgress(questionIndex);
        setAnswers(newAnswers);
    };

    const handleSubmit = () => {
        const newScore = answers.filter((answer) => answer === true).length;
        setScore(newScore);
        setShowResult(true);
    };
    
    return (
        <div className="quiz">
            {showResult ? (
                <Result score={score} totalQuestions={questions.length} />
            ) : (
                <div>
                    <Progress width={`${answerCount}%`}/>
                    {questions.map((question, index) => (
                        <Question
                            key={index}
                            question={question}
                            questionIndex={index}
                            handleAnswerOptionClick={handleAnswerOptionClick}
                        />
                    ))}
                    <button className="submit-button" onClick={handleSubmit} disabled={disableFlag}>
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
}

export default Quiz;