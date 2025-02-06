import { useState } from "react";
import GeminiModel from "../components/GeminiModel";
import LineChart from "../components/LineChart";
import ProductForm from "../components/ProductForm"
import RadarChart from "../components/RadarChart"

function Dashboard() {

    const [userInput, setUserInput] = useState([]);
    const [responseData, setResponseData] = useState(null);

    const handleGeminiResponse = (data) => {
        setResponseData(data);
    };

    return (
        <>
            <ProductForm onSubmitData={setUserInput} />
            <GeminiModel userInput={userInput} onResponse={handleGeminiResponse} />
            {responseData && <RadarChart data={responseData} />}
            <LineChart />
        </>
    )
}

export default Dashboard