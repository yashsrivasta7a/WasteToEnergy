/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ref, push, onValue } from "firebase/database";
import { database } from "../firebase";

const sanitizeKey = (key) => key.replace(/\s+/g, "_").replace(/[().#$/\[\]]/g, ""); // Firebase-safe keys

const API_KEY = process.env.GEMINI_API_KEY;
const GeminiModel = ({ userInput }) => {
    const [response, setResponse] = useState(null);
    const [status, setStatus] = useState(null); // "approved", "rejected", or null
    const [requestId, setRequestId] = useState(null);
    const [generated, setGenerated] = useState(false);

    const genAI = new GoogleGenerativeAI(API_KEY);

    useEffect(() => {
        if (!userInput || userInput.inputs.length === 0 || generated) return;

        const fetchResponse = async () => {
            try {
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

                const prompt = `
                Given the following organic waste inputs, generate a JSON response with the following details:
                Energy Generated (kWh), Waste Diverted from Landfill (kg), Pollution Reduction (CO2 emissions in kg),
                Water Saved (Kilo liters), Methane Emissions Prevented (kg CH4), Compost Created (kg),
                Biogas Produced (m^3), Reduction in Fossil Fuel Usage (liters or kWh equivalent),
                Cost Savings in Waste Management (currency), Odor Reduction (%), Improved Soil Health (%),
                Organic Fertilizer Produced (kg), Reduction in Land Usage (sq. meters),
                Reduction in Chemical Fertilizer Use (kg), Reduction in Transport Emissions (kg CO2),
                Coins Generated.
      
                Coins generated will be (Energy Generated*0.25 + Biogas Produced*0.5 + 0.2*Compst Created)*2
      
                Waste Data:
                ${userInput.inputs.map((item) => `${item.quantity} of ${item.product}`).join(", ")}
      
                Provide the response in JSON format ONLY and REMOVE markdown formatting like \`\`\`json or \`\`\`.
              `;

                const result = await model.generateContent({
                    contents: [{ role: "user", parts: [{ text: prompt }] }],
                    generationConfig: { maxOutputTokens: 1000, temperature: 0.3 },
                });

                const generatedText = await result.response.text();
                let cleanJsonString = generatedText
                    .replace(/```json\s*/g, "")
                    .replace(/```\s*$/g, "")
                    .trim();

                if (!cleanJsonString.startsWith("{") || !cleanJsonString.endsWith("}")) {
                    throw new Error("Invalid JSON format received.");
                }

                const jsonData = JSON.parse(cleanJsonString);

                const sanitizedData = {};
                Object.keys(jsonData).forEach((key) => {
                    sanitizedData[sanitizeKey(key)] = jsonData[key];
                });

                setResponse(sanitizedData);
                setGenerated(true);
            } catch (error) {
                console.error("Error fetching response:", error);
                setResponse({ error: "Failed to generate response." });
            }
        };

        fetchResponse();
    }, [userInput]);

    const handleVerify = () => {
        if (!response || response.error || requestId) return;

        const dbRef = ref(database, "requests");
        const newRequestRef = push(dbRef, {
            userInput,
            aiResponse: response,
            approved: false,
            rejected: false,
            date: new Date().toISOString(),
        });

        setRequestId(newRequestRef.key);
    };

    useEffect(() => {
        if (!requestId) return;

        const requestRef = ref(database, `requests/${requestId}`);
        const unsubscribe = onValue(requestRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                if (data.approved) {
                    setStatus("approved");
                } else if (data.rejected) {
                    setStatus("rejected");
                }
            }
        });

        return () => unsubscribe();
    }, [requestId]);

    return (
        <div>
            <h3 style={{ textAlign: 'center', fontSize: '2rem', margin: '1rem 0' }}>AI Powered Environmental Parameters</h3>
            {response ? (
                response.error ? (
                    <p>{response.error}</p>
                ) : (
                    <div className="ai-content">
                        {Object.entries(response).map(([key, value]) => (
                            <p key={key}>
                                {key.replace(/_/g, " ")}: <strong>{typeof value === "object" ? JSON.stringify(value) : value}</strong>
                            </p>
                        ))}
                    </div>
                )
            ) : (
                <p>Waiting for input...</p>
            )}

            <button
                style={{ margin: '1rem auto', backgroundColor: status ? "#6c757d" : '#007bff' }}
                onClick={handleVerify}
                disabled={!!status || !response || response.error || requestId}
            >
                {status === "approved" ? "Verified ✅" : status === "rejected" ? "Rejected ❌" : "Get Verified?"}
            </button>
        </div>
    );
};

export default GeminiModel;
