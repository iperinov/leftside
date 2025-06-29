import type ClassNameProps from "../shared/ClassNameProps";

interface ConfigurationContentMainProps {
}

export default function ConfigurationContentMain({className}: ConfigurationContentMainProps & ClassNameProps) {
  return (
    <div className={className}>
      Main Content
    </div>
  );
    
}