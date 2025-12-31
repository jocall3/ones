import React, { useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  TooltipProps
} from 'recharts';

interface BookData {
  id: string;
  title: string;
  wordCount: number;
  generationDate: string;
  seriesIndex: number;
}

interface WordCountChartProps {
  books?: BookData[];
  className?: string;
  color?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload as BookData;
    return (
      <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-md text-sm">
        <p className="font-bold text-gray-800">{`Book #${data.seriesIndex}: ${data.title}`}</p>
        <p className="text-blue-600">{`Word Count: ${data.wordCount.toLocaleString()}`}</p>
        <p className="text-gray-500 text-xs">{`Generated: ${new Date(data.generationDate).toLocaleDateString()}`}</p>
      </div>
    );
  }
  return null;
};

const WordCountChart: React.FC<WordCountChartProps> = ({ 
  books = [], 
  className = "h-96 w-full",
  color = "#2563eb"
}) => {
  
  // If no data is provided, generate a sample dataset representing the "1000 books" goal
  const chartData = useMemo(() => {
    if (books.length > 0) return books;

    // Mock data generation for visualization purposes if props are empty
    return Array.from({ length: 50 }, (_, i) => {
      const baseCount = 50000; // Standard novel length
      const variance = Math.floor(Math.random() * 15000) - 7500;
      return {
        id: `book-${i + 1}`,
        title: `The AI Banker Vol. ${i + 1}`,
        wordCount: baseCount + variance + (i * 100), // Slight upward trend
        generationDate: new Date(Date.now() - (50 - i) * 86400000).toISOString(),
        seriesIndex: i + 1,
      };
    });
  }, [books]);

  const averageWordCount = useMemo(() => {
    if (chartData.length === 0) return 0;
    const total = chartData.reduce((acc, curr) => acc + curr.wordCount, 0);
    return Math.round(total / chartData.length);
  }, [chartData]);

  return (
    <div className={`bg-white p-6 rounded-lg shadow-sm ${className}`}>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Literary Output Analysis</h2>
        <p className="text-sm text-gray-500">Tracking word count progression across the James AI Bank Saga</p>
        <div className="mt-2 flex gap-4">
          <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
            Total Books: {chartData.length}
          </div>
          <div className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
            Avg Length: {averageWordCount.toLocaleString()} words
          </div>
        </div>
      </div>

      <div className="w-full h-[300px] min-h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="seriesIndex" 
              label={{ value: 'Book Series Order', position: 'insideBottomRight', offset: -5 }} 
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              label={{ value: 'Word Count', angle: -90, position: 'insideLeft' }} 
              tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
              domain={['auto', 'auto']}
              tick={{ fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="top" height={36} />
            <Line
              type="monotone"
              dataKey="wordCount"
              name="Word Count per Volume"
              stroke={color}
              strokeWidth={2}
              dot={chartData.length < 100} // Hide dots if too many data points
              activeDot={{ r: 6 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default WordCountChart;