import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["#4ade80", "#f87171", "#facc15"]; // green, red, yellow

const ResultChart = ({ result }) => {
  const data = [
    { name: "Correct", value: result.correct },
    { name: "Wrong", value: result.wrong },
    { name: "Unattempted", value: result.unattempted },
  ];

  return (
    <div className="flex justify-center">
      <PieChart width={200} height={300}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default ResultChart;
