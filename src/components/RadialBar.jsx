import React from "react";
import { ResponsiveRadialBar } from "@nivo/radial-bar";

const RadialBarChartComponent = ({ data, title }) => {
    if (!data || data.length === 0 || data[0].data.length === 0) {
        return <p>No data available for {title}</p>;
    }

    return (
        <div className="chart" style={{ height: 300, width: '40%', marginBottom: "7rem" }}>
            <ResponsiveRadialBar
                data={data}
                valueFormat=".2f" // Format values as decimals
                padding={0.4}
                innerRadius={0.5}
                enableTracks
                colors={{ scheme: 'greens' }}
                borderColor={{
                    from: "color",
                    modifiers: [["darker", 1.6]],
                }}
                radialAxisStart={null}
                circularAxisOuter={null}
                legends={[
                    {
                        anchor: "bottom",
                        direction: "row",
                        justify: false,
                        translateX: 0,
                        translateY: 60,
                        itemsSpacing: 4,
                        itemWidth: 80,
                        itemHeight: 18,
                        itemTextColor: "#999",
                        itemDirection: "left-to-right",
                        symbolSize: 18,
                        symbolShape: "circle",
                    },
                ]}
            />
            <h3 className="text-center mb-4 text-lg font-semibold">{title}</h3>
        </div>
    );
};

export default RadialBarChartComponent;