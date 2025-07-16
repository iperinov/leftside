import type ClassNameProps from "../shared/ClassNameProps";
import LoadingErrorSection from "./LoadingErrorSection";
import LoadingSection from "./LoadingSection";

interface LoadDataDecoratorProps {
  children: React.ReactNode;
  error?: Error | null;
  isLoading: boolean;
  retry?: () => void;
}

export default function LoadDataDecorator({ children, error, isLoading, retry, className }: LoadDataDecoratorProps & ClassNameProps) {
  return <>{error ? <LoadingErrorSection error={error} retry={retry} className={className} /> : isLoading ? <LoadingSection className={className} /> : children}</>;
}
