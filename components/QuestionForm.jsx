import { useState } from "react";

function QuestionForm({ onAddQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleChange(e) {
    const { name, value } = e.target;

    if (name.startsWith("answer")) {
      const index = Number(name.slice(-1));
      const updatedAnswers = [...formData.answers];
      updatedAnswers[index] = value;
      setFormData({ ...formData, answers: updatedAnswers });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then(onAddQuestion);

    setFormData({
      prompt: "",
      answers: ["", "", "", ""],
      correctIndex: 0,
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>New Question</h2>
      <label>
        Prompt:
        <input name="prompt" value={formData.prompt} onChange={handleChange} />
      </label>
      {formData.answers.map((answer, index) => (
        <label key={index}>
          Answer {index + 1}:
          <input
            name={`answer${index}`}
            value={answer}
            onChange={handleChange}
          />
        </label>
      ))}
      <label>
        Correct Answer:
        <select
          name="correctIndex"
          value={formData.correctIndex}
          onChange={handleChange}
        >
          {formData.answers.map((_, index) => (
            <option key={index} value={index}>
              {index}
            </option>
          ))}
        </select>
      </label>
      <button type="submit">Add Question</button>
    </form>
  );
}

export default QuestionForm;
