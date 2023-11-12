import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const BargraphSection = (props) => {
  const { initialProductBarChart, selectedMonth } = props;
  return (
    <div className="container">
      <h1 className="Product-statistics">
        Bar Chart statistics - <span className="spanelt">{selectedMonth}</span>
      </h1>
      <div className="">
        <BarChart width={730} height={250} data={initialProductBarChart}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="range" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="items" fill="#8884d8" />
        </BarChart>
      </div>
    </div>
  );
};

export default BargraphSection;
