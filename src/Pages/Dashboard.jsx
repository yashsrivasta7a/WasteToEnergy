import { useState } from "react";
import ProductForm from "../components/ProductForm";
import GeminiModel from "../components/GeminiModel";
import useFetchData from "../components/UseFetchData";
import LineChartComponent from "../components/LineChart";
import LogoutButton from "../components/Logout";
import RadialBarChartComponent from "../components/RadialBar";
import MarimekkoChartComponent from "../components/MarimekkoChart";
import { FaChartLine, FaChartPie, FaChartArea } from 'react-icons/fa'; //
import { FaBook } from "react-icons/fa6";
import { SiConvertio } from "react-icons/si";
import { BsCoin } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { NavLink } from "react-router-dom";
import Navbar from "../components/Navbar";

const Dashboard = () => {
    const [metric,setMetric] = useState(false);
    const [userInput, setUserInput] = useState(null);
    const [aiResponse, setAiResponse] = useState(null);
    const [selectedChart, setSelectedChart] = useState(null); // To track which chart is selected
    const data = useFetchData(); // Fetch data for charts

    const handleSubmitData = (data) => {
        setUserInput(data);
        setMetric(true);
    };

    const handleAiResponse = (response) => {
        setAiResponse(response);
    };

    const handleChartSelection = (param) => {
        setSelectedChart(param);
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
        <section id="dashboard">
            <div className="Nav-container">
            <Navbar />
            </div>
            <div className="dashboard">
                <h1>Waste-to-Energy Conversion</h1>
                <div className="dashboard-container">
                <ProductForm onSubmitData={handleSubmitData} />
                {userInput && <GeminiModel userInput={userInput} onResponse={handleAiResponse} />}
                {/* {aiResponse && (
                    <div>
                        <h3>Verified Response:</h3>
                        <pre>{JSON.stringify(aiResponse, null, 2)}</pre>
                    </div>
                )} */}</div>
                {metric && (
    <>
    <div style={{

borderRadius:'20px'
    }}>
        <h2>Performance Metrics Over Time</h2>
        {data && data.length > 0 ? (
            <div className="charts-container">
                <div className="chart-buttons">
                    {parameters1.map((param) => (
                        <button key={param} onClick={() => handleChartSelection(param)}>
                            <FaChartLine /> {param.replace(/_/g, " ")}
                        </button>
                    ))}
                    {parameters2.map((param) => (
                        <button key={param} onClick={() => handleChartSelection(param)}>
                            <FaChartPie /> {param.replace(/_/g, " ")}
                        </button>
                    ))}
                    {parameters3.map((param) => (
                        <button key={param} onClick={() => handleChartSelection(param)}>
                            <FaChartArea /> {param.replace(/_/g, " ")}
                        </button>
                    ))}
                </div>
                <div className="selected-chart">
                    {selectedChart && (
                        <>
                            {parameters1.includes(selectedChart) && (
                                <LineChartComponent
                                    data={[
                                        {
                                            id: selectedChart,
                                            data: data.map((entry) => ({
                                                x: entry.date,
                                                y: entry[selectedChart] ? parseFloat(entry[selectedChart]) : 0,
                                            })),
                                        },
                                    ]}
                                    title={selectedChart.replace(/_/g, " ")}
                                />
                            )}
                            {parameters2.includes(selectedChart) && (
                                <RadialBarChartComponent
                                    data={[
                                        {
                                            id: selectedChart,
                                            data: data
                                                .map((entry) => ({
                                                    x: entry.date,
                                                    y: typeof entry[selectedChart] === "number" &&
                                                    !isNaN(entry[selectedChart])
                                                        ? entry[selectedChart]
                                                        : 0,
                                                }))
                                                .filter((item) => item.y !== null && item.y !== undefined),
                                        },
                                    ]}
                                    title={selectedChart.replace(/_/g, " ")}
                                />
                            )}
                            {parameters3.includes(selectedChart) && (
                                <MarimekkoChartComponent
                                    data={data.map((entry) => ({
                                        category: entry.date,
                                        [selectedChart]: entry[selectedChart]
                                            ? parseFloat(entry[selectedChart])
                                            : 0,
                                    }))}
                                    title={selectedChart.replace(/_/g, " ")}
                                />
                            )}
                        </>
                    )}
                </div>
            </div>
        ) : (
            <p>Loading data or no data available...</p>
        )}
        </div>
    </>
)}

                
            </div>
        </section>
    );
};

export default Dashboard;