
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ComplianceChartProps {
  data: {
    compliant: number;
    nonCompliant: number;
    unknown: number;
  };
}

export const ComplianceChart = ({ data }: ComplianceChartProps) => {
  const chartData = [
    { name: "Compliant", value: data.compliant, color: "#0AB727" },
    { name: "Non-Compliant", value: data.nonCompliant, color: "#D13438" },
    { name: "Unknown", value: data.unknown, color: "#8A8886" },
  ];

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number, name: string) => [
              `${value} devices`, 
              name
            ]}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
