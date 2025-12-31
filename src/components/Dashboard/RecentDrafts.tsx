import React from 'react';
import { FiBook, FiFilm, FiClock, FiChevronRight } from 'react-icons/fi';

/**
 * Defines the structure for a single draft or work-in-progress.
 */
interface Draft {
  id: string;
  title: string;
  type: 'Book' | 'Movie';
  lastModified: Date;
  status: 'Draft' | 'Generating' | 'Review';
  snippet: string;
}

// Mock data for recent drafts. In a real application, this would be fetched from an API.
const mockDrafts: Draft[] = [
  {
    id: 'dft-001',
    title: 'The Turing Bank: Chapter 1',
    type: 'Book',
    lastModified: new Date(Date.now() - 1 * 60 * 60 * 1000), // 1 hour ago
    status: 'Draft',
    snippet: 'James stared at the flickering cursor, the genesis of his AI bank, codenamed "Aethelred," humming softly on the server rack beside him...',
  },
  {
    id: 'dft-002',
    title: 'Mermaid Heist - Scene Outline',
    type: 'Movie',
    lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    status: 'Review',
    snippet: 'INT. DATA CENTER - NIGHT. A complex Mermaid diagram is projected onto a glass wall, detailing the AI bank\'s security protocols...',
  },
  {
    id: 'dft-003',
    title: 'The Ghost in the Ledger',
    type: 'Book',
    lastModified: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    status: 'Generating',
    snippet: 'A mysterious transaction appears in the AI bank\'s immutable ledger, a digital ghost that defies all logic. James must unravel the puzzle...',
  },
];

/**
 * A simple utility to format time since a date into a human-readable string.
 * @param date The date to compare against the current time.
 * @returns A string like "5 minutes ago".
 */
const timeSince = (date: Date): string => {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return "Just now";
};

/**
 * Returns Tailwind CSS classes for a status badge based on the draft's status.
 * @param status The status of the draft.
 * @returns A string of CSS classes.
 */
const getStatusColor = (status: Draft['status']): string => {
  switch (status) {
    case 'Draft':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
    case 'Generating':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
    case 'Review':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
  }
};

/**
 * Renders an icon corresponding to the draft type.
 */
const DraftTypeIcon: React.FC<{ type: Draft['type'] }> = ({ type }) => {
  const commonClasses = "h-6 w-6 text-gray-400 dark:text-gray-500";
  switch (type) {
    case 'Book':
      return <FiBook className={commonClasses} aria-label="Book draft" />;
    case 'Movie':
      return <FiFilm className={commonClasses} aria-label="Movie draft" />;
    default:
      return null;
  }
};

/**
 * RecentDrafts component displays a list of works-in-progress.
 * It allows users to quickly resume their work on recent projects.
 */
const RecentDrafts: React.FC = () => {
  // In a real app, this data would be fetched from an API,
  // likely using a data fetching library like React Query or SWR.
  const [drafts] = React.useState<Draft[]>(mockDrafts);

  const handleDraftClick = (id: string) => {
    // This function would handle navigation to the specific editor page for the draft.
    // For this example, we'll just log to the console.
    console.log(`Opening editor for draft with ID: ${id}`);
    // Example navigation: router.push(`/editor/${id}`);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Works in Progress</h2>
        <a href="/drafts" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
          View All
        </a>
      </div>
      {drafts.length > 0 ? (
        <ul className="space-y-3">
          {drafts.map((draft) => (
            <li key={draft.id}>
              <button
                onClick={() => handleDraftClick(draft.id)}
                className="w-full text-left p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75 transition-all duration-200"
                aria-label={`Open draft: ${draft.title}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-start min-w-0">
                    <div className="flex-shrink-0 pt-1">
                      <DraftTypeIcon type={draft.type} />
                    </div>
                    <div className="ml-4 min-w-0">
                      <p className="font-semibold text-gray-900 dark:text-white truncate">{draft.title}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">{draft.snippet}</p>
                    </div>
                  </div>
                  <FiChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500 ml-4 flex-shrink-0" />
                </div>
                <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                   <div className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${getStatusColor(draft.status)}`}>
                      {draft.status}
                   </div>
                   <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                      <FiClock className="h-3 w-3 mr-1.5" />
                      <span>{timeSince(draft.lastModified)}</span>
                   </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center py-10 px-4 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">No Drafts Yet</h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Start a new project to see your works-in-progress here.
          </p>
          <button className="mt-4 px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-800 focus:ring-indigo-500">
            Create New Project
          </button>
        </div>
      )}
    </div>
  );
};

export default RecentDrafts;