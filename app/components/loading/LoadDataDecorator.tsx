import LoadingErrorSection from "./LoadingErrorSection";
import LoadingSection from "./LoadingSection";

interface LoadDataDecoratorProps {
  error?: Error | null
  isLoading: boolean
  children: React.ReactNode;
}

export default function LoadDataDecorator({children, error, isLoading}: LoadDataDecoratorProps) {
  return (
    <>
      { error ? 
          <LoadingErrorSection error={error}/> :
          isLoading ? 
            <LoadingSection /> :
            children
      }
    </>
  )
}
