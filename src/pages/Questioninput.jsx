import { useState } from "react";
import { useRegister } from "../context/Registercontext";
import Loading from "../componet/Loading";
import { Alert } from "@mui/material";

export default function Questioninput() {
  const inistalstate = {
    subject: "",
    coursecode: Number,
    finishtime: Date(),
    starttime: Date(),
    date: Date(),
    autecode: String,
    questionss: [
      {
        question: "",
        option: ["", "", "", ""],
        answer: "",
      },
    ],
  };
  const [questions, setQuestions] = useState(inistalstate);
  const [successMessage, setSuceesmessage] = useState("");
  const { dispatch, state } = useRegister();
  const { isloading, error, iserror } = state;
  function handleinput(event) {
    const { name, value } = event.target;
    setQuestions((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: "register-request" });
    try {
      const response = await fetch("http://localhost:8000/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(questions),
      });

      if (!response.ok) {
        throw new Error("Registration failed");
      }
      if (response.ok) {
        setQuestions(inistalstate);
        setSuceesmessage("questions uploaded sucessfuly");
        setTimeout(() => {
          setSuceesmessage("");
        }, 3000);
      }
      dispatch({ type: "register-success" });
    } catch (error) {
      dispatch({ type: "register-error", payload: error.message });
    }
  };

  function handleaddquestion(index, event) {
    event.preventDefault();
    const { name, value } = event.target;
    if (name.startsWith("option-")) {
      const optionIndex = parseInt(name.split("-")[1], 10);
      setQuestions((prevState) => {
        const newQuestions = [...prevState.questionss];
        newQuestions[index].option[optionIndex] = value;
        return { ...prevState, questionss: newQuestions };
      });
    } else {
      setQuestions((prevState) => {
        const newQuestions = [...prevState.questionss];
        newQuestions[index] = { ...newQuestions[index], [name]: value };
        return { ...prevState, questionss: newQuestions };
      });
    }
  }

  const addquestion = () => {
    setQuestions((prevState) => ({
      ...prevState,
      questionss: [
        ...prevState.questionss,
        { question: "", option: ["", "", "", ""], answer: null },
      ],
    }));
  };

  return (
    <>
      {iserror ? (
        <Error error={error} />
      ) : isloading ? (
        <Loading />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="fixed top-20 right-20">
              {successMessage && (
                <Alert variant="filled" severity="success">
                  {successMessage}
                </Alert>
              )}
            </div>
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-xl font-bold text-gray-900">
                Post questions one by one
              </h2>
              <div className="sm:col-span-4">
                <label
                  htmlFor="subject"
                  className="block text-sm/6 font-medium text-gray-900"
                >
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
                      required
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="coursecode"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Course code
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="coursecode"
                      name="coursecode"
                      type="text"
                      value={questions.coursecode}
                      onChange={handleinput}
                      required
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="autecode"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Autentcation code
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="autecode"
                      name="autecode"
                      type="text"
                      value={questions.autecode}
                      onChange={handleinput}
                      required
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="date"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Date
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="date"
                      name="date"
                      type="date"
                      value={questions.date}
                      onChange={handleinput}
                      required
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="finishtime"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Finish Time:
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="finishtime"
                      name="finishtime"
                      type="time"
                      value={questions.finishtime}
                      onChange={handleinput}
                      required
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="starttime"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Start time:
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                    <input
                      id="starttime"
                      name="starttime"
                      type="time"
                      value={questions.starttime}
                      onChange={handleinput}
                      required
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              {Array.isArray(questions.questionss) &&
                questions.questionss.map((course, index) => (
                  <div
                    key={index}
                    className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6"
                  >
                    <div className="sm:col-span-4 w-full">
                      <label
                        htmlFor={`question-${index}`}
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Question
                      </label>
                      <div className="mt-2">
                        <input
                          id={`question-${index}`}
                          name="question"
                          type="text"
                          required
                          value={questions.questionss[index].question}
                          onChange={(event) => handleaddquestion(index, event)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>

                    {/* Repeat the input structure for choices A, B, C, and D */}
                    {[...Array(4)].map((_, choiceIndex) => (
                      <div key={choiceIndex} className="sm:col-span-3">
                        <label
                          htmlFor={`option-${choiceIndex}`}
                          className="block text-sm/6 font-medium text-gray-900"
                        >
                          Choice {String.fromCharCode(65 + choiceIndex)}
                        </label>
                        <div className="mt-2">
                          <input
                            id={`option-${choiceIndex}`}
                            name={`option-${choiceIndex}`}
                            type="text"
                            required
                            value={
                              questions.questionss[index].option[choiceIndex]
                            }
                            onChange={(event) =>
                              handleaddquestion(index, event)
                            }
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                          />
                        </div>
                      </div>
                    ))}

                    <div className="">
                      <label
                        htmlFor={`answer-${index}`}
                        className="block text-sm/6 font-medium text-gray-900"
                      >
                        Answer
                      </label>
                      <div className="mt-2">
                        <input
                          id={`answer-${index}`}
                          name="answer"
                          type="text"
                          required
                          value={questions.questionss[index].answer}
                          onChange={(event) => handleaddquestion(index, event)}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              <button
                onClick={addquestion}
                type="button"
                className="rounded-md mt-3 sm:mt-8 w-max h-max bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add question
              </button>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm/6 font-semibold text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      )}
    </>
  );
}
