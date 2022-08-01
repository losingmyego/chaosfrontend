
import { useState } from 'react';
import type { NextPage } from 'next'
import useAudioPlayer from './audio-utils';
import list from './list.json'

const AudioPlayer: NextPage = () => {

  const [state, setState] = useState({
    index: 0,
    currentTime: '0:00',
    musicList: list,
    pause: false,
  });

  const { curTime, duration, playing, setPlaying, setClickedTime } = useAudioPlayer(state.index);

  function secondsToTime(e: any) {
    var m = Math.floor(e % 3600 / 60).toString().padStart(2, '0'),
      s = Math.floor(e % 60).toString().padStart(2, '0');
    return m + ':' + s;
  }

  const prevSong = () => {
    console.log('prev song...')
  }

  const nextSong = () => {
    console.log('Next song hit...')
  }

  const selectSong = (key: any) => {
    // setDuration(null)
    setPlaying(false);
    setState({...state, index: key});
  }

  const { musicList, index, currentTime, pause } = state;


  return (
    <div className="card">
      <div className="current-song">
        <audio id="chaos-audio">
          <source src={'/audio/music/' + musicList[state.index]['source-file']} type="audio/ogg" />
          Your browser does not support the audio element.
        </audio>
        <span className="song-name">{musicList[state.index]['track-id']}</span>
        <span className="song-autor">{musicList[state.index]['scene-id']}</span>

        <div className="time">
          <div className="current-time">{secondsToTime(curTime)}</div>
          <div className="end-time">{secondsToTime(duration)}</div>
        </div>

        <div id="timeline">
          <div id="playhead"></div>
          <div className="hover-playhead" data-content="0:00"></div>
        </div>

        <div className="controls">
          <button onClick={prevSong} className="prev prev-next current-btn"><i className="fas fa-backward"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white"><path d="M459.5 71.41l-171.5 142.9v83.45l171.5 142.9C480.1 457.7 512 443.3 512 415.1V96.03C512 68.66 480.1 54.28 459.5 71.41zM203.5 71.41L11.44 231.4c-15.25 12.87-15.25 36.37 0 49.24l192 159.1c20.63 17.12 52.51 2.749 52.51-24.62v-319.9C255.1 68.66 224.1 54.28 203.5 71.41z" /></svg></i></button>
          <button onClick={() => playing ? setPlaying(false) : setPlaying(true)} className="play current-btn">
            {
              (!playing) ? <i className="fas fa-play"><svg style={{ height: '28px', padding: '5px 0 0 3px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="white"><path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" /></svg></i>
                : <i className="fas fa-pause"><svg style={{ height: '28px', padding: '5px 0 0 0px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="white"><path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z" /></svg></i>
            }
          </button>
          <button onClick={nextSong} className="next prev-next current-btn"><i className="fas fa-forward"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white"><path d="M52.51 440.6l171.5-142.9V214.3L52.51 71.41C31.88 54.28 0 68.66 0 96.03v319.9C0 443.3 31.88 457.7 52.51 440.6zM308.5 440.6l192-159.1c15.25-12.87 15.25-36.37 0-49.24l-192-159.1c-20.63-17.12-52.51-2.749-52.51 24.62v319.9C256 443.3 287.9 457.7 308.5 440.6z" /></svg></i></button>
        </div>

      </div>
      <div className="play-list" >
        {musicList.map((music, key = 0) =>
          <div key={key}
             onClick={()=> selectSong(key)}
            className={"track " +
              (index === key && !pause ? 'current-audio' : '') +
              (index === key && pause ? 'play-now' : '')} >

            <div className="track-discr" >
              <span className="track-name" >{music['track-id']}</span>
              <span className="track-author" >{music['scene-id']}</span>
            </div>
            <span className="track-duration" >
              {(index === key) &&
                currentTime
              }
            </span>
          </div>
        )}
      </div>
    </div>
  )
}

export default AudioPlayer;
