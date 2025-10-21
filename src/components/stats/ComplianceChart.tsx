import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function ComplianceChart() {
  const stats = useQuery(api.functions.statistics.getStats, {});

  const chartData = stats?.complianceTrend?.map((rating, index) => ({
    day: `Day ${index + 1}`,
    rating,
  })) || [];

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
      <h3 className="text-lg font-semibold mb-4">Compliance Trend</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="day" stroke="#9CA3AF" />
            <YAxis domain={[1, 5]} stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: '1px solid #374151',
                borderRadius: '6px',
                color: '#F9FAFB',
              }}
            />
            <Line
              type="monotone"
              dataKey="rating"
              stroke="#10B981"
              strokeWidth={2}
              dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
