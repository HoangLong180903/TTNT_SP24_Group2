import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { API_TAKE_QUIZZ, API_RANK_LIST } from '../configs/api-config';
import { useNavigation } from '@react-navigation/native';
import { useQuizHistory } from '../configs/QuizHistoryContext';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';

const fetchRankings = async (setRankings) => {
    try {
        const response = await axios.get(API_RANK_LIST);
        setRankings(response.data);
        console.log("Data rank:", response.data);
    } catch (error) {
        console.error("Error fetching rankings:", error);
    }
};

const StartQuizz = ({ navigation, route }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [testDetail, setTestDetail] = useState(null);
    const { userId, quizDetail } = route.params;
    const [answerStatus, setAnswerStatus] = useState(null);
    const [score, setScore] = useState(0);
    const { history, updateHistory } = useQuizHistory();
    const [rankings, setRankings] = useState([]);
    useEffect(() => {
        setTestDetail(quizDetail);
        if (quizDetail && quizDetail.questions) {
            setSelectedAnswers(Array(quizDetail.questions.length).fill(null));
        }
    }, [quizDetail]);

    useEffect(() => {
        fetchRankings(setRankings);
    }, []);


    const handleAnswer = (answer) => {
        const updatedSelectedAnswers = [...selectedAnswers];
        updatedSelectedAnswers[currentIndex] = answer.answer;
        setSelectedAnswers(updatedSelectedAnswers);

        if (answer.isCorrect) {
            setAnswerStatus('correct');
        } else {
            setAnswerStatus('incorrect');
        }
    };

    const handleNextQuestion = () => {
        if (currentIndex < quizDetail.questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            handleQuizCompletion();
        }
    };

    const handleQuizCompletion = () => {
        if (selectedAnswers.every(answer => answer !== null)) {
            const answerData = {
                testId: quizDetail._id,
                userId: userId,
                answers: selectedAnswers
            };

            axios.post(`${API_TAKE_QUIZZ}`, answerData)
                .then(response => {
                    const { correctAnswersCount, incorrectAnswersCount, score } = response.data.session;
                    alert(`Correct answers: ${correctAnswersCount}\nIncorrect answers: ${incorrectAnswersCount}\nScore: ${score}`);
                    setScore(score);
                    const questionsWithAnswers = testDetail.questions.map(question => ({
                        ...question,
                        userAnswer: selectedAnswers[testDetail.questions.indexOf(question)],
                        allAnswers: question.answers.map(ans => ans.answer)
                    }));
                    const newHistory = [...history, questionsWithAnswers]; 
                    updateHistory(newHistory);
                    fetchRankings(setRankings);
                    navigation.navigate('ResultScreen', { correctAnswersCount, incorrectAnswersCount, score, questions: questionsWithAnswers });
                    // navigation.navigate('QuizScreen');
                   
                })
                .catch(error => {
                    console.error('Error submitting answer:', error);
                });
        } else {
            alert("Please answer all questions before submitting.");
        }
    };


    return (
      <SafeAreaView style={styles.container}>
        {testDetail &&
        testDetail.questions &&
        testDetail.questions.length > 0 ? (
          <>
            {testDetail.questions[currentIndex] ? (
              <View>
                <View
                  style={{
                    backgroundColor: "#3C9E9E",
                    padding: 20,
                    justifyContent: "space-around",
                    alignItems: "center",
                    flex: 0.7,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      alignSelf: "flex-start",

                      marginBottom: 10,
                      color: "#FFF",
                      fontWeight: "bold",
                    }}
                  >
                    Question {currentIndex + 1}/
                    {testDetail.questions.length}
                  </Text>
                  <Text style={styles.question}>
                    {testDetail.questions[currentIndex].content}
                  </Text>
                </View>

                <View style={styles.answersContainer}>
                  {testDetail.questions[currentIndex].answers &&
                  testDetail.questions[currentIndex].answers.length > 0 ? (
                    testDetail.questions[currentIndex].answers.map(
                      (answer, index) => (
                        <TouchableOpacity
                          key={index}
                          style={[
                            styles.answerButton,
                            selectedAnswers[currentIndex] === answer.answer &&
                              styles.selectedAnswer,
                          ]}
                          onPress={() => handleAnswer(answer)}
                        >
                          <Text
                            style={[
                              styles.answerText,
                              selectedAnswers[currentIndex] === answer.answer &&
                                styles.selectedAnswerText,
                            ]}
                          >
                            {answer.answer}
                          </Text>
                        </TouchableOpacity>
                      )
                    )
                  ) : (
                    <Text style={styles.question}></Text>
                  )}
                </View>
                <View style={{ flex: 0.3 }}>
                  <TouchableOpacity
                    style={styles.nextButton}
                    onPress={handleNextQuestion}
                    disabled={selectedAnswers[currentIndex] === null}
                  >
                    <Text style={styles.nextButtonText}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <Text style={styles.question}></Text>
            )}
          </>
        ) : (
          <Text style={styles.question}></Text>
        )}
        {/* <Text style={styles.score}>Score: {score}</Text> */}
      </SafeAreaView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
  },
  question: {
    backgroundColor: "#3C9E9E",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#FFF",
  },
  answersContainer: {
    flexDirection: "row",
    rowGap: 0,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    flexWrap: "wrap",
    flex:0.8,
  },
  answerButton: {
    backgroundColor: "#eee",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#BDBDBD",
    width: 170,
    margin: 5,
    height:100,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedAnswer: {
    backgroundColor: "#56B837",
  },
  answerText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  selectedAnswerText: {
    color: "#FFF",
  },
  nextButton: {
    backgroundColor: "#3C9E9E",
    padding: 10,
    marginVertical: 10,
    borderRadius: 20,
    width: 300,
    alignSelf: "center",
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    fontWeight:"bold"
  },
  score: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default StartQuizz;
