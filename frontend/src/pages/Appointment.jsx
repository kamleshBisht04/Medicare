import { useParams } from 'react-router-dom';
import { doctors } from '../assets/assets';

const Appointment = () => {
  const { id } = useParams();
  const doctor = id ? doctors.find((doc) => doc._id === id) : null;
  console.log(doctor);

  return <div>Appointment</div>;
};

export default Appointment;
