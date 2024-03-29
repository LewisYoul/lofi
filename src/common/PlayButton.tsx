interface PlayButtonProps {
  isPlaying: boolean;
  onClick: React.MouseEventHandler;
}

function PlayButton(props: PlayButtonProps) {
  const iconToShow = () => {
    if (props.isPlaying) {
      return(
        <svg xmlns="http://www.w3.org/2000/svg" className="text-white h-20 w-20" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
      )
    } else {
      return(
        <svg xmlns="http://www.w3.org/2000/svg" className="text-white h-20 w-20" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
      )
    }
  }

  return(
    <button onClick={props.onClick}>
      {iconToShow()}
    </button>
  )
}

export default PlayButton