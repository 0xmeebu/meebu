import { useState, useEffect } from "react";


export const UseMeebuState = (url: string) => {
    const [data, setData] = useState<any>(null);
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
                body: new Buffer([]),
            });
          if (!response.ok) throw new Error(response.statusText);
          const body = await response.json();
          console.log(body)
          setIsPending(false);
          setData(body);
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
