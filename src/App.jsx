import { useEffect, useState } from 'react';
import { fetchDoctors } from './utils/fetchDoctors';
import AutocompleteSearch from './components/AutocompleteSearch';
import FilterPanel from './components/FilterPanel';
import DoctorList from './components/DoctorList';

function App() {
  const [allDoctors, setAllDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({ consultationType: '', selectedSpecialties: [], sortBy: '' });

  useEffect(() => {
    fetchDoctors().then(setAllDoctors);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <h1 className="text-2xl font-bold text-center mb-6">Campus Assessment Doctor Listing</h1>
      <AutocompleteSearch allDoctors={allDoctors} onSearch={setSearchQuery} />
      <FilterPanel allDoctors={allDoctors} onFilter={setFilters} />
      <DoctorList allDoctors={allDoctors} searchQuery={searchQuery} filters={filters} />
    </div>
  );
}

export default App;