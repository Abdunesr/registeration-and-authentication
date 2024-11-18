import { useState } from "react"

export default function Questioninput() {
  const [questions, setQuestions] = useState({
    subject: "",
    questionss: [{
      question: "",
      option: ["", "", "", ""], // Initialize with four empty options
      answer: "",
    }],
  });

  // Function to handle input change for the subject
  function handleinput(event) {
    const { name, value } = event.target;
    setQuestions(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }

  // Function to handle input change for each question and options
  function handleaddquestion(index, event) {
    event.preventDefault();
    const { name, value } = event.target;
    if (name.startsWith("option-")) {
      const optionIndex = parseInt(name.split("-")[1], 10);
      setQuestions(prevState => {
        const newQuestions = [...prevState.questionss];
        newQuestions[index].option[optionIndex] = value;
        return { ...prevState, questionss: newQuestions };
      });
    } else {
      setQuestions(prevState => {
        const newQuestions = [...prevState.questionss];
        newQuestions[index] = { ...newQuestions[index], [name]: value };
        return { ...prevState, questionss: newQuestions };
      });
    }
  }

  // Function to add a new question
  const addquestion = () => {
    setQuestions(prevState => ({
      ...prevState,
      questionss: [
        ...prevState.questionss,
        { question: "", option: ["", "", "", ""], answer: null }
      ],
    }));
  };

  return (
    <form>
      <div className="space-y-12">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="text-xl font-bold text-gray-900">Post questions one by one</h2>
          <div className="sm:col-span-4">
            <label htmlFor="subject" className="block text-sm/6 font-medium text-gray-900">
              Course name
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={questions.subject}
                  onChange={handleinput}
                  className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                />
              </div>
            </div>
          </div>

          {Array.isArray(questions.questionss) && questions.questionss.map((course, index) => (
            <div key={index} className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4 w-full">
                <label htmlFor={`question-${index}`} className="block text-sm/6 font-medium text-gray-900">
                  Question
                </label>
                <div className="mt-2">
                  <input
                    id={`question-${index}`}
                    name="question"
                    type="text"
                    value={questions.questionss[index].question}
                    onChange={(event) => handleaddquestion(index, event)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>

              {/* Repeat the input structure for choices A, B, C, and D */}
              {[...Array(4)].map((_, choiceIndex) => (
                <div key={choiceIndex} className="sm:col-span-3">
                  <label htmlFor={`option-${choiceIndex}`} className="block text-sm/6 font-medium text-gray-900">
                    Choice {String.fromCharCode(65 + choiceIndex)}
                  </label>
                  <div className="mt-2">
                    <input
                      id={`option-${choiceIndex}`}
                      name={`option-${choiceIndex}`}
                      type="text"
                      value={questions.questionss[index].option[choiceIndex]}
                      onChange={(event) => handleaddquestion(index, event)}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                    />
                  </div>
                </div>
              ))}

              <div className="">
                <label htmlFor={`answer-${index}`} className="block text-sm/6 font-medium text-gray-900">
                  Answer
                </label>
                <div className="mt-2">
                  <input
                    id={`answer-${index}`}
                    name="answer"
                    type="text"
                    value={questions.questionss[index].answer}
                    onChange={(event) => handleaddquestion(index, event)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                  />
                </div>
              </div>
            </div>
          ))}
          <button onClick={addquestion} type="button" className="rounded-md mt-3 sm:mt-8 w-max h-max bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Add question
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button type="button" className="text-sm/6 font-semibold text-gray-900">
          Cancel
        </button>
        <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </button>
      </div>
    </form>
  )
}
