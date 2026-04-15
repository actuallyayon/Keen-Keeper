"use client";

import { useTimeline } from "@/hooks/useTimeline";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from "recharts";
import { BarChart3, PieChart as PieIcon } from "lucide-react";

export default function StatsPage() {
  const { timeline, loading } = useTimeline();

  const dataMap = timeline.reduce((acc, curr) => {
    acc[curr.type] = (acc[curr.type] || 0) + 1;
    return acc;
  }, { call: 0, text: 0, video: 0 });

  const hasData = timeline.length > 0;

  const chartData = [
    { name: "Call", value: dataMap.call, color: "#1a3b2e" },
    { name: "Text", value: dataMap.text, color: "#8b5cf6" },
    { name: "Video", value: dataMap.video, color: "#10b981" },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-gray-900 mb-12">Friendship Analytics</h1>

      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 md:p-12">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 bg-primary-dark/5 rounded-xl flex items-center justify-center">
            <PieIcon className="w-5 h-5 text-primary-dark" />
          </div>
          <h2 className="text-xl font-bold text-gray-800">By Interaction Type</h2>
        </div>

        {loading ? (
          <div className="h-[400px] flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-dark"></div>
          </div>
        ) : !hasData ? (
          <div className="h-[400px] flex flex-col items-center justify-center text-center px-6">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
              <BarChart3 className="w-10 h-10 text-gray-200" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">No analytics available yet</h3>
            <p className="text-gray-400 max-w-sm text-sm">
              Log some interactions with your friends to see the distribution of your check-ins here.
            </p>
          </div>
        ) : (
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      className="hover:opacity-80 transition-opacity outline-none"
                    />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '16px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    padding: '12px 16px'
                  }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Legend 
                  verticalAlign="bottom" 
                  height={36} 
                  iconType="circle"
                  formatter={(value) => <span className="text-xs font-bold text-gray-500 ml-1">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {chartData.map((item) => (
          <div 
            key={item.name}
            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }} 
              />
              <span className="text-sm font-bold text-gray-700">{item.name}s</span>
            </div>
            <span className="text-2xl font-black text-primary-dark">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
