/* eslint-disable react/prop-types */
import { ResponsiveRadar } from "@nivo/radar";

const RadarChart = ({ data }) => {
    if (!data) {
        return <div>Loading...</div>;
    }

    const radarData = [
        { "subject": "Energy Generated (kWh)", "value": data["Energy Generated (kWh)"] },
        { "subject": "Waste Diverted (kg)", "value": data["Waste Diverted from Landfill (kg)"] },
        { "subject": "Pollution Reduction (CO2 kg)", "value": data["Pollution Reduction (CO2 emissions in kg)"] },
        { "subject": "Water Saved (L)", "value": data["Water Saved (Kilo liters)"] },
        { "subject": "Methane Emissions (kg CH₄)", "value": data["Methane Emissions Prevented (kg CH4)"] },
        { "subject": "Compost Created (kg)", "value": data["Compost Created (kg)"] },
        { "subject": "Biogas Produced (m³)", "value": data["Biogas Produced (m^3)"] },
        { "subject": "Odor Reduction (%)", "value": data["Odor Reduction (%)"] },
        { "subject": "Reduction in Fossil Fuel Usage", "value": data["Reduction in Fossil Fuel Usage (liters or kWh equivalent)"] },
    ];

    return (
        <div style={{ height: "500px" }}>
            <ResponsiveRadar
                data={radarData}
                keys={["value"]}
                indexBy="subject"
                maxValue={Math.max(...radarData.map((item) => item.value))}
                margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
                curve="catmullRom"
                borderWidth={2}
                gridShape="linear"
                gridLabelOffset={36}
                dotSize={10}
                dotColor="rgba(255, 255, 255, 0.8)"
                dotBorderWidth={2}
                enableDots={true}
                colors={{ scheme: "nivo" }}
                fillOpacity={0.25}
                motionConfig="wobbly"
                legends={[
                    {
                        anchor: "top-left",
                        direction: "column",
                        translateX: -40,
                        translateY: -10,
                        itemWidth: 100,
                        itemHeight: 20,
                        itemsSpacing: 5,
                        symbolSize: 12,
                        symbolShape: "circle",
                    },
                ]}
            />
        </div>
    );
};

export default RadarChart;