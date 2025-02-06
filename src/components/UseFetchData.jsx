import { useEffect, useState } from "react";
import { database, ref, onValue } from "../firebase";

const useFetchData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const dbRef = ref(database, "waste-data");

        // Set up a real-time listener
        const unsubscribe = onValue(dbRef, (snapshot) => {
            if (snapshot.exists()) {
                const rawData = snapshot.val();
                const formattedData = Object.keys(rawData).map((key) => ({
                    date: rawData[key].date,
                    ...rawData[key],
                }));
                setData(formattedData);
            } else {
                setData([]); // If no data exists
            }
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, []);

    return data;
};

export default useFetchData;