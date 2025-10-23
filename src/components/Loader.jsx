 
const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="text-gray-600 mt-4 text-lg font-medium">Loading...</p>
    </div>
  );
};

export default Loader;
