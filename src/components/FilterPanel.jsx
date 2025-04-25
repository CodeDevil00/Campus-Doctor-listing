import { useState, useEffect } from 'react';

export default function FilterPanel({ allDoctors, onFilter }) {
  const [consultationType, setConsultationType] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    if (Array.isArray(allDoctors)) {
      // Flatten all specialities and ensure uniqueness
      const specialtySet = new Set(allDoctors.flatMap(doc => doc.specialities.map(spec => spec.name)));
      setSpecialties([...specialtySet]);
    } else {
      console.warn('allDoctors is not an array or is undefined');
    }
  }, [allDoctors]);

  useEffect(() => {
    onFilter({ consultationType, selectedSpecialties, sortBy });
  }, [consultationType, selectedSpecialties, sortBy]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md space-y-6">
      {/* Mode of Consultation Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Mode of Consultation</h3>
        <div className="space-y-3">
          <label className="inline-flex items-center space-x-2">
            <input
              type="radio"
              name="consult"
              value="Video Consult"
              data-testid="filter-video-consult"
              className="form-radio text-blue-500"
              onChange={() => setConsultationType('Video Consult')}
            />
            <span className="text-gray-700 text-sm">Video Consult</span>
          </label>
          <label className="inline-flex items-center space-x-2">
            <input
              type="radio"
              name="consult"
              value="In Clinic"
              data-testid="filter-in-clinic"
              className="form-radio text-blue-500"
              onChange={() => setConsultationType('In Clinic')}
            />
            <span className="text-gray-700 text-sm">In Clinic</span>
          </label>
        </div>
      </div>

      {/* Specialties Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Specialties</h3>
        <div className="space-y-3">
          {specialties.length > 0 ? (
            specialties.map((spec, idx) => (
              <label key={idx} className="inline-flex items-center space-x-2">
                <input
                  type="checkbox"
                  data-testid={`filter-specialty-${spec}`}
                  className="form-checkbox text-blue-500"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedSpecialties([...selectedSpecialties, spec]);
                    } else {
                      setSelectedSpecialties(selectedSpecialties.filter(s => s !== spec));
                    }
                  }}
                />
                <span className="text-gray-700 text-sm">{spec}</span>
              </label>
            ))
          ) : (
            <p className="text-gray-600 text-sm">No specialties available</p>
          )}
        </div>
      </div>

      {/* Sort By Section */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Sort By</h3>
        <select
          onChange={(e) => setSortBy(e.target.value)}
          className="block w-full bg-gray-50 border border-gray-300 rounded-md py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">None</option>
          <option value="fees">Fees</option>
          <option value="experience">Experience</option>
        </select>
      </div>
    </div>
  );
}
