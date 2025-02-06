import { ResponsiveLine } from "@nivo/line";

const LineChartComponent = ({ data, title }) => {
    return (
        <div className="chart" style={{ height: "400px", width: "80%", marginBottom: "7rem", marginTop: "1rem" }}>
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{ type: "linear", min: "auto", max: "auto", stacked: false, reverse: false }}
                axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: "Date", legendOffset: 36, legendPosition: "middle" }}
                axisLeft={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: title, legendOffset: -50, legendPosition: "middle" }}
                colors={{ scheme: "dark2" }}
                lineWidth={2}
                pointSize={8}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabel="y"
                useMesh={true}
                enableArea={true}
                areaOpacity={0.4}
                theme={{
                    area: {
                        color: "#62825D",
                    },
                }}
            />
            <h3>{title}</h3>
        </div>
    );
};

export default LineChartComponent;
