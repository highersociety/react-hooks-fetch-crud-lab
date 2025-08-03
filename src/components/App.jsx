import { useState, useEffect } from "react";
import QuestionList from "./QuestionList";
import QuestionForm from "./QuestionForm";

function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
  fetch("http://localhost:4000/questions")
    .then((res) => res.json())
    .then((data) => setQuestions(data));
}, []);


  function addQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function deleteQuestion(id) {
    const updated = questions.filter((q) => q.id !== id);
    setQuestions(updated);
  }

  function updateCorrectAnswer(id, correctIndex) {
    const updated = questions.map((q) =>
      q.id === id ? { ...q, correctIndex } : q
    );
    setQuestions(updated);
  }

  return (
    <div>
      <h1>Quiz Admin</h1>
      <QuestionForm onAddQuestion={addQuestion} />
      <QuestionList
        questions={questions}
        onDelete={deleteQuestion}
        onUpdateCorrectAnswer={updateCorrectAnswer}
      />
    </div>
  );
}

export default App;
