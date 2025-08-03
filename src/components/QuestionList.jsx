import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDelete, onUpdateCorrectAnswer }) {
  return (
    <section>
      <h2>Questions</h2>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={onDelete}
            onUpdateCorrectAnswer={onUpdateCorrectAnswer}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
