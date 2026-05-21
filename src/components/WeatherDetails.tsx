export default function WeatherDetails({ src, alt, value, unit }:{ src: string, alt: string, value: number, unit: string }) {
  return (
    <div className="flex gap-2">
        <img src={src} alt={alt} className="icon"/>
        <p>{`${value} ${unit}`}</p>
    </div>
  )
}
