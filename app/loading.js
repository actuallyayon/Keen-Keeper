export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] py-20 px-4">
      <div className="relative w-24 h-24 mb-6">
        {/* Animated outer circle */}
        <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-primary-dark rounded-full border-t-transparent animate-spin"></div>
      </div>
      
      <h2 className="text-xl font-bold text-gray-900 mb-2 animate-pulse">
        Fetching Friends...
      </h2>
      <p className="text-gray-400 text-sm font-medium">
        Tending to your connection shelf
      </p>
    </div>
  );
}
