import { useEffect, useState } from "react";

const useUser = () => {
    const [user, setUser] = useState("");

    useEffect(() => {
        const temp = "user" + Date.now();
        setUser(temp);
        localStorage.setItem("user", temp);
    }, []);

    return user;
};

export default useUser;
