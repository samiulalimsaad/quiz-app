import Link from "next/link";
import { useRouter } from "next/router";

const Result = () => {
    const router = useRouter();
    return (
        <div className="grid w-2/3 h-screen mx-auto place-items-center">
            <div className="shadow-xl w-96 card bg-base-100">
                <div className="card-body">
                    <h2 className="card-title">
                        User:{" "}
                        <span className="text-slate-500">
                            {localStorage.getItem("user")}
                        </span>
                    </h2>
                    <h2 className="card-title">
                        Score:{" "}
                        <span className="text-slate-500">
                            {router.query.result} / {router.query.total}
                        </span>
                    </h2>
                    <div className="flex items-center justify-between mt-4">
                        <div className="justify-end w-full card-actions">
                            <Link href="/quiz" passHref>
                                <a className="w-full btn btn-success">
                                    Start Quiz Again
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Result;
