import type ClassNameProps from "../shared/ClassNameProps";

//interface ConfigurationContentContextProps = {};

export default function ConfigurationContentContext({
  className,
}: /*ConfigurationContentContextProps &*/ ClassNameProps) {
  return <div className={className}>Context</div>;
}
