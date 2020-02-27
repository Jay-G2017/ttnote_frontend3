import React, {useMemo} from "react";
import Countdown, {zeroPad} from "react-countdown-now";

function CountdownTimer(props) {
  const {tomatoMinutes, onComplete} = props;

 return useMemo(() => (
   <Countdown
     date={Date.now() + tomatoMinutes * 60 * 1000}
     renderer={({minutes, seconds, total}) => {
      document.title = `${zeroPad(minutes)}:${zeroPad(seconds)}`;
      const tomatoTime = tomatoMinutes * 60 * 1000;
      window.tomatoProgress = Math.round((tomatoTime - total) / tomatoTime * 100);
      return(
        <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>
      );
     }}
     onComplete={onComplete}
   />
 ), [onComplete, tomatoMinutes])
}

export default CountdownTimer;