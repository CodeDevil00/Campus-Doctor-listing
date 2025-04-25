import { useState, useEffect } from 'react';

export default function FilterPanel({ allDoctors, onFilter }) {
  const [consultationType, setConsultationType] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    const specialtySet = new Set();
    allDoctors.forEach(doc => {
      (doc.speciality || []).forEach(spec => specialtySet.add(spec));
    });
    
    setSpecialties([...specialtySet]);
  }, [allDoctors]);

  useEffect(() => {
    onFilter({ consultationType, selectedSpecialties, sortBy });
  }, [consultationType, selectedSpecialties, sortBy]);

  return (
    <div className="w-full max-w-md mx-auto mt-4 bg-white p-4 rounded shadow-md">
      <h3 className="font-bold" data-testid="filter-header-moc">Mode of Consultation</h3>
      <div className="flex gap-4 mt-2">
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="consult"
            value="Video Consult"
            data-testid="filter-video-consult"
            onChange={() => setConsultationType('Video Consult')}
          /> Video Consult
        </label>
        <label className="flex items-center gap-1">
          <input
            type="radio"
            name="consult"
            value="In Clinic"
            data-testid="filter-in-clinic"
            onChange={() => setConsultationType('In Clinic')}
          /> In Clinic
        </label>
      </div>

      <h3 className="font-bold mt-4" data-testid="filter-header-speciality">Specialties</h3>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {specialties.map((spec, idx) => (
          <label key={idx} className="flex items-center gap-1">
            <input
              type="checkbox"
              data-testid={`filter-specialty-${spec}`}
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedSpecialties([...selectedSpecialties, spec]);
                } else {
                  setSelectedSpecialties(selectedSpecialties.filter(s => s !== spec));
                }
              }}
            /> {spec}
          </label>
        ))}
      </div>

      <h3 className="font-bold mt-4" data-testid="filter-header-sort">Sort By</h3>
      <select
        className="w-full border px-2 py-1 mt-2 rounded"
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="">None</option>
        <option value="fees">Fees</option>
        <option value="experience">Experience</option>
      </select>
    </div>
  );
}
