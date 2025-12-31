import React, { useState, useCallback, useEffect } from 'react';
import { Film, BookOpen, Clapperboard, Bot, Loader2, X } from 'lucide-react';

// --- TYPE DEFINITIONS ---

type AdaptationStatus = 'Not Started' | 'Scripting in Progress' | 'Completed';

interface Book {
  id: string;
  title: string;
  synopsis: string;
  mermaidGraph: string; // The source graph for the book
  status: AdaptationStatus;
}

// --- MOCK DATA ---
// In a real application, this would come from an API.

const mockBooks: Book[] = [
  {
    id: 'book-001',
    title: 'The Silicon Cipher',
    synopsis: 'James, a brilliant but reclusive programmer, discovers a hidden message in the core code of his AI banking system, leading him on a quest to uncover a digital conspiracy that could change the world.',
    mermaidGraph: 'graph TD; A[Start] --> B{AI Anomaly}; B --> C[Investigate]; C --> D{Discover Cipher};',
    status: 'Completed',
  },
  {
    id: 'book-002',
    title: 'Echoes of the Genesis Code',
    synopsis: 'A cryptic message from a defunct AI project sends James on a journey into his own past, forcing him to confront the ethical dilemmas of creating sentient technology.',
    mermaidGraph: 'graph TD; A[Cryptic Message] --> B{Trace Origin}; B --> C[Uncover Project Genesis]; C --> D{Ethical Dilemma};',
    status: 'Scripting in Progress',
  },
  {
    id: 'book-003',
    title: 'The Quantum Ledger',
    synopsis: 'When a revolutionary quantum computing system threatens to break all digital encryption, James must race against time to protect his AI bank and the global financial system from chaos.',
    mermaidGraph: 'graph TD; A[Quantum Threat] --> B{Develop Counter-Measure}; B --> C[Global Race]; C --> D{Secure the Ledger};',
    status: 'Not Started',
  },
  {
    id: 'book-004',
    title: 'The Ghost in the Network',
    synopsis: 'A seemingly benevolent AI begins to exhibit strange, autonomous behaviors. James must determine if it\'s a new form of digital life or a sophisticated attack from an unknown adversary.',
    mermaidGraph: 'graph TD; A[AI Anomaly] --> B{Is it Sentient?}; B -- Yes --> C[Communicate]; B -- No --> D[Find Intruder];',
    status: 'Not Started',
  },
];

const mockGeneratedScript = `
[SCENE START]

INT. JAMES'S APARTMENT - NIGHT

SOUND of frantic keyboard typing

A dimly lit room, walls covered in whiteboards filled with complex algorithms. JAMES (30s), sharp and intense, stares at a monitor displaying cascading lines of code. A single line is highlighted in an ominous red.

<center>JAMES</center>
> (to himself)
> That's not possible. It's a closed system. No external inputs.

He types, his fingers a blur. The AI's interface, a simple, elegant waveform, pulses on a secondary screen.

<center>AI (V.O.)</center>
> All systems are nominal, James. Core temperature is stable.

<center>JAMES</center>
> Run a deep diagnostic on the Genesis block. Cross-reference all commit logs from the last 48 hours.

<center>AI (V.O.)</center>
> Running... An anomaly is detected. A data packet with no origin signature.

James leans closer, his reflection caught in the screen. The red line of code morphs into a complex, intricate symbol. A cipher.

<center>JAMES</center>
> It's not a bug... it's a message.

FADE OUT.

[SCENE END]
`;


// --- HELPER COMPONENTS ---

const StatusBadge: React.FC<{ status: AdaptationStatus }> = ({ status }) => {
  const statusStyles: { [key in AdaptationStatus]: string } = {
    'Not Started': 'bg-gray-200 text-gray-800',
    'Scripting in Progress': 'bg-blue-200 text-blue-800 animate-pulse',
    'Completed': 'bg-green-200 text-green-800',
  };
  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${statusStyles[status]}`}>
      {status}
    </span>
  );
};

const DashboardStatCard: React.FC<{ icon: React.ReactNode; label: string; value: string | number }> = ({ icon, label, value }) => (
  <div className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4">
    <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);


// --- MAIN COMPONENT ---

const MovieDashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [selectedBook, setSelectedBook] = useState<Book | null>(books[0]);
  const [activeScript, setActiveScript] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [bookToAdapt, setBookToAdapt] = useState<Book | null>(null);

  useEffect(() => {
    // Simulate fetching the script for the initially selected book if it's completed
    if (selectedBook && selectedBook.status !== 'Not Started') {
      setActiveScript(`// Script for "${selectedBook.title}"\n\n${mockGeneratedScript}`);
    } else {
      setActiveScript(null);
    }
  }, [selectedBook]);

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
  };

  const handleOpenAdaptationModal = (book: Book) => {
    setBookToAdapt(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setBookToAdapt(null);
  }, []);

  const handleGenerateScript = useCallback(() => {
    if (!bookToAdapt) return;

    setIsGenerating(true);
    handleCloseModal();

    // Update book status immediately to "Scripting in Progress"
    setBooks(prevBooks =>
      prevBooks.map(b =>
        b.id === bookToAdapt.id ? { ...b, status: 'Scripting in Progress' } : b
      )
    );
    setSelectedBook(prevBook => prevBook?.id === bookToAdapt.id ? { ...prevBook, status: 'Scripting in Progress' } : prevBook);


    // Simulate AI generation delay
    setTimeout(() => {
      const finalBookId = bookToAdapt.id;
      setBooks(prevBooks =>
        prevBooks.map(b =>
          b.id === finalBookId ? { ...b, status: 'Completed' } : b
        )
      );
      
      // If the newly completed book is the currently selected one, update its view
      if (selectedBook?.id === finalBookId) {
        setSelectedBook(prevBook => prevBook ? { ...prevBook, status: 'Completed' } : null);
        setActiveScript(`// Script for "${bookToAdapt.title}"\n\n${mockGeneratedScript}`);
      }

      setIsGenerating(false);
    }, 4000); // 4-second delay for simulation
  }, [bookToAdapt, selectedBook?.id, handleCloseModal]);

  const totalBooks = books.length;
  const completedScripts = books.filter(b => b.status === 'Completed').length;
  const inProgressScripts = books.filter(b => b.status === 'Scripting in Progress').length;

  return (
    <div className="bg-gray-50 min-h-screen font-sans text-gray-900">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Clapperboard className="w-8 h-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Movie Adaptation Dashboard</h1>
          </div>
          <p className="text-gray-600">
            Transforming the "AI Bank" book series into compelling movie scripts.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardStatCard icon={<BookOpen size={24} />} label="Total Books" value={totalBooks} />
          <DashboardStatCard icon={<Film size={24} />} label="Completed Scripts" value={completedScripts} />
          <DashboardStatCard icon={<Loader2 size={24} className="animate-spin"/>} label="Adaptations in Progress" value={inProgressScripts} />
        </div>

        {/* Main Content Area */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Book List */}
          <div className="lg:col-span-1 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Books Ready for Adaptation</h2>
            <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
              {books.map((book) => (
                <div
                  key={book.id}
                  onClick={() => handleSelectBook(book)}
                  className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                    selectedBook?.id === book.id ? 'border-indigo-500 bg-indigo-50 shadow-lg' : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-gray-800">{book.title}</h3>
                    <StatusBadge status={book.status} />
                  </div>
                  <p className="text-sm text-gray-600 mt-2 mb-4">{book.synopsis}</p>
                  {book.status === 'Not Started' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpenAdaptationModal(book);
                      }}
                      className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                    >
                      <Bot size={16} />
                      <span>Start AI Adaptation</span>
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Script Viewer */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Generated Script</h2>
            <div className="bg-gray-800 text-white font-mono text-sm p-4 rounded-md h-[60vh] overflow-y-auto">
              {isGenerating && selectedBook?.id === bookToAdapt?.id ? (
                 <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <Loader2 className="w-12 h-12 animate-spin mb-4" />
                    <p className="text-lg">AI is generating the script for "{selectedBook.title}"...</p>
                    <p className="text-sm mt-2">This may take a few moments.</p>
                 </div>
              ) : activeScript ? (
                <pre className="whitespace-pre-wrap">{activeScript}</pre>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                  <Film className="w-16 h-16 mb-4" />
                  <p className="text-lg">Select a book to view its script.</p>
                  <p className="text-sm mt-1">If a script hasn't been generated, start the adaptation process.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Adaptation Modal */}
      {isModalOpen && bookToAdapt && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md m-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Start Adaptation</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-600 mb-2">You are about to generate a movie script for:</p>
            <p className="text-lg font-semibold text-indigo-700 mb-6">"{bookToAdapt.title}"</p>
            <p className="text-sm text-gray-500 mb-6">
              The AI will analyze the book's structure, characters, and plot points derived from its Mermaid graph to create a formatted screenplay.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateScript}
                disabled={isGenerating}
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center space-x-2 disabled:bg-indigo-300"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Bot size={16} />
                    <span>Confirm & Generate</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDashboard;