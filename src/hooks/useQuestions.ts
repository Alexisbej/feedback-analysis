import { Question, QuestionType } from '@prisma/client';

export function useQuestions(initialQuestions: Question[], onChange: (questions: Omit<Question, 'id' | 'templateId'>[]) => void) {
  const addQuestion = () => {
    onChange([...initialQuestions, { question: '', type: 'TEXT', options: [] }]);
  };

  const updateQuestion = (index: number, field: keyof Question, value: QuestionType) => {
    const newQuestions = [...initialQuestions];
    if (field === 'type') {
      newQuestions[index].type = value;
      if (value !== 'MULTIPLE_CHOICE') {
        newQuestions[index].options = [];
      }
    } else {
      newQuestions[index].question = value;
    }
    onChange(newQuestions);
  };

  const addOption = (qIndex: number) => {
    const newQuestions = [...initialQuestions];
    newQuestions[qIndex].options.push('');
    onChange(newQuestions);
  };

  const updateOption = (qIndex: number, aIndex: number, value: string) => {
    const newQuestions = [...initialQuestions];
    newQuestions[qIndex].options[aIndex] = value;
    onChange(newQuestions);
  };

  return {
    questions: initialQuestions,
    addQuestion,
    updateQuestion,
    addOption,
    updateOption,
  };
}
