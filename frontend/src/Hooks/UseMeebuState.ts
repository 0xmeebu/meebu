import { useState, useEffect } from "react";
import { MeebuState } from "../Interfaces";


const url = "http://localhost:8080/inspect"

export const UseMeebuState = () => {
  const [state, setState] = useState<MeebuState | null>(null);
  const [updating, setUpdating] = useState<boolean>(false);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchState = setInterval(async () => {
      setUpdating(true);

      const request = {
        method: "POST",
        headers: {
          "Content-Type": "application/octet-stream",
        },
        body: Buffer.alloc(0),
      }

      let body
      try {
        const response = await fetch(url, request);
        if (!response.ok) throw new Error(response.statusText);
        body = await response.json();

      } catch (error) {
        setError(`Could not Fetch Data: ${error}`);
        setUpdating(false);
        return
      }

      let hexString = body.reports[0].payload
      let jsonString = Buffer.from(hexString.slice(2), 'hex').toString()
      let state = JSON.parse(jsonString)

      setUpdating(false);
      setState(state);
      setError(null);
    }, 5000)


    return () => clearInterval(fetchState); // Cleanup on component unmount
  }, []);

  return { state, updating, error };
};
