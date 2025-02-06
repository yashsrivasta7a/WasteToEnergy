/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GeminiModel = ({ userInput, onResponse }) => {
    const [response, setResponse] = useState(null);
    const genAI = new GoogleGenerativeAI("YOUR API KEY HERE");

    useEffect(() => {
        if (!userInput || userInput.length === 0) return;

        const fetchResponse = async () => {
            try {
                const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

                const prompt = `
        Given the following organic waste inputs, generate a JSON response with the following details:
        Energy Generated (kWh)
        Waste Diverted from Landfill (kg)
        Pollution Reduction (CO2 emissions in kg)
        Water Saved (Kilo liters)
        Methane Emissions Prevented (kg CH4)
        Compost Created (kg)
        Biogas Produced (m^3)
        Reduction in Fossil Fuel Usage (liters or kWh equivalent)
        Monetary Savings (in rupees or local currency)
        Revenue from Energy (in rupees or local currency)
        Cost Savings in Waste Management (in rupees or local currency)
        Odor Reduction (%)
        Improved Soil Health (%)
        Organic Fertilizer Produced (kg)
        Reduction in Land Usage (sq. meters)
        Reduction in Chemical Fertilizer Use (kg)
        Reduction in Transport Emissions (kg CO2)

        Waste Data:
        ${userInput.map((item) => `${item.quantity} kg of ${item.product}`).join(", ")}

        Handle fractions and decimals appropriately so it wont break the JSON format.
        Do NOT deny that you cannot provide output. Assume optimal conditions for production.

        Provide the response in JSON format *ONLY* and *REMOVE* markdown formatting like or any other text.
        `;

                const result = await model.generateContent({
                    contents: [
                        {
                            role: "user",
                            parts: [{ text: prompt }],
                        },
                    ],
                    generationConfig: {
                        maxOutputTokens: 1000,
                        temperature: 0.3,
                    },
                });

                const generatedText = await result.response.text();
                console.log("Generated text:", generatedText);

                let cleanJsonString = generatedText
                    .replace(/```json\s*/g, "")
                    .replace(/```\s*$/g, "")
                    .trim();

                if (!cleanJsonString.startsWith("{") || !cleanJsonString.endsWith("}")) {
                    throw new Error("Invalid JSON format received.");
                }

                const jsonData = JSON.parse(cleanJsonString);
                console.log("Generated response:", jsonData);

                setResponse(jsonData);

                // Pass the generated data back to the parent component via the callback
                onResponse(jsonData);

            } catch (error) {
                console.error("Error fetching response:", error);
                setResponse({ error: "Failed to generate response." });
                onResponse({ error: "Failed to generate response." }); // Ensure we still pass back something even on error
            }
        };

        fetchResponse();
    }, [userInput]);

    return (
        <div>
            <h3>Gemini AI Response:</h3>
            {response ? (
                response.error ? (
                    <p>{response.error}</p>
                ) : (
                    <pre>{JSON.stringify(response, null, 2)}</pre>
                )
            ) : (
                <p>Waiting for input...</p>
            )}
        </div>
    );
};

export default GeminiModel;
