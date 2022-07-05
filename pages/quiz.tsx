import axios from "axios";
import { useRouter } from "next/router";
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
    const [multiple, setMultiple] = useState<string[]>([]);
    const [selected, setSelected] = useState("");
    const [result, setResult] = useState(0);
    const [timer, setTimer] = useState(30);

    const router = useRouter();
    useEffect(() => {
        axios.get("https://opentdb.com/api.php?amount=10").then(({ data }) => {
            console.log(data?.results);
            setAllQuiz(data?.results);
        });
    }, []);

    useEffect(() => {
        const tt = setInterval(() => {
            setTimer((p) => p - 1);
        }, 1000);

        if (timer <= 0) {
            setSelected("");
            clearInterval(tt);
        }
        return () => {
            clearInterval(tt);
        };
    }, [timer]);

    useEffect(() => {
        setCurrentQuiz(allQuiz[index]);
        allQuiz.length !== index &&
            setMultiple(
                arrayShuffle(
                    allQuiz[index]?.incorrect_answers,
                    allQuiz[index]?.correct_answer
                )
            );
    }, [allQuiz, index]);

    useEffect(() => {
        if (allQuiz.length > 0 && allQuiz.length === index) {
            router.replace(`/result?total=${allQuiz.length}&result=${result}`);
        }
    }, [allQuiz, index, result, router]);

    const nextQuestion = () => {
        if (currentQuiz?.correct_answer === selected) {
            setResult((p) => p + 1);
        }

        setIndex((p) => p + 1);
        setSelected("");
        setTimer(30);
    };

    const skipQuestion = () => {
        setIndex((p) => p + 1);
        setTimer(30);
    };

    if (!allQuiz?.length)
        return (
            <div className="grid w-2/3 h-screen mx-auto text-2xl font-semibold place-items-center">
                Loading...
            </div>
        );
    return (
        <div className="grid w-2/3 h-screen mx-auto place-items-center">
            <div className="w-full shadow-xl card bg-base-100">
                <div className="flex justify-between p-4 text-2xl">
                    <h2 className="font-semibold text-slate-900">
                        {currentQuiz?.category}
                    </h2>
                    <div className="flex items-center justify-center gap-4">
                        <p className="text-slate-400">
                            Difficulty: {currentQuiz?.difficulty}
                        </p>
                        <p
                            className={`font-semibold  ${
                                timer <= 0
                                    ? "text-red-600 animate-pulse"
                                    : "text-slate-800 animate-bounce"
                            }`}
                        >
                            {timer}
                        </p>
                    </div>
                </div>
                <progress
                    className="w-full progress progress-info"
                    value={2 + index * (100 / (allQuiz?.length - 1))}
                    max={100}
                ></progress>

                <div className="card-body">
                    <h2 className="card-title">
                        {index + 1}. {currentQuiz?.question}
                    </h2>
                    <div>
                        {currentQuiz?.correct_answer &&
                            multiple?.map((v) => (
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
                                                onChange={() =>
                                                    timer > 0 && setSelected(v)
                                                }
                                                checked={v === selected}
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
                        <h4 className="card-title">
                            User:{" "}
                            <span className="text-slate-500">
                                {localStorage.getItem("user")}
                            </span>
                        </h4>
                        <div className="justify-end card-actions">
                            <button
                                className="btn btn-warning"
                                onClick={skipQuestion}
                            >
                                Skip Quiz
                            </button>
                            <button
                                className="btn btn-success"
                                onClick={nextQuestion}
                                disabled={!selected}
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
