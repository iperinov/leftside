import type ClassNameProps from "../shared/ClassNameProps";

interface LoadingErrorSectionProps {
  error: Error | undefined;
}

export default function LoadingErrorSection({ error, className }: LoadingErrorSectionProps & ClassNameProps) {
  return (
    <div className={`flex flex-col items-center justify-center py-12 text-stone-500 w-full h-full ${className}`}>
      <svg className="w-8 h-8 mb-2 text-stone-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" xmlns="http://www.w3.org/2000/svg">
        <title>error icon</title>
        {/* Wi-Fi arcs */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.53 16.11a6 6 0 016.95 0M5.1 12.69a10 10 0 0113.8 0M1.67 9.27a16 16 0 0120.66 0" />
        {/* Wi-Fi dot */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20h.01" />
        {/* Slash */}
        <path strokeLinecap="round" strokeLinejoin="round" d="M2 2l20 20" />
      </svg>
      <p>{error ? error.message : "Something went wrong while loading."}</p>
    </div>
  );
}
