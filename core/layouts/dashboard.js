import { useEffect, useState } from "react";
import Header from "../components/header/header";


export default function Dashboard({ children, ...delegated }) {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return <>
        <Header/>
        {children}
    </>;
}