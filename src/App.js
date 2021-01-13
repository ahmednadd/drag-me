import React, { useState, useRef, useEffect } from 'react';
import SampleVideo from './assets/video/sample.mp4'
import './App.css';

function App() {

  const videoEl = useRef(null);
  const videoControl = useRef(null);
  const containerOne = useRef(null);
  const containerTwo = useRef(null);
  const containerThree = useRef(null);
  const containerFour = useRef(null);
  const [videoElCalcTop, setVideoElCalcTop] = useState('');
  const [videoElCalcLeft, setVideoElCalcLeft] = useState('');
  const [videoElCalcBottom, setVideoElCalcBottom] = useState('');
  const [videoElCalcRight, setVideoElCalcRight] = useState('');

  const handleMouseDown = (event) => {
    event.preventDefault();
    videoControl.current.pause();
    videoEl.current.style.cursor = "grabbing";
    videoEl.current.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseUp);
  }

  const handleMouseUp =  () => {
    videoEl.current.style.cursor = "grab";
    document.body.removeEventListener("mousemove", handleMouseMove);
    document.body.removeEventListener("mouseleave", handleMouseUp);
    collisionDetect();
  }

  const handleMouseMove = event => {
    setVideoElCalcTop(event.clientY - 50);
    setVideoElCalcLeft(event.clientX - 75);
  }

  const handleTouchStart = (event) => {
    event.preventDefault();
    videoControl.current.pause();
    videoEl.current.addEventListener("touchend", handleTouchEnd);
    document.body.addEventListener("touchmove", handleTouchMove);
    document.body.addEventListener("touchend", handleTouchEnd);
  }

  const handleTouchEnd = () => {
    document.body.removeEventListener("touchmove", handleTouchMove);
    document.body.addEventListener("touchend", handleTouchEnd);
  }

  const handleTouchMove = event => {
    event.preventDefault();
    setVideoElCalcTop(event.changedTouches[0].pageY - 35);
    setVideoElCalcLeft(event.changedTouches[0].pageX - 55);
    document.body.addEventListener("touchend", touchEnd);
  }

  const touchEnd = event => {
    event.preventDefault();
    collisionDetect();
  };

  const collisionDetect = () => {
    const videoElement = videoEl.current.getBoundingClientRect();
    const container1 = containerOne.current.getBoundingClientRect();
    const container2 = containerTwo.current.getBoundingClientRect();
    const container3 = containerThree.current.getBoundingClientRect();
    const container4 = containerFour.current.getBoundingClientRect();

    const isInHoriztonalBounds1 =
      videoElement.x < container1.x + container1.width && videoElement.x + videoElement.width > container1.x;
    const isInVerticalBounds1 =
      videoElement.y < container1.y + container1.height && videoElement.y + videoElement.height > container1.y;
    const isOverlapping1 = isInHoriztonalBounds1 && isInVerticalBounds1;
    
    if (isOverlapping1) {
      setVideoElCalcTop('25px');
      setVideoElCalcLeft('25px');
      setVideoElCalcBottom('unset');
      setVideoElCalcRight('unset');
    }
    const isInHoriztonalBounds2 =
      videoElement.x < container2.x + container2.width && videoElement.x + videoElement.width > container2.x;
    const isInVerticalBounds2 =
      videoElement.y < container2.y + container2.height && videoElement.y + videoElement.height > container2.y;
    const isOverlapping2 = isInHoriztonalBounds2 && isInVerticalBounds2;
    
    if (isOverlapping2) {
      setVideoElCalcTop('25px');
      setVideoElCalcLeft('unset');
      setVideoElCalcBottom('unset');
      setVideoElCalcRight('25px');
    }

    const isInHoriztonalBounds3 =
      videoElement.x < container3.x + container3.width && videoElement.x + videoElement.width > container3.x;
    const isInVerticalBounds3 =
      videoElement.y < container3.y + container3.height && videoElement.y + videoElement.height > container3.y;
    const isOverlapping3 = isInHoriztonalBounds3 && isInVerticalBounds3;
    
    if (isOverlapping3) {
      setVideoElCalcTop('unset');
      setVideoElCalcLeft('25px');
      setVideoElCalcBottom('25px');
      setVideoElCalcRight('unset');
    }

    const isInHoriztonalBounds4 =
      videoElement.x < container4.x + container4.width && videoElement.x + videoElement.width > container4.x;
    const isInVerticalBounds4 =
      videoElement.y < container4.y + container4.height && videoElement.y + videoElement.height > container4.y;
    const isOverlapping4 = isInHoriztonalBounds4 && isInVerticalBounds4;
    
    if (isOverlapping4) {
      setVideoElCalcTop('unset');
      setVideoElCalcLeft('unset');
      setVideoElCalcBottom('25px');
      setVideoElCalcRight('25px');
    }
  }

  const playVideo = event => {
    event.preventDefault();
    if (videoControl.current.paused) {
      videoControl.current.play();
    } else {
      videoControl.current.pause();
    }
  };

  return (
    <>
    <div className={`window-section-container`}>
      <div className="window-section-1" ref={containerOne} />
      <div className="window-section-2" ref={containerTwo} />
      <div className="window-section-3" ref={containerThree} />
      <div className="window-section-4" ref={containerFour} />
    </div>
    <div className={`video-container`}
      ref={videoEl}
      onMouseDown = {(event) => handleMouseDown(event)}
      onTouchStart = {(event) => handleTouchStart(event)}
      style={{top: videoElCalcTop, left: videoElCalcLeft, bottom: videoElCalcBottom, right: videoElCalcRight}}
    >
      <video loop ref={videoControl} onClick={(event) => playVideo(event)}>
        <source src={SampleVideo} type="video/mp4" />
      </video>
    </div>
    </>
  );
}

export default App;
