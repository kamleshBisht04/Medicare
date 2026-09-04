const Loader = () => {
  return (
    <div className="absolute inset-0 z-30 flex items-start justify-center bg-white/60 pt-[300px] pr-[100px]">
      <div className="border-t-primary absolute h-10 w-10 animate-spin rounded-full border-4 border-gray-200"></div>
      <p className="mt-10 text-sm font-medium text-gray-600">Loading...</p>
    </div>
  );
};

export default Loader;
