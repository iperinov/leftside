
interface Configration {
    uuid: string
    name: string
}

export function meta() {
    return [{title: `${name} configuration`}]
}

export default function Configuration({uuid, name}: Configration) {
  return <div>Configuration {}</div>;
}
