import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { COLORS, SPACING, TYPOGRAPHY, BORDER_RADIUS, SHADOWS } from '../../constants/theme';
import { useTraining } from '../../context/TrainingContext';
import { showToast } from '../../components/Toast';

export const QuizScreen = ({ route, navigation }: any) => {
  const { courseId, chapterId } = route.params;
  const { submitQuiz } = useTraining();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    { id: '1', text: 'What is the primary purpose of a business plan?', options: ['To secure funding', 'To guide operations', 'To attract partners', 'All of the above'], correct: 3 },
    { id: '2', text: 'Which financial statement shows profitability?', options: ['Balance Sheet', 'Income Statement', 'Cash Flow', 'All of these'], correct: 1 },
  ];

  const handleAnswer = (answerIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = answerIndex;
    setAnswers(newAnswers);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit(newAnswers);
    }
  };

  const handleSubmit = async (finalAnswers: number[]) => {
    const result = await submitQuiz(courseId, chapterId, finalAnswers);
    setScore(result.score);
    setSubmitted(true);
    if (result.passed) {
      showToast(`Quiz passed! Score: ${result.score}%`, 'success');
    } else {
      showToast(`Quiz failed. Score: ${result.score}%`, 'error');
    }
  };

  if (submitted) {
    return (
      <View style={styles.resultContainer}>
        <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.resultHeader}>
          <Icon name="quiz" size={60} color={COLORS.white} />
          <Text style={styles.resultTitle}>Quiz Results</Text>
        </LinearGradient>
        <View style={styles.scoreCard}>
          <Text style={styles.scoreValue}>{score}%</Text>
          <Text style={styles.scoreLabel}>{score >= 70 ? 'Passed!' : 'Failed'}</Text>
          <Text style={styles.scoreMessage}>{score >= 70 ? 'Great job! You can proceed to the next chapter.' : 'Please review the chapter and try again.'}</Text>
        </View>
        <TouchableOpacity style={styles.doneButton} onPress={() => navigation.goBack()}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const question = questions[currentQuestion];
  return (
    <View style={styles.container}>
      <LinearGradient colors={[COLORS.primary, COLORS.primaryDark]} style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}><Icon name="arrow-back" size={24} color={COLORS.white} /></TouchableOpacity>
        <Text style={styles.headerTitle}>Quiz</Text>
        <Text style={styles.questionCounter}>{currentQuestion + 1}/{questions.length}</Text>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.questionText}>{question.text}</Text>
        {question.options.map((option, index) => (
          <TouchableOpacity key={index} style={styles.optionButton} onPress={() => handleAnswer(index)}>
            <View style={styles.optionCircle}><Text style={styles.optionLetter}>{String.fromCharCode(65 + index)}</Text></View>
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: SPACING.xl, paddingTop: SPACING.xxxl, paddingBottom: SPACING.lg },
  backButton: { padding: SPACING.sm }, headerTitle: { fontSize: TYPOGRAPHY.sizes.xl, fontWeight: 'bold', color: COLORS.white },
  questionCounter: { fontSize: TYPOGRAPHY.sizes.md, color: COLORS.white },
  content: { flex: 1, padding: SPACING.xl },
  questionText: { fontSize: TYPOGRAPHY.sizes.xl, fontWeight: 'bold', color: COLORS.gray800, marginBottom: SPACING.xxxl, lineHeight: 32 },
  optionButton: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.white, borderRadius: BORDER_RADIUS.lg, padding: SPACING.md, marginBottom: SPACING.md, ...SHADOWS.sm },
  optionCircle: { width: 36, height: 36, borderRadius: 18, backgroundColor: COLORS.gray100, justifyContent: 'center', alignItems: 'center', marginRight: SPACING.md },
  optionLetter: { fontSize: TYPOGRAPHY.sizes.lg, fontWeight: 'bold', color: COLORS.primary },
  optionText: { fontSize: TYPOGRAPHY.sizes.md, color: COLORS.gray800, flex: 1 },
  resultContainer: { flex: 1, backgroundColor: COLORS.background },
  resultHeader: { alignItems: 'center', padding: SPACING.xxxl, paddingTop: SPACING.xxxl },
  resultTitle: { fontSize: TYPOGRAPHY.sizes.xxl, fontWeight: 'bold', color: COLORS.white, marginTop: SPACING.md },
  scoreCard: { backgroundColor: COLORS.white, margin: SPACING.xl, padding: SPACING.xxl, borderRadius: BORDER_RADIUS.xl, alignItems: 'center', ...SHADOWS.lg },
  scoreValue: { fontSize: 72, fontWeight: 'bold', color: COLORS.primary },
  scoreLabel: { fontSize: TYPOGRAPHY.sizes.xl, fontWeight: 'bold', color: COLORS.gray700, marginTop: SPACING.md },
  scoreMessage: { fontSize: TYPOGRAPHY.sizes.md, color: COLORS.gray500, textAlign: 'center', marginTop: SPACING.lg },
  doneButton: { backgroundColor: COLORS.primary, margin: SPACING.xl, paddingVertical: SPACING.md, borderRadius: BORDER_RADIUS.lg, alignItems: 'center' },
  doneButtonText: { color: COLORS.white, fontSize: TYPOGRAPHY.sizes.md, fontWeight: 'bold' },
});