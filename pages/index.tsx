import type { NextPage } from "next";
import Link from "next/link";
import { useEffect, useRef } from "react";
import useUser from "../components/hooks/useUser";

const Home: NextPage = () => {
    const user = useUser();
    const btn = useRef<any>();

    useEffect(() => {
        btn.current?.focus();
    }, []);

    console.log(user);
    return (
        <div className="grid h-screen place-items-center">
            <div className="grid h-1/2 place-items-center">
                <h1 className="text-3xl font-bold text-center">Quiz App!</h1>

                <Link href="/quiz" passHref>
                    <a ref={btn} className="btn btn-accent">
                        Start Quiz
                    </a>
                </Link>
            </div>
        </div>
    );
};

export default Home;
