import React, { PureComponent } from "react";
import { PieChart, Pie, Cell } from "recharts";
import "./index.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default class PieChartModule extends PureComponent {
  static demoUrl =
    "https://codesandbox.io/s/pie-chart-with-customized-label-dlhhj";

  render() {
    const { data, selectedMonth } = this.props;
    return (
      <div width="100%" height="100%">
        <h1 className="Product-statistics">
          Pie Chart statistics -{" "}
          <span className="spanelt">{selectedMonth}</span>
        </h1>

        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="items"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
          {data.length !== 0 && (
            <div className="pie-chart-variables">
              <p style={{ backgroundColor: COLORS[0] }}>men's clothing</p>
              <p style={{ backgroundColor: COLORS[1] }}>jewelry</p>
              <p style={{ backgroundColor: COLORS[2] }}>electronics</p>
              <p style={{ backgroundColor: COLORS[3] }}>women's clothing</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
