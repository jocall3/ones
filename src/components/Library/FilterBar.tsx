import React from 'react';
import { Search, Calendar, Activity, Brain, X } from 'lucide-react';

export interface FilterState {
  searchQuery: string;
  mysteryLevel: 'all' | 'low' | 'medium' | 'high';
  graphComplexity: 'all' | 'simple' | 'intermediate' | 'complex';
  sortBy: 'newest' | 'oldest' | 'complexity_asc' | 'complexity_desc';
}

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  className?: string;
}

const FilterBar: React.FC<FilterBarProps> = ({ filters, onFilterChange, className = '' }) => {
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({ ...filters, searchQuery: e.target.value });
  };

  const handleSelectChange = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const clearSearch = () => {
    onFilterChange({ ...filters, searchQuery: '' });
  };

  return (
    <div className={`w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-4 sticky top-0 z-10 shadow-sm ${className}`}>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 items-center justify-between">
        
        {/* Search Input Area */}
        <div className="relative w-full lg:w-1/3 group">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-10 py-2.5 border border-slate-300 dark:border-slate-700 rounded-lg leading-5 bg-slate-50 dark:bg-slate-800 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent sm:text-sm text-slate-900 dark:text-slate-100 transition duration-150 ease-in-out"
            placeholder="Search for James's AI Bank adventures..."
            value={filters.searchQuery}
            onChange={handleSearchChange}
          />
          {filters.searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Filters & Sort Group */}
        <div className="flex flex-col sm:flex-row w-full lg:w-auto gap-3">
          
          {/* Mystery Level Filter */}
          <div className="relative min-w-[180px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Brain className="h-4 w-4 text-slate-500" />
            </div>
            <select
              value={filters.mysteryLevel}
              onChange={(e) => handleSelectChange('mysteryLevel', e.target.value)}
              className="appearance-none block w-full pl-10 pr-8 py-2.5 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <option value="all">All Mystery Levels</option>
              <option value="low">Low (Basic Audit)</option>
              <option value="medium">Medium (System Glitch)</option>
              <option value="high">High (Deep Conspiracy)</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          {/* Graph Complexity Filter */}
          <div className="relative min-w-[180px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Activity className="h-4 w-4 text-slate-500" />
            </div>
            <select
              value={filters.graphComplexity}
              onChange={(e) => handleSelectChange('graphComplexity', e.target.value)}
              className="appearance-none block w-full pl-10 pr-8 py-2.5 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <option value="all">All Graph Types</option>
              <option value="simple">Simple Flowcharts</option>
              <option value="intermediate">System Architecture</option>
              <option value="complex">Neural Networks</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

          {/* Sort Dropdown */}
          <div className="relative min-w-[160px]">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-4 w-4 text-slate-500" />
            </div>
            <select
              value={filters.sortBy}
              onChange={(e) => handleSelectChange('sortBy', e.target.value)}
              className="appearance-none block w-full pl-10 pr-8 py-2.5 text-sm border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="complexity_asc">Least Complex</option>
              <option value="complexity_desc">Most Complex</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FilterBar;