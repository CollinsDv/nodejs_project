import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import AddDataForm from './components/AddDataForm';
import UpdateDataForm from './components/UpdateDataForm';
import DeleteDataForm from './components/DeleteDataForm';
import DisplayRecords from './components/DisplayRecords';
import AverageGoals from './components/AverageGoals';
import TeamStats from './components/TeamStats';  // Import the new TeamStats component

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-gray-100">
                <header className="bg-blue-600 text-white py-4">
                    <h1 className="text-3xl font-bold text-center">Football Data Management</h1>
                </header>

                <nav className="flex flex-wrap justify-center space-x-2 sm:space-x-4 mt-6">
                    <Link to="/add" className="px-4 py-2 rounded bg-gray-300 hover:bg-blue-400">Add Data</Link>
                    <Link to="/update" className="px-4 py-2 rounded bg-gray-300 hover:bg-blue-400">Update Data</Link>
                    <Link to="/delete" className="px-4 py-2 rounded bg-gray-300 hover:bg-blue-400">Delete Data</Link>
                    <Link to="/display" className="px-4 py-2 rounded bg-gray-300 hover:bg-blue-400">Display Records</Link>
                    <Link to="/average" className="px-4 py-2 rounded bg-gray-300 hover:bg-blue-400">Average Goals</Link>
                    <Link to="/team-stats" className="px-4 py-2 rounded bg-gray-300 hover:bg-blue-400">Team Stats</Link> {/* New Link */}
                </nav>

                <main className="mt-8 px-4 py-4 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
                    <Routes>
                        <Route path="/add" element={<AddDataForm />} />
                        <Route path="/update" element={<UpdateDataForm />} />
                        <Route path="/delete" element={<DeleteDataForm />} />
                        <Route path="/display" element={<DisplayRecords />} />
                        <Route path="/average" element={<AverageGoals />} />
                        <Route path="/team-stats" element={<TeamStats />} /> {/* New Route */}
                    </Routes>
                </main>

                <footer className="bg-blue-600 text-white py-4 mt-6">
                    <p className="text-center">© 2024 Football Data Management. All rights reserved.</p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
