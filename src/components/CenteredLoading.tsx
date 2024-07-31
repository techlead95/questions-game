import { LoadingSpinner } from "./ui/loading-spinner";

export default function CenteredLoading() {
  return (
    <div className="flex p-6 justify-center">
      <LoadingSpinner />
    </div>
  );
}
