import React ,{useState, useEffect} from "react";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const COLORS = ["#4ade80", "#f87171", "#facc15"]; // green, red, yellow

const ResultChart = ({ result }) => {
  const data = [
    { name: "Correct", value: result.correct },
    { name: "Wrong", value: result.wrong },
    { name: "Unattempted", value: result.unattempted },
  ];

   const [chartSize, setChartSize] = useState({
    width: 200,
    height: 300,
    radius: 100,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 450) {
        setChartSize({ width: 160, height: 270, radius: 60 });
      }
       else if (width <= 390) {
        setChartSize({ width: 120, height: 220, radius: 20 });
      }
      else {
        setChartSize({ width: 200, height: 300, radius: 100 });
      }
    };

    handleResize(); // run on first load
    window.addEventListener("resize", handleResize); // run on resize

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex justify-center">
      <PieChart width={chartSize.width} height={chartSize.height}>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={chartSize.radius}
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
