

import React from 'react';
import list from './list.json';
import {HookHandler} from './hook-handler';
import ReactAudioPlayer from 'react-audio-player';

export class CardProfile extends React.Component {
  state = {
    index: 0,
    currentTime: '0:00',
    musicList: list,
    pause: false,
  };

  componentDidMount() {
    this.playerRef.addEventListener("timeupdate", this.timeUpdate, false);
    this.playerRef.addEventListener("ended", this.nextSong, false);
    this.timelineRef.addEventListener("click", this.changeCurrentTime, false);
    this.timelineRef.addEventListener("mousemove", this.hoverTimeLine, false);
    this.timelineRef.addEventListener("mouseout", this.resetTimeLine, false);
  }

  componentWillUnmount() {
    this.playerRef.removeEventListener("timeupdate", this.timeUpdate);
    this.playerRef.removeEventListener("ended", this.nextSong);
    this.timelineRef.removeEventListener("click", this.changeCurrentTime);
    this.timelineRef.removeEventListener("mousemove", this.hoverTimeLine);
    this.timelineRef.removeEventListener("mouseout", this.resetTimeLine);
  }

  changeCurrentTime = (e) => {
    const duration = this.playerRef.duration;

    const playheadWidth = this.timelineRef.offsetWidth;
    const offsetWidht = this.timelineRef.offsetLeft;
    const userClickWidht = e.clientX - offsetWidht;

    const userClickWidhtInPercent = (userClickWidht * 100) / playheadWidth;

    this.playheadRef.style.width = userClickWidhtInPercent + "%";
    this.playerRef.currentTime = (duration * userClickWidhtInPercent) / 100;
  }

  hoverTimeLine = (e) => {
    const duration = this.playerRef.duration;

    const playheadWidth = this.timelineRef.offsetWidth

    const offsetWidht = this.timelineRef.offsetLeft;
    const userClickWidht = e.clientX - offsetWidht;
    const userClickWidhtInPercent = (userClickWidht * 100) / playheadWidth;

    if (userClickWidhtInPercent <= 100) {
      this.hoverPlayheadRef.style.width = userClickWidhtInPercent + "%";
    }

    const time = (duration * userClickWidhtInPercent) / 100;

    if ((time >= 0) && (time <= duration)) {
      this.hoverPlayheadRef.dataset.content = this.formatTime(time);
    }
  }

  resetTimeLine = () => {
    this.hoverPlayheadRef.style.width = 0;
  }

  timeUpdate = () => {
    const duration = this.playerRef.duration;
    const timelineWidth = this.timelineRef.offsetWidth - this.playheadRef.offsetWidth;
    const playPercent = 100 * (this.playerRef.currentTime / duration);
    this.playheadRef.style.width = playPercent + "%";
    const currentTime = this.formatTime(parseInt(this.playerRef.currentTime));
    this.setState({
      currentTime
    });
  }

  formatTime = (currentTime) => {
    const minutes = Math.floor(currentTime / 60);
    let seconds = Math.floor(currentTime % 60);

    seconds = (seconds >= 10) ? seconds : "0" + seconds % 60;

    const formatTime = minutes + ":" + seconds

    return formatTime;
  }

  updatePlayer = () => {
    const { musicList, index } = this.state;
    const currentSong = musicList[index];
    const audio = new Audio(currentSong.audio);
    this.playerRef.load();
  }

  nextSong = () => {
    const { musicList, index, pause } = this.state;

    this.setState({
      index: (index + 1) % musicList.length
    });
    this.updatePlayer();
    if (pause) {
      this.playerRef.play();
    }
  };

  prevSong = () => {
    const { musicList, index, pause } = this.state;

    this.setState({
      index: (index + musicList.length - 1) % musicList.length
    });
    this.updatePlayer();
    if (pause) {
      this.playerRef.play();
    }
  };


  playOrPause = () => {
    const { musicList, index, pause } = this.state;
    const currentSong = musicList[index];
    const audio = new Audio(currentSong.audio);
    if (!this.state.pause) {
      this.playerRef.play();
    } else {
      this.playerRef.pause();
    }
    this.setState({
      pause: !pause
    })
  }

  clickAudio = (key) => {
    const { pause } = this.state;

    this.setState({
      index: key
    });

    this.updatePlayer();
    if (pause) {
      this.playerRef.play();
    }
  }


  render() {
    const { musicList, index, currentTime, pause } = this.state;
    const currentSong = musicList[index];

    const secondsToTime = (e) => {
      var m = Math.floor(e % 3600 / 60).toString().padStart(2, '0'),
        s = Math.floor(e % 60).toString().padStart(2, '0');
      return m + ':' + s;
    }
  
    return (
      <div className="card">
        <HookHandler songSelected={this.state.index} />
        <div className="current-song">
          <audio ref={ref => this.playerRef = ref}>
            <source src={'/audio/music/' + currentSong['source-file']} />
            Your browser does not support the audio element.
          </audio>
          <span className="song-name" id='song-name' index={index}>{currentSong['track-id']}</span>
          <span className="song-autor">{currentSong['scene-id']}</span>

          <div className="time">
            <div className="current-time">{currentTime}</div>
            <div className="end-time">{this.playerRef?.duration && secondsToTime(this.playerRef.duration)}</div>
          </div>

          <div ref={ref => this.timelineRef = ref} id="timeline">
            <div ref={ref => this.playheadRef = ref} id="playhead"></div>
            <div ref={ref => this.hoverPlayheadRef = ref} className="hover-playhead" data-content="0:00"></div>
          </div>

          <div className="controls">
            <button onClick={this.prevSong} className="prev prev-next current-btn"><i className="fas fa-backward"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white"><path d="M459.5 71.41l-171.5 142.9v83.45l171.5 142.9C480.1 457.7 512 443.3 512 415.1V96.03C512 68.66 480.1 54.28 459.5 71.41zM203.5 71.41L11.44 231.4c-15.25 12.87-15.25 36.37 0 49.24l192 159.1c20.63 17.12 52.51 2.749 52.51-24.62v-319.9C255.1 68.66 224.1 54.28 203.5 71.41z" /></svg></i></button>

            <button onClick={this.playOrPause} className="play current-btn">
              {
                (!pause) ? <i className="fas fa-play"><svg style={{ height: '28px', padding: '5px 0 0 3px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="white"><path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" /></svg></i>
                  : <i className="fas fa-pause"><svg style={{ height: '28px', padding: '5px 0 0 0px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512" fill="white"><path d="M272 63.1l-32 0c-26.51 0-48 21.49-48 47.1v288c0 26.51 21.49 48 48 48L272 448c26.51 0 48-21.49 48-48v-288C320 85.49 298.5 63.1 272 63.1zM80 63.1l-32 0c-26.51 0-48 21.49-48 48v288C0 426.5 21.49 448 48 448l32 0c26.51 0 48-21.49 48-48v-288C128 85.49 106.5 63.1 80 63.1z" /></svg></i>
              }
            </button>
            <button onClick={this.nextSong} className="next prev-next current-btn"><i className="fas fa-forward"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="white"><path d="M52.51 440.6l171.5-142.9V214.3L52.51 71.41C31.88 54.28 0 68.66 0 96.03v319.9C0 443.3 31.88 457.7 52.51 440.6zM308.5 440.6l192-159.1c15.25-12.87 15.25-36.37 0-49.24l-192-159.1c-20.63-17.12-52.51-2.749-52.51 24.62v319.9C256 443.3 287.9 457.7 308.5 440.6z" /></svg></i></button>
          </div>

        </div>
        <div className="play-list" >
          {musicList.map((music, key = 0) =>
            <div key={key}
              onClick={() => this.clickAudio(key)}
              className={"track " +
                (index === key && !pause ? 'current-audio' : '') +
                (index === key && pause ? 'play-now' : '')} >
              <div className="track-discr" >
                <span className="track-name" >{music['track-id']}</span>
                <span className="track-author" >{music['scene-id']}</span>
              </div>
              <span className="track-duration" >
                {(index === key)
                  ? currentTime
                  : music.duration
                }
              </span>
            </div>
          )}
        </div>
      </div>
    )
  }
}