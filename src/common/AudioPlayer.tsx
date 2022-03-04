import { useEffect, useState } from "react"
import PlayButton from "./PlayButton";
import VolumeBar from "./VolumeBar";
import VolumeDownButton from "./VolumeDownButton";
import VolumeUpButton from "./VolumeUpButton";

function AudioPlayer() {
  const channels = [
    {
      name: 'Lofi - Coffee Shop Radio',
      id: '-5KAN9_CzSA'
    },
    {
      name: 'Lofi - Study Beats Radio',
      id: '5qap5aO4i9A'
    }
  ]
  const [player, setPlayer] = useState<YouTubePlayer>();
  const [isPlaying, setisPlaying] = useState(false);
  const [volume, setVolume] = useState(45);

  type YouTubePlayer = {
    playVideo: Function;
    pauseVideo: Function;
    setVolume: Function;
  }

  useEffect(() => {
    const audioPlayer = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: channels[0].id
    })

    setPlayer(audioPlayer)

    volumeUp()
  }, [])

  const toggleAudioState = () => {
    isPlaying ? player?.pauseVideo() : player?.playVideo();

    setisPlaying(!isPlaying)
  };

  const volumeUp = () => {
    if (volume === 100) { return }

    setPlayerVolume(volume + 5);
  }

  const volumeDown = () => {
    if (volume === 0) { return }

    setPlayerVolume(volume - 5);
  }

  const setPlayerVolume = (newVolume: number) => {
    player?.setVolume(newVolume)
    setVolume(newVolume)
  }

  return(
    <div className="flex">
      <PlayButton isPlaying={isPlaying} onClick={toggleAudioState} />
      <VolumeDownButton onClick={volumeDown} />
      <VolumeBar volume={volume} />
      <VolumeUpButton onClick={volumeUp} />
    </div>
  )
}

export default AudioPlayer