export default function DoctorCard({ doctor }) {
  const specialties =
    doctor.specialities && Array.isArray(doctor.specialities)
      ? doctor.specialities.map((spec) => spec.name).join(', ')
      : 'No specialties available';

  const clinic = doctor.clinic ? doctor.clinic.address : null;
  const location = clinic ? `${clinic.locality}, ${clinic.city}` : 'Location not available';
  
  const clinicName = doctor.clinic ? doctor.clinic.name : 'Clinic not available';

  return (
    <div data-testid="doctor-card" className="bg-white p-4 rounded shadow-md mb-4 flex justify-between items-start gap-4">
      <div className="flex items-start gap-4">
        <img
          src={doctor.photo}
          alt={doctor.name}
          className="w-24 h-24 object-cover rounded-full border border-gray-300"
        />
        <div>
          <h2 data-testid="doctor-name" className="text-lg font-semibold">{doctor.name}</h2>
          
          {/* Add clinic name here */}
          <p data-testid="doctor-specialty" className="text-sm text-gray-700">
            {specialties}
          </p>
          <p data-testid="doctor-experience" className="text-sm">
            Experience: {doctor.experience}
          </p>
          <p data-testid="doctor-fee" className="text-sm">
            Fee: {doctor.fees}
          </p>
          <p data-testid="doctor-clinic-name" className="text-sm text-gray-700">
            <i className="ri-building-4-line"></i>
            Clinic: {clinicName}
          </p>
          <p data-testid="doctor-location" className="text-sm text-gray-600">
            <i className="ri-map-pin-2-fill"></i>
            Location: {location}
          </p>
        </div>
      </div>
      <button
        data-testid="book-appointment-btn"
        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 self-center"
      >
        Book Appointment
      </button>
    </div>
  );
}
