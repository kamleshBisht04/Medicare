import { doctors } from '../assets/assets';

const TopDoctors = () => {
  return (
    <div className="my-16 flex flex-col items-center gap-4 text-gray-800 md:mx-10">
      <h1 className="font-outfit text-3xl font-medium">Top Doctors to Book</h1>
      <p className="text-center text-sm text-gray-700 sm:w-1/3">
        Simply browse through our extensive list of trusted doctors.
      </p>
      <div className="grid w-full grid-cols-2 gap-6 pt-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 ">
        {doctors.slice(0, 10).map((item, index) => (
          <div
            key={index}
            className="cursor-pointer overflow-hidden rounded-3xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            {/* image */}
            <div className="bg-blue-50">
              <img
                className="h:28 md:h-64 w-full object-cover"
                src={item.image}
                alt={item.speciality}
              />
            </div>

            {/* content */}
            <div className="p-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-green-500"></span>

                <p className="text-sm text-green-600">Available</p>
              </div>

              <p className="mt-3 text-[10px] md:text-lg font-semibold text-gray-800">
                {item.name}
              </p>

              <p className="text-sm text-gray-500">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDoctors;
