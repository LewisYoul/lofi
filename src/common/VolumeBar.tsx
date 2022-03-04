interface VolumeBarProps {
  volume: number;
}

function VolumeBar(props: VolumeBarProps) {
  const increments = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95, 100]

  const volumeBar = () => {
    return(
      <div className="flex">
        {increments.map((increment) => {
          const classes = increment <= props.volume ? "bg-green-500" : ''

          return <div key={increment} className={`w-2 h-5 ${classes}`}></div>
        })}
      </div>
    )
  }
  return(
    <>{volumeBar()}</>
  )
}

export default VolumeBar