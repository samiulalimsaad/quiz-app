import axios from "axios";
import { useEffect, useState } from "react";

interface quizInterface {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: [string];
    question: string;
    type: string;
}

const arrayShuffle = (arr: [string], str: string) =>
    [str, ...arr].sort(() => Math.random() - 0.5);

const Quiz = () => {
    const [allQuiz, setAllQuiz] = useState<quizInterface[]>([]);
    const [currentQuiz, setCurrentQuiz] = useState<quizInterface>();
    const [index, setIndex] = useState(0);

    useEffect(() => {
        axios.get("https://opentdb.com/api.php?amount=10").then(({ data }) => {
            console.log(data?.results);
            setAllQuiz(data?.results);
        });
    }, []);

    useEffect(() => {
        setCurrentQuiz(allQuiz[index]);
    }, [allQuiz, index]);

    return (
        <div className="grid w-2/3 h-screen mx-auto place-items-center">
            <div className="w-full shadow-xl card bg-base-100">
                <div className="flex justify-between p-4 text-2xl">
                    <h2 className="font-semibold text-slate-900">
                        Category: {currentQuiz?.category}
                    </h2>
                    <p className="text-slate-400">
                        Difficulty: {currentQuiz?.difficulty}
                    </p>
                </div>
                <progress
                    className="w-full progress progress-info"
                    value={1 + index * (100 / allQuiz?.length)}
                    max="100"
                ></progress>

                <div className="card-body">
                    <h2 className="card-title">
                        {index + 1}. {currentQuiz?.question}
                    </h2>
                    <div>
                        {currentQuiz?.correct_answer &&
                            arrayShuffle(
                                currentQuiz?.incorrect_answers,
                                currentQuiz?.correct_answer
                            )?.map((v) => (
                                <div
                                    key={v}
                                    className="p-3 mt-4 border rounded-md border-sky-100 bg-sky-100"
                                >
                                    <div className="form-control">
                                        <label className="flex items-center gap-4 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="radio-6"
                                                className="radio checked:bg-sky-500"
                                                checked
                                            />
                                            <span className=" label-text">
                                                {v}
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <div>
                            {index + 1}/{allQuiz?.length}
                        </div>
                        <div className="justify-end card-actions">
                            <button className="btn btn-warning">
                                Skip Quiz
                            </button>
                            <button
                                className="btn btn-success"
                                onClick={() => setIndex((p) => p + 1)}
                            >
                                Next Quiz
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
