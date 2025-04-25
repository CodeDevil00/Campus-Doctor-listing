export default function DoctorCard({ doctor }) {


  const specialties = doctor.specialities && Array.isArray(doctor.specialities)
    ? doctor.specialities.map(spec => spec.name).join(', ')
    : 'No specialties available';

  return (
    <div data-testid="doctor-card" className="bg-white p-4 rounded shadow-md mb-4 flex items-start gap-4">
      <img
        src={doctor.photo}
        alt={doctor.name}
        className="w-24 h-24 object-cover rounded-full border border-gray-300"
      />
      <div>
        <h2 data-testid="doctor-name" className="text-lg font-semibold">{doctor.name}</h2>
        <p data-testid="doctor-specialty" className="text-sm text-gray-700">
          {specialties}
        </p>
        <p data-testid="doctor-experience" className="text-sm">Experience: {doctor.experience} years</p>
        <p data-testid="doctor-fee" className="text-sm">Fee: {doctor.fees}</p>
      </div>
    </div>
  );
}