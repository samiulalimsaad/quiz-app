import { useEffect, useState } from "react";

const useUser = () => {
    const [user, setUser] = useState("");

    useEffect(() => {
        const u = localStorage.getItem("user");
        if (u) {
            setUser(u);
        } else {
            const temp = "user" + new Date().getMilliseconds();
            setUser(temp);
            localStorage.setItem("user", temp);
        }
    }, []);

    return user;
};

export default useUser;
