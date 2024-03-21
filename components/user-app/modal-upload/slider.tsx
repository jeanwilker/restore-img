interface ImageVersion {
  imageRevealFraction: number;
  handleMouseDown: () => void;
  handleTouchMove: (event: React.TouchEvent<HTMLButtonElement>) => void;
}

const Slider = ({
  imageRevealFraction,
  handleMouseDown,
  handleTouchMove,
}: ImageVersion) => {
  return (
    <div
      style={{ left: `${imageRevealFraction * 100}%` }}
      className="absolute inset-y-0 group-hover:opacity-100 sm:opacity-0"
    >
      <div className="relative h-full opacity-50 hover:opacity-100">
        <div className="absolute inset-0 bg-white w-0.5 -ml-px opacity-50"></div>
        <button
          style={{ touchAction: 'none' }}
          onMouseDown={handleMouseDown}
          onTouchMove={handleTouchMove}
          className="h-12 w-12 -ml-6 rounded-full bg-white absolute top-1/2 shadow-xl flex items-center justify-center cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 text-gray-600 rotate-90 transform"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Slider;
