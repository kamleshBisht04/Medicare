import { useAppContext } from '../context/AppContext';

const MyAppointments = () => {
  const { doctors } = useAppContext();
  return (
    <div>
      <p className="mt-12 border-b pb-3 border-gray-300 font-medium text-zinc-700 text-2xl">
        My appointments
      </p>
      <div>
        {doctors.slice(0, 3).map((item, index) => (
          <div
            className="grid grid-cols-[1fr_2fr] gap-4 border-b mb-6 border-gray-200 py-2 sm:flex sm:gap-6"
            key={index}
          >
            <div>
              <img className="w-32 bg-indigo-50 rounded-2xl" src={item.image} alt="" />
            </div>
            <div className="flex-1 text-sm text-zinc-600">
              <p className="font-semibold text-neutral-800">{item.name}</p>
              <p>{item.speciality}</p>
              <p className="mt-1 font-medium text-zinc-700">Address:</p>
              <p className="text-xs">{item.address.line1}</p>
              <p className="text-xs">{item.address.line2}</p>
              <p className="mt-1 text-xs">
                <span className="text-sm font-medium text-neutral-700">
                  Date & Time:
                </span>{' '} 25 July,2026 | 8:30 PM
              </p>
            </div>
            <div></div>
            <div className="flex flex-col justify-end gap-2">
              <button className="hover:bg-primary rounded border py-2 text-center text-sm text-stone-500 transition-all duration-300 hover:text-white sm:min-w-48">
                Pay Online
              </button>

              <button className="rounded border py-2 text-center text-sm text-stone-500 transition-all duration-300 hover:bg-red-600 hover:text-white sm:min-w-48">
                Cancel appointment
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
