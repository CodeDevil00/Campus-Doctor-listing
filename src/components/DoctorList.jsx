import DoctorCard from './DoctorCard';

export default function DoctorList({ allDoctors, searchQuery, filters }) {
  let filtered = allDoctors;

  if (searchQuery) {
    filtered = filtered.filter(doc => doc.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  if (filters.consultationType) {
    filtered = filtered.filter(doc => doc.mode === filters.consultationType);
  }

  if (filters.selectedSpecialties.length > 0) {
    filtered = filtered.filter(doc =>
      doc.speciality.some(spec => filters.selectedSpecialties.includes(spec))
    );
  }

  if (filters.sortBy === 'fees') {
    filtered.sort((a, b) => a.fees - b.fees);
  } else if (filters.sortBy === 'experience') {
    filtered.sort((a, b) => b.experience - a.experience);
  }

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      {filtered.map((doc, idx) => (
        <DoctorCard key={idx} doctor={doc} />
      ))}
    </div>
  );
}