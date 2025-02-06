import { ResponsiveLine } from "@nivo/line";

const LineChartComponent = ({ data, title }) => {
    return (
        <div style={{ height: "300px", width: "100%", marginBottom: "30px" }}>
            <h3>{title}</h3>
            <ResponsiveLine
                data={data}
                margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
                xScale={{ type: "point" }}
                yScale={{ type: "linear", min: "auto", max: "auto", stacked: false, reverse: false }}
                axisBottom={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: "Date", legendOffset: 36, legendPosition: "middle" }}
                axisLeft={{ tickSize: 5, tickPadding: 5, tickRotation: 0, legend: title, legendOffset: -50, legendPosition: "middle" }}
                colors={{ scheme: "category10" }}
                lineWidth={2}
                pointSize={8}
                pointColor={{ theme: "background" }}
                pointBorderWidth={2}
                pointBorderColor={{ from: "serieColor" }}
                pointLabel="y"
                useMesh={true}
            />
        </div>
    );
};

export default LineChartComponent;