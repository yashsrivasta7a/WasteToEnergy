import { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";

const useFetchData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const dbRef = ref(database, "requests");

        // Set up a real-time listener
        const unsubscribe = onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                const rawData = snapshot.val();
                const formattedData = Object.keys(rawData).map((requestId) => {
                    const request = rawData[requestId];

                    return {
                        id: requestId,
                        date: request?.date || "Unknown Date",
                        ...request?.aiResponse, // Extract all AI response metrics
                    };
                });

                setData(formattedData);
            } else {
                setData([]); // No data found
            }
        });

        return () => unsubscribe();
    }, []);

    return data;
};

export default useFetchData;