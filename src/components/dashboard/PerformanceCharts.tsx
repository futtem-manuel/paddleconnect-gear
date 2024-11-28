import { Line, LineChart, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell } from "recharts";

interface PerformanceChartsProps {
  performanceData: Array<{ date: string; rating: number }>;
  winLossData: { wins: number; losses: number };
}

export const PerformanceCharts = ({ performanceData, winLossData }: PerformanceChartsProps) => {
  const winLossChartData = [
    { name: "Wins", value: winLossData.wins },
    { name: "Losses", value: winLossData.losses },
  ];
  const COLORS = ["#57C5CE", "#EF4444"];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="neu-card">
        <CardHeader>
          <CardTitle>Performance Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full">
            <LineChart 
              data={performanceData}
              margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              width={400}
              height={250}
            >
              <XAxis dataKey="date" />
              <YAxis domain={[1, 7]} />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#57C5CE"
                strokeWidth={2}
                dot={{ strokeWidth: 2 }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="rounded-lg border bg-background p-2 shadow-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <span className="font-medium">{label}</span>
                          <span className="font-medium">
                            {payload[0].value}
                          </span>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
            </LineChart>
          </div>
        </CardContent>
      </Card>

      <Card className="neu-card">
        <CardHeader>
          <CardTitle>Wins vs Losses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full flex items-center justify-center">
            <PieChart width={250} height={250}>
              <Pie
                data={winLossChartData}
                cx={125}
                cy={125}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {winLossChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};