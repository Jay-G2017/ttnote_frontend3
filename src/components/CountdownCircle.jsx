import React, {useMemo} from "react";
import Circle from "react-circle";
import Countdown from "react-countdown-now";

function CountdownCircle(props) {
  const {tomatoMinutes} = props;

 return useMemo(() => (
   <Countdown
     date={Date.now() + tomatoMinutes * 60 * 1000}
     renderer={({total}) => {
      const tomatoTime = tomatoMinutes * 60 * 1000;
      const progress = Math.round((tomatoTime - total) / tomatoTime * 100);
      return (
        <Circle
          size={21}
          lineWidth={40}
          progress={progress || 1}
          roundedStroke={true}
          progressColor={window.ttnoteThemeLight.colorPrimary}
          showPercentage={false}
        />
      )
     }}
   />
 ) , [tomatoMinutes])
}

export default CountdownCircle;