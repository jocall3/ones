import React, { useState, useEffect, useMemo } from 'react';
import { 
  BookOpen, 
  Activity, 
  Share2, 
  ShieldCheck, 
  TrendingUp, 
  Database, 
  Search,
  FileText,
  PieChart
} from 'lucide-react';

// --- Types ---

interface BookMetric {
  id: string;
  title: string;
  mysteryDensity: number; // 0 to 100 score based on plot twists/pacing
  graphCount: number; // Number of mermaid graphs generated
  aiBankReferences: number; // Frequency of core theme
  cleanlinessScore: number; // 0 to 100, should be consistently high
  wordCount: number;
  publishDate: string;
}

interface DashboardStat {
  label: string;
  value: string | number;
  change: number; // Percentage change
  icon: React.ElementType;
  color: string;
}

// --- Mock Data Generator ---

const generateMockData = (): BookMetric[] => {
  const titles = [
    "The Ledger Protocol", "The Algorithm's Secret", "James and the Zero-Knowledge Proof",
    "The Digital Vault", "Cipher of the AI", "The Banking Paradox",
    "Code of Silence", "The Neural Network Enigma", "Transaction: Infinity",
    "The Quantum Deposit", "The Blockchain Deception", "James: Architect of Trust"
  ];

  return Array.from({ length: 12 }).map((_, i) => ({
    id: `bk_${1000 + i}`,
    title: titles[i % titles.length],
    mysteryDensity: Math.floor(Math.random() * (98 - 85) + 85), // High mystery
    graphCount: Math.floor(Math.random() * (15 - 5) + 5),
    aiBankReferences: Math.floor(Math.random() * (50 - 20) + 20),
    cleanlinessScore: 100, // Strict requirement
    wordCount: Math.floor(Math.random() * (60000 - 40000) + 40000),
    publishDate: new Date(Date.now() - i * 86400000).toISOString().split('T')[0],
  }));
};

// --- Components ---

const StatCard: React.FC<DashboardStat> = ({ label, value, change, icon: Icon, color }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
    <div className="flex items-center justify-between mb-4">
      <div className={`p-3 rounded-lg ${color} bg-opacity-10`}>
        <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
      </div>
      <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'} flex items-center`}>
        {change >= 0 ? '+' : ''}{change}%
        <TrendingUp className="w-3 h-3 ml-1" />
      </span>
    </div>
    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">{label}</h3>
    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
  </div>
);

const SimpleLineChart: React.FC<{ data: number[]; color: string; height?: number }> = ({ data, color, height = 60 }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  
  const points = data.map((val, index) => {
    const x = (index / (data.length - 1)) * 100;
    const y = 100 - ((val - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full overflow-hidden" style={{ height: `${height}px` }}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
          vectorEffect="non-scaling-stroke"
        />
        <path
          d={`M0,100 L0,${100 - ((data[0] - min) / range) * 100} ${points.replace(/,/g, ' ')} L100,100 Z`}
          fill={color}
          fillOpacity="0.1"
        />
      </svg>
    </div>
  );
};

const MetricBar: React.FC<{ label: string; value: number; max: number; colorClass: string }> = ({ label, value, max, colorClass }) => (
  <div className="mb-4">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <span className="text-sm font-medium text-gray-500">{value} / {max}</span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div 
        className={`h-2.5 rounded-full ${colorClass}`} 
        style={{ width: `${Math.min((value / max) * 100, 100)}%` }}
      ></div>
    </div>
  </div>
);

const LiteraryAnalysis: React.FC = () => {
  const [books, setBooks] = useState<BookMetric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setBooks(generateMockData());
      setLoading(false);
    }, 800);
  }, []);

  const stats = useMemo(() => {
    if (books.length === 0) return null;
    
    const totalBooks = 1000; // Goal
    const currentBooks = books.length; // Mocked current count
    const avgMystery = Math.round(books.reduce((acc, b) => acc + b.mysteryDensity, 0) / books.length);
    const totalGraphs = books.reduce((acc, b) => acc + b.graphCount, 0);
    const avgCleanliness = books.reduce((acc, b) => acc + b.cleanlinessScore, 0) / books.length;

    return {
      totalBooks,
      currentBooks,
      avgMystery,
      totalGraphs,
      avgCleanliness
    };
  }, [books]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-xl">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50 min-h-screen font-sans">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Literary Analysis Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Tracking the generation of the "James AI Bank" Mystery Series. 
          Target: 1,000 Books. Style: Dan Brown (Clean).
        </p>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          label="Books Generated" 
          value={`${stats?.currentBooks} / ${stats?.totalBooks}`} 
          change={12.5} 
          icon={BookOpen} 
          color="bg-indigo-600" 
        />
        <StatCard 
          label="Avg Mystery Density" 
          value={`${stats?.avgMystery}/100`} 
          change={2.4} 
          icon={Search} 
          color="bg-purple-600" 
        />
        <StatCard 
          label="Mermaid Graphs" 
          value={stats?.totalGraphs || 0} 
          change={8.1} 
          icon={Share2} 
          color="bg-blue-500" 
        />
        <StatCard 
          label="Cleanliness Score" 
          value={`${stats?.avgCleanliness}%`} 
          change={0} 
          icon={ShieldCheck} 
          color="bg-green-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart Section */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-800 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-indigo-600" />
              Narrative Tension & Graph Complexity
            </h2>
            <div className="flex space-x-2">
              <span className="px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">Mystery</span>
              <span className="px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Graphs</span>
            </div>
          </div>
          
          <div className="space-y-8">
            <div>
              <p className="text-xs text-gray-500 mb-2 uppercase font-semibold">Mystery Density (Last 12 Books)</p>
              <SimpleLineChart data={books.map(b => b.mysteryDensity)} color="#7c3aed" height={100} />
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-2 uppercase font-semibold">Graph Count per Book</p>
              <SimpleLineChart data={books.map(b => b.graphCount)} color="#3b82f6" height={100} />
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="text-sm text-gray-500">Avg Word Count</div>
              <div className="text-xl font-bold text-gray-800">52,400</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="text-sm text-gray-500">AI Bank Refs/Book</div>
              <div className="text-xl font-bold text-gray-800">34.2</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="text-sm text-gray-500">Compliance Checks</div>
              <div className="text-xl font-bold text-green-600">Passed</div>
            </div>
          </div>
        </div>

        {/* Recent Books List */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-6 flex items-center">
            <Database className="w-5 h-5 mr-2 text-indigo-600" />
            Recent Generations
          </h2>
          <div className="space-y-6">
            {books.slice(0, 5).map((book) => (
              <div key={book.id} className="group">
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-sm font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                    {book.title}
                  </h4>
                  <span className="text-xs text-gray-400">{book.publishDate}</span>
                </div>
                <p className="text-xs text-gray-500 mb-2">ID: {book.id}</p>
                
                <div className="space-y-2">
                  <div className="flex items-center text-xs">
                    <span className="w-24 text-gray-500">Mystery:</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-purple-500 rounded-full" 
                        style={{ width: `${book.mysteryDensity}%` }}
                      />
                    </div>
                    <span className="ml-2 font-medium text-gray-700">{book.mysteryDensity}</span>
                  </div>
                  
                  <div className="flex items-center text-xs">
                    <span className="w-24 text-gray-500">Mermaid Graphs:</span>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 rounded-full" 
                        style={{ width: `${(book.graphCount / 20) * 100}%` }}
                      />
                    </div>
                    <span className="ml-2 font-medium text-gray-700">{book.graphCount}</span>
                  </div>
                </div>
                
                <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between items-center">
                  <div className="flex space-x-2">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      Clean
                    </span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                      <FileText className="w-3 h-3 mr-1" />
                      PDF
                    </span>
                  </div>
                  <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                    View Graphs &rarr;
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-6 py-2 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            View All 1,000 Books
          </button>
        </div>
      </div>

      {/* Content Analysis Section */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-md font-bold text-gray-800 mb-4 flex items-center">
            <PieChart className="w-4 h-4 mr-2 text-gray-500" />
            Theme Distribution
          </h3>
          <div className="space-y-4">
            <MetricBar label="AI Banking Infrastructure" value={92} max={100} colorClass="bg-indigo-500" />
            <MetricBar label="Cryptographic Mysteries" value={88} max={100} colorClass="bg-purple-500" />
            <MetricBar label="James's Backstory" value={45} max={100} colorClass="bg-blue-400" />
            <MetricBar label="Ethical Dilemmas" value={76} max={100} colorClass="bg-teal-500" />
          </div>
        </div>

        <div className="bg-indigo-900 p-6 rounded-xl shadow-sm text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-lg font-bold mb-2">Project Status: Active</h3>
            <p className="text-indigo-200 text-sm mb-6">
              Generating book #13: "The Zero-Day Asset". 
              Mermaid graph generation for Chapter 4 is in progress.
            </p>
            
            <div className="flex items-center justify-between text-sm mb-1">
              <span>Overall Progress</span>
              <span>1.2% (12/1000)</span>
            </div>
            <div className="w-full bg-indigo-800 rounded-full h-3 mb-6">
              <div className="bg-white h-3 rounded-full" style={{ width: '1.2%' }}></div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-indigo-800 bg-opacity-50 p-3 rounded-lg">
                <div className="text-xs text-indigo-300 uppercase">Next Milestone</div>
                <div className="font-semibold">50 Books</div>
              </div>
              <div className="bg-indigo-800 bg-opacity-50 p-3 rounded-lg">
                <div className="text-xs text-indigo-300 uppercase">Est. Completion</div>
                <div className="font-semibold">14 Days</div>
              </div>
            </div>
          </div>
          
          {/* Decorative background element */}
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-indigo-700 rounded-full opacity-50 blur-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default LiteraryAnalysis;