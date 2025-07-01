import type ClassNameProps from "../shared/ClassNameProps";
import LoadingErrorSection from "./LoadingErrorSection";
import LoadingSection from "./LoadingSection";

interface LoadDataDecoratorProps {
  error?: Error | null;
  isLoading: boolean;
  children: React.ReactNode;
}

export default function LoadDataDecorator({
  children,
  error,
  isLoading,
  className,
}: LoadDataDecoratorProps & ClassNameProps) {
  return (
    <>
      {error ? (
        <LoadingErrorSection error={error} className={className} />
      ) : isLoading ? (
        <LoadingSection className={className} />
      ) : (
        children
      )}
    </>
  );
}
