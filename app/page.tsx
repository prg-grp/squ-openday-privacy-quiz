'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import questions from './questions.json';
import strings from './strings.json';

const randomizeQuestions = (language: keyof typeof questions) =>
  questions[language].map((q) => {
    const correctAnswer = q.answers[0];
    const randomized = q.answers.slice(0).sort(() => Math.random() - 0.5);
    const correctIndex = randomized.indexOf(correctAnswer);

    return {
      question: q.question,
      answers: randomized,
      correct: correctIndex,
    };
  });

const getLocalizedStrings = (language: keyof typeof strings) => strings[language];

export default function PrivacyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showLangSelect, setShowLangSelect] = useState(true);
  const [strings, setStrings] = useState(getLocalizedStrings('en'));
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [questionList, setQuestionList] = useState(randomizeQuestions('en'));

  const keyboardKeyIndex = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
  };

  const handleAnswerClick = (answerIndex: number) => {
    if (answerIndex >= questionList[currentQuestion].answers.length) {
      return;
    }

    setSelectedAnswer(answerIndex);
    setIsCorrect(answerIndex === questionList[currentQuestion].correct);

    setTimeout(() => {
      if (answerIndex === questionList[currentQuestion].correct) {
        setScore(score + 1);
      }

      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questionList.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
        setIsCorrect(null);
      } else {
        setShowScore(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setShowLangSelect(true);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case 'r':
          restartQuiz();
          break;
        case 'a':
        case 'b':
        case 'c':
        case 'd':
          if (showLangSelect) {
            switch (event.key) {
              case 'a':
                setQuestionList(randomizeQuestions('en'));
                setStrings(getLocalizedStrings('en'));
                setShowLangSelect(false);
                break;
              case 'b':
                setQuestionList(randomizeQuestions('de'));
                setStrings(getLocalizedStrings('de'));
                setShowLangSelect(false);
                break;
            }
          } else if (!showScore && selectedAnswer === null) {
            handleAnswerClick(keyboardKeyIndex[event.key]);
          } else if (showScore) {
            restartQuiz();
          }
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl p-4">
        {!showLangSelect && (
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">{strings.title}</CardTitle>
            <CardDescription className="text-center">{strings.description}</CardDescription>
          </CardHeader>
        )}
        <CardContent>
          <AnimatePresence mode="wait">
            {showLangSelect && (
              <motion.div
                key="langselect"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <h2 className="text-2xl font-bold mb-4">Cyber Security Quiz</h2>
                <h2 className="text-2xl font-bold mb-4">Sprache wählen / select language</h2>
                <div className="flex justify-center">
                  <Button
                    onClick={() => {
                      setQuestionList(randomizeQuestions('en'));
                      setStrings(getLocalizedStrings('en'));
                      setShowLangSelect(false);
                    }}
                    variant="outline"
                    className="m-4 p-8"
                  >
                    <Badge variant="secondary" className="bg-hsgDarkGreen text-white">
                      a
                    </Badge>
                    English
                  </Button>
                  <Button
                    onClick={() => {
                      setQuestionList(randomizeQuestions('de'));
                      setStrings(getLocalizedStrings('de'));
                      setShowLangSelect(false);
                    }}
                    variant="outline"
                    className="m-4 p-8"
                  >
                    <Badge variant="secondary" className="bg-hsgDarkGreen text-white">
                      b
                    </Badge>
                    Deutsch
                  </Button>
                </div>
              </motion.div>
            )}
            {showScore && (
              <motion.div
                key="score"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <h2 className="text-2xl font-bold mb-4">{strings.completed}</h2>
                <p className="text-xl">
                  {strings.score} {score} {strings.outof} {questionList.length}
                </p>
              </motion.div>
            )}
            {!showScore && !showLangSelect && (
              <motion.div
                key={currentQuestion}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  {strings.question} {currentQuestion + 1}/{questionList.length}
                </h2>
                <p className="text-lg mb-6">{questionList[currentQuestion].question}</p>
                <div className="grid gap-4">
                  {questionList[currentQuestion].answers.map((answer, index) => (
                    <Button
                      key={index}
                      onClick={() => handleAnswerClick(index)}
                      disabled={selectedAnswer !== null}
                      variant={selectedAnswer === index ? (isCorrect ? 'default' : 'destructive') : 'outline'}
                      className="text-left justify-start h-auto py-3 px-4 border-hsgDarkGreen"
                    >
                      <Badge variant="secondary" className="bg-hsgDarkGreen text-white">
                        {Object.entries(keyboardKeyIndex).find(([_, value]) => value === index)?.[0]}
                      </Badge>
                      {answer}
                    </Button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        {!showLangSelect && (
          <CardFooter className="flex justify-between">
            <p className="text-sm text-muted-foreground">
              {strings.score} {score}/{questionList.length}
            </p>
            <Button onClick={restartQuiz} variant="secondary">
              <Badge variant="secondary" className="bg-hsgDarkGreen text-white">
                r
              </Badge>
              {strings.restart}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}
