'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import questions from './questions.json';

export default function PrivacyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const keyboardKeyIndex = {
    a: 0,
    b: 1,
    c: 2,
    d: 3,
  };

  const handleAnswerClick = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setIsCorrect(answerIndex === questions[currentQuestion].correct);

    setTimeout(() => {
      if (answerIndex === questions[currentQuestion].correct) {
        setScore(score + 1);
      }

      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
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
          if (!showScore && selectedAnswer === null) {
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
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Who Wants to Be a Privacy Expert?</CardTitle>
          <CardDescription className="text-center">Test your knowledge on data privacy!</CardDescription>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            {showScore ? (
              <motion.div
                key="score"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <h2 className="text-2xl font-bold mb-4">Quiz Completed!</h2>
                <p className="text-xl">
                  You scored {score} out of {questions.length}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={currentQuestion}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
              >
                <h2 className="text-xl font-semibold mb-4">
                  Question {currentQuestion + 1}/{questions.length}
                </h2>
                <p className="text-lg mb-6">{questions[currentQuestion].question}</p>
                <div className="grid gap-4">
                  {questions[currentQuestion].answers.map((answer, index) => (
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
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Score: {score}/{questions.length}
          </p>
          <Button onClick={restartQuiz} variant="secondary">
            <Badge variant="secondary" className="bg-hsgDarkGreen text-white">
              r
            </Badge>
            Quiz neustarten
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
