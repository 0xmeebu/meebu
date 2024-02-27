import { useState, useEffect } from "react";
import { MeebuState } from "../Interfaces";


export const UseMeebuState = (url: string) => {
    const [data, setData] = useState<MeebuState>({
        OrgFactory: "",
        Orgs: {},
        Voters: {},
    });
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<any | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            setIsPending(true);
            try {
                const response = await fetch("http://localhost:8080/inspect", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/octet-stream",
                    },
                    body: Buffer.alloc(0),
                });
                if (!response.ok) throw new Error(response.statusText);
                const body = await response.json();

                let hexString = body.reports[0].payload
                let jsonString = Buffer.from(hexString.slice(2), 'hex').toString()
                let state = JSON.parse(jsonString)

                setIsPending(false);
                setData(state);
                setError(null);
            } catch (error) {
                setError(`${error} Could not Fetch Data `);
                setIsPending(false);
            }
        };
        fetchData();
    }, [url]);
    return { data, isPending, error };
};
