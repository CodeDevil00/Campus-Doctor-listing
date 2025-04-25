import DoctorCard from './DoctorCard';

export default function DoctorList({ allDoctors, searchQuery, filters }) {
  let filtered = allDoctors;

  // Search filter based on doctor name
  if (searchQuery) {
    filtered = filtered.filter(doc => doc.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }

  // Mode of consultation filter (Video or In Clinic)
  if (filters.consultationType) {
    console.log('Filtering by consultation type:', filters.consultationType); // Debug
    if (filters.consultationType === 'Video Consult') {
      filtered = filtered.filter(doc => doc.video_consult === true); // Check if video_consult is true
    } else if (filters.consultationType === 'In Clinic') {
      filtered = filtered.filter(doc => doc.in_clinic === true); // Check if in_clinic is true
    }
  }

  // Specialties filter
  if (filters.selectedSpecialties.length > 0) {
    filtered = filtered.filter(doc => {
      if (!Array.isArray(doc.specialities)) return false;
      return doc.specialities.some(spec => filters.selectedSpecialties.includes(spec.name));
    });
  }

  // Sorting by fees or experience
  if (filters.sortBy === 'fees') {
    filtered.sort((a, b) => {
      const feeA = parseFloat(a.fees.replace(/[^\d.-]/g, '')); // Remove currency symbols
      const feeB = parseFloat(b.fees.replace(/[^\d.-]/g, '')); // Remove currency symbols
      return feeA - feeB;
    });
  } else if (filters.sortBy === 'experience') {
    filtered.sort((a, b) => {
      const expA = parseInt(a.experience.split(' ')[0], 10); // Assuming experience is a string like '39 Years'
      const expB = parseInt(b.experience.split(' ')[0], 10); // Same here
      return expB - expA; // Sort in descending order
    });
  }

  console.log('Filtered Doctors:', filtered); // Check filtered result

  return (
    <div className="w-full max-w-3xl mx-auto mt-6">
      {filtered.length === 0 ? (
        <p>No doctors match the filters.</p>
      ) : (
        filtered.map((doc, idx) => (
          <DoctorCard key={idx} doctor={doc} />
        ))
      )}
    </div>
  );
}