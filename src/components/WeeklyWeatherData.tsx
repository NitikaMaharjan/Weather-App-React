export default function WeeklyWeatherData({ src, alt, title, value, unit }:{ src: string, alt: string, title: string, value: number, unit: string }) {
  return (
    <div className="flex items-center justify-between">
        <img src={src} alt={alt} className="w-8 h-8" title={title}/>
        <p>{`${value} ${unit}`}</p>
    </div>
  )
}
