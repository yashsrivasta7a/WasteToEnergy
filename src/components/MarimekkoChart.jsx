import React from "react";
import { ResponsiveRadar } from "@nivo/radar";

const RadarChartComponent = ({ data, title }) => {
    if (!data || data.length === 0) {
        return <p>No data available for {title}</p>;
    }

    return (
        <div className="chart" style={{ height: 400, width: '50%', marginBottom: "7rem" }}>
            <ResponsiveRadar
                data={data}
                keys={Object.keys(data[0]).filter(key => key !== "category")} // Use all keys except "category"
                indexBy="category" // X-axis labels
                maxValue="auto"
                margin={{ top: 50, right: 80, bottom: 50, left: 80 }}
                curve="linear"
                borderWidth={2}
                borderColor={{ from: "color" }}
                gridLevels={5}
                gridShape="circular"
                colors={{ scheme: "dark2" }}
                dotSize={8}
                dotColor={{ theme: "background" }}
                dotBorderWidth={2}
                dotBorderColor={{ from: "color" }}
                enableDotLabel={true}
                dotLabelYOffset={-12}
                fillOpacity={0.25}
                blendMode="multiply"
                legends={[
                    {
                        anchor: "top-left",
                        direction: "column",
                        translateX: -50,
                        itemWidth: 80,
                        itemHeight: 20,
                        itemTextColor: "#999",
                        symbolSize: 12,
                        symbolShape: "circle",
                    },
                ]}
            />
            <h3 className="text-center mb-4 text-lg font-semibold">{title}</h3>
        </div>
    );
};

export default RadarChartComponent;