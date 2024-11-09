import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const FullPageLoadingSpinner = () => (
  <div className="min-h-screen w-full flex flex-1 items-center justify-center">
    <LoadingSpinner className="w-full" />;
  </div>
);

export default FullPageLoadingSpinner;
