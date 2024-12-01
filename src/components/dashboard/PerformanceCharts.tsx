import { Line, LineChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell } from "recharts";
import { useWindowSize } from "@/hooks/useWindowSize";

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
  const { width } = useWindowSize();
  const isMobile = width ? width < 768 : false;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="neu-card">
        <CardHeader>
          <CardTitle>Rank Evolution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart 
                data={performanceData}
                margin={{ 
                  top: 20, 
                  right: isMobile ? 10 : 20, 
                  left: isMobile ? 10 : 20, 
                  bottom: 20 
                }}
              >
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: isMobile ? 12 : 14 }}
                  interval={isMobile ? 1 : 0}
                />
                <YAxis 
                  domain={[1, 7]} 
                  tick={{ fontSize: isMobile ? 12 : 14 }}
                />
                <Line
                  type="monotone"
                  dataKey="rating"
                  stroke="#57C5CE"
                  strokeWidth={2}
                  dot={{ strokeWidth: 2 }}
                />
                <Tooltip />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="neu-card">
        <CardHeader>
          <CardTitle>Wins vs Losses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[250px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={winLossChartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={isMobile ? 40 : 60}
                  outerRadius={isMobile ? 60 : 80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {winLossChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};