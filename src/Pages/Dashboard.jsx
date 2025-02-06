import { useState } from "react";
import ProductForm from "../components/ProductForm";
import GeminiModel from "../components/GeminiModel";
import useFetchData from "../components/UseFetchData";
import LineChartComponent from "../components/LineChart";
import LogoutButton from "../components/Logout";

const Dashboard = () => {
    const [userInput, setUserInput] = useState(null);
    const [aiResponse, setAiResponse] = useState(null);
    const data = useFetchData(); // Fetch data for charts

    const handleSubmitData = (data) => {
        setUserInput(data);
    };

    const handleAiResponse = (response) => {
        setAiResponse(response);
    };

    // List of parameters for separate charts
    const parameters = [
        "Energy_Generated_kWh",
        "Waste_Diverted_from_Landfill_kg",
        "Pollution_Reduction_CO2_kg",
        "Water_Saved_KL",
        "Methane_Emissions_Prevented_kg",
        "Compost_Created_kg",
        "Biogas_Produced_m3",
        "Reduction_in_Fossil_Fuel_Usage_liters",
        "Cost_Savings_in_Waste_Management",
        "Odor_Reduction_percentage",
        "Improved_Soil_Health_percentage",
        "Organic_Fertilizer_Produced_kg",
        "Reduction_in_Land_Usage_sq_meters",
        "Reduction_in_Chemical_Fertilizer_Use_kg",
        "Reduction_in_Transport_Emissions_kg_CO2",
    ];

    return (
        <div>
            <h1>Waste-to-Energy Conversion</h1>
            <ProductForm onSubmitData={handleSubmitData} />
            {userInput && <GeminiModel userInput={userInput} onResponse={handleAiResponse} />}

            {aiResponse && (
                <div>
                    <h3>Verified Response:</h3>
                    <pre>{JSON.stringify(aiResponse, null, 2)}</pre>
                </div>
            )}

            {/* Only show charts if data is available */}
            {data && data.length > 0 && (
                <div>
                    <h2>Performance Metrics Over Time</h2>
                    {parameters.map((param) => {
                        const chartData = [
                            {
                                id: param,
                                data: data.map((entry) => ({
                                    x: entry.date,
                                    y: entry[param] || 0, // Default to 0 if missing
                                })),
                            },
                        ];

                        return <LineChartComponent key={param} data={chartData} title={param.replace(/_/g, " ")} />;
                    })}
                </div>
            )}
        </div>
    );
};

export default Dashboard;