import { useState } from 'react';
import AddDataForm from './components/AddDataForm';
import UpdateDataForm from './components/UpdateDataForm';
import DeleteDataForm from './components/DeleteDataForm';
import DisplayRecords from './components/DisplayRecords';
import AverageGoals from './components/AverageGoals';

function App() {
    const [currentView, setCurrentView] = useState<string>('add'); // Default view

    return (
        <div className="min-h-screen bg-gray-100">
            <header className="bg-blue-600 text-white py-4">
                <h1 className="text-3xl font-bold text-center">Football Data Management</h1>
            </header>
            <nav className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mt-6">
                {['add', 'update', 'delete', 'display', 'average'].map((view) => (
                    <button
                        key={view}
                        onClick={() => setCurrentView(view)}
                        className={`px-4 py-2 rounded transition duration-200 ${
                            currentView === view ? 'bg-blue-600 text-white' : 'bg-gray-300'
                        } hover:bg-blue-400`}
                    >
                        {view.charAt(0).toUpperCase() + view.slice(1)} Data
                    </button>
                ))}
            </nav>

            <main className="mt-8 px-4 py-4 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
                {currentView === 'add' && <AddDataForm />}
                {currentView === 'update' && <UpdateDataForm />}
                {currentView === 'delete' && <DeleteDataForm />}
                {currentView === 'display' && <DisplayRecords />}
                {currentView === 'average' && <AverageGoals />}
            </main>

            <footer className="bg-blue-600 text-white py-4 mt-6">
                <p className="text-center">© 2024 Football Data Management. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default App;
