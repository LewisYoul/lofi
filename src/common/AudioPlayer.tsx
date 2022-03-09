import { useEffect, useState } from "react"
import NextButton from "./NextButton";
import PlayButton from "./PlayButton";
import PreviousButton from "./PreviousButton";
import VolumeBar from "./VolumeBar";
import VolumeDownButton from "./VolumeDownButton";
import VolumeSlider from "./VolumeSlider";
import VolumeUpButton from "./VolumeUpButton";

function AudioPlayer() {
  const channels = [
    {
      name: 'Lofi - Coffee Shop',
      id: '-5KAN9_CzSA'
    },
    {
      name: 'Lofi - Study Beats',
      id: '5qap5aO4i9A'
    },
    {
      name: 'Lofi - Rain & Radio',
      id: 'zamNv893kHI'
    },
    {
      name: 'White Noise - Rain Sounds 1',
      id: 'buqt6_CjtuI'
    },
    {
      name: 'White Noise - Rain Sounds 2',
      id: '42M3esYyHdw'
    }
  ]
  const [player, setPlayer] = useState<YouTubePlayer>();
  const [isPlaying, setisPlaying] = useState(false);
  const [volume, setVolume] = useState(45);
  const [channel, setChannel] = useState(channels[0])

  type YouTubePlayer = {
    playVideo: Function;
    pauseVideo: Function;
    setVolume: Function;
    destroy: Function;
    loadVideoById: Function;
    cueVideoById: Function;
  }

  useEffect(() => { createAudioPlayer() }, [])
  useEffect(() => { updateChannel() }, [channel])

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

  const createAudioPlayer = () => {
    // @ts-ignore
    const audioPlayer = new YT.Player('player', {
      height: '390',
      width: '640',
      videoId: channel.id,
    })

    setPlayer(audioPlayer)
    volumeUp()
  }

  const updateChannel = () => {
    if (isPlaying) {
      player?.loadVideoById({ videoId: channel.id })
    } else {
      player?.cueVideoById({ videoId: channel.id })
    }
  }

  const nextChannel = () => {
    const currentIndex = channels.findIndex((chan) => { return chan.id === channel.id })
    let newIndex = currentIndex + 1

    if (!channels[newIndex]) { newIndex = 0 }

    setChannel(channels[newIndex])
  }

  const previousChannel = () => {
    const currentIndex = channels.findIndex((chan) => { return chan.id === channel.id })
    let newIndex = currentIndex - 1

    if (!channels[newIndex]) { newIndex = channels.length - 1 }

    setChannel(channels[newIndex])
  }

  return(
    <div className="flex h-full justify-center items-center">
      <div className="hidden" id="player"></div>

      <div className="border border-white rounded-lg px-8 py-4 w-96">
        <h1 className="block text-white font-semibold text-2xl text-center mb-4">{channel.name}</h1>
        <div className="flex justify-center">
          <VolumeSlider onChange={setPlayerVolume} volume={volume} />
          <div className="flex justify-center">
            <PreviousButton onClick={previousChannel} />
            <PlayButton isPlaying={isPlaying} onClick={toggleAudioState} />
            <NextButton onClick={nextChannel} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AudioPlayer