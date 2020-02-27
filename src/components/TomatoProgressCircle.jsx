import React, {useCallback, useEffect, useState} from "react";
import {Circle} from "react-circle";

function TomatoProgressCircle() {
  const [progress, setProgress] = useState(window.tomatoProgress || 1);

  const updateProgress = useCallback(() => {
    let progress = window.tomatoProgress;
    if (!(progress > 1)) progress = 1;
    setProgress(progress);
  }, []);

  useEffect(() => {
    window.tomatoProgressIntervalId = setInterval(updateProgress, 1000);

    return (() => {
      clearInterval(window.tomatoProgressIntervalId);
    })
  }, [updateProgress]);

  return (
    <Circle
      size={21}
      lineWidth={40}
      animationDuration={'0.3s'}
      progress={progress}
      roundedStroke={true}
      progressColor={window.ttnoteThemeLight.colorPrimary}
      showPercentage={false}
    />
  )
}

export default TomatoProgressCircle;