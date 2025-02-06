import { useState } from "react";
import ProductForm from "../components/ProductForm";
import GeminiModel from "../components/GeminiModel";
import useFetchData from "../components/UseFetchData";
import LineChartComponent from "../components/LineChart";
import LogoutButton from "../components/Logout";
import RadialBarChartComponent from "../components/RadialBar";
import MarimekkoChartComponent from "../components/MarimekkoChart";

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

    // List of parameters for different chart types
    const parameters1 = [
        "Energy_Generated_kWh",
        "Pollution_Reduction_CO2_emissions_in_kg",
        "Methane_Emissions_Prevented_kg_CH4",
        "Biogas_Produced_m^3",
        "Reduction_in_Fossil_Fuel_Usage_kWh_equivalent",
        "Cost_Savings_in_Waste_Management_currency",
        "Organic_Fertilizer_Produced_kg",
        "Reduction_in_Land_Usage_sq_meters",
        "Reduction_in_Chemical_Fertilizer_Use_kg",
        "Reduction_in_Transport_Emissions_kg_CO2",
    ];

    const parameters2 = ["Odor_Reduction_%", "Improved_Soil_Health_%"];

    const parameters3 = ["Waste_Diverted_from_Landfill_kg", "Water_Saved_Kilo_liters", "Compost_Created_kg"];

    return (
        <div className="dashboard">
            <h1>Waste-to-Energy Conversion</h1>
            <ProductForm onSubmitData={handleSubmitData} />
            {userInput && <GeminiModel userInput={userInput} onResponse={handleAiResponse} />}

            {aiResponse && (
                <div>
                    <h3>Verified Response:</h3>
                    <pre>{JSON.stringify(aiResponse, null, 2)}</pre>
                </div>
            )}

            <h2>Performance Metrics Over Time</h2>
            {data && data.length > 0 ? (
                <div className="charts-container">
                    {parameters1.map((param) => {
                        const chartData = [
                            {
                                id: param,
                                data: data.map((entry) => ({
                                    x: entry.date,
                                    y: entry[param] ? parseFloat(entry[param]) : 0, // Ensure numeric values
                                })),
                            },
                        ];

                        return <LineChartComponent key={param} data={chartData} title={param.replace(/_/g, " ")} />;
                    })}

                    {parameters2.map((param) => {
                        const chartData = [
                            {
                                id: param,
                                data: data
                                    .map((entry) => ({
                                        x: entry.date,
                                        y: typeof entry[param] === "number" && !isNaN(entry[param]) ? entry[param] : 0, // Ensure valid number
                                    }))
                                    .filter((item) => item.y !== null && item.y !== undefined), // Remove invalid entries
                            },
                        ];

                        return <RadialBarChartComponent key={param} data={chartData} title={param.replace(/_/g, " ")} />;
                    })}

                    {parameters3.map((param) => {
                        const chartData = data.map((entry) => ({
                            category: entry.date, // X-axis label (date)
                            [param]: entry[param] ? parseFloat(entry[param]) : 0, // Ensure numeric values
                        }));

                        console.log(`Radar Chart Data for ${param}:`, chartData); // Debugging log

                        return <MarimekkoChartComponent key={param} data={chartData} title={param.replace(/_/g, " ")} />;
                    })}

                </div>
            ) : (
                <p>Loading data or no data available...</p>
            )}
        </div>
    );
};

export default Dashboard;