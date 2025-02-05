'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const questions = [
  {
    question: 'What is the primary purpose of the GDPR?',
    answers: [
      'To regulate internet speeds',
      'To protect personal data and privacy in the EU',
      'To promote cybersecurity',
      'To standardize web design',
    ],
    correct: 1,
  },
  {
    question: "What does 'data minimization' mean?",
    answers: [
      'Collecting as much data as possible',
      'Deleting all user data',
      'Collecting only necessary data',
      'Sharing data with third parties',
    ],
    correct: 2,
  },
  {
    question: "What is a 'data breach'?",
    answers: [
      'A new data collection method',
      'A type of computer virus',
      'Unauthorized access to personal data',
      'A data storage technique',
    ],
    correct: 2,
  },
  {
    question: "What is 'consent' in terms of data privacy?",
    answers: [
      'Automatic agreement to all terms',
      'Explicit permission to process personal data',
      'A type of data encryption',
      'A legal document',
    ],
    correct: 1,
  },
  {
    question: "What is the 'right to be forgotten'?",
    answers: [
      'The right to delete your social media accounts',
      'The right to have personal data erased',
      'The right to use a pseudonym online',
      'The right to block unwanted emails',
    ],
    correct: 1,
  },
];

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
