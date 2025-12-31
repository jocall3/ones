import React from 'react';
import { BookOpen, FileText, TrendingUp, Zap, Activity, Award } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  color: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, trend, trendUp, color }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
    <div className="flex justify-between items-start">
      <div>
        <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        {React.cloneElement(icon as React.ReactElement, { className: `w-6 h-6 ${color.replace('bg-', 'text-')}` })}
      </div>
    </div>
    {trend && (
      <div className="mt-4 flex items-center text-sm">
        <span className={`flex items-center font-medium ${trendUp ? 'text-green-600' : 'text-red-600'}`}>
          {trendUp ? <TrendingUp className="w-4 h-4 mr-1" /> : <Activity className="w-4 h-4 mr-1" />}
          {trend}
        </span>
        <span className="text-gray-400 ml-2">vs yesterday</span>
      </div>
    )}
  </div>
);

interface WriterStatsProps {
  dailyWordCount?: number;
  dailyBookCount?: number;
  totalBooks?: number;
  aiEfficiency?: number;
}

const WriterStats: React.FC<WriterStatsProps> = ({
  dailyWordCount = 45200,
  dailyBookCount = 12,
  totalBooks = 143,
  aiEfficiency = 98.5
}) => {
  const goalBooks = 1000;
  const progressPercentage = (totalBooks / goalBooks) * 100;

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-gray-800">AI Writer Performance</h2>
        <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Live Updates
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Words Written Today"
          value={dailyWordCount.toLocaleString()}
          icon={<FileText />}
          trend="+12.5%"
          trendUp={true}
          color="bg-blue-500"
        />
        <StatCard
          title="Books Generated Today"
          value={dailyBookCount}
          icon={<BookOpen />}
          trend="+2"
          trendUp={true}
          color="bg-indigo-500"
        />
        <StatCard
          title="AI Efficiency"
          value={`${aiEfficiency}%`}
          icon={<Zap />}
          trend="+0.4%"
          trendUp={true}
          color="bg-amber-500"
        />
        <StatCard
          title="Total Library Size"
          value={totalBooks}
          icon={<Award />}
          trend="Project Goal: 1000"
          trendUp={true}
          color="bg-emerald-500"
        />
      </div>

      {/* Project Goal Progress */}
      <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Project Goal: The James AI Bank Chronicles</h3>
            <p className="text-sm text-gray-500 mt-1">Targeting 1,000 Mystery Novels (Clean/No Violence)</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-indigo-600">{totalBooks}</span>
            <span className="text-gray-400 text-lg"> / {goalBooks}</span>
          </div>
        </div>
        
        <div className="relative w-full h-4 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        <div className="flex justify-between mt-2 text-xs text-gray-400 font-medium">
          <span>Start</span>
          <span>{progressPercentage.toFixed(1)}% Complete</span>
          <span>Goal</span>
        </div>
      </div>
    </div>
  );
};

export default WriterStats;