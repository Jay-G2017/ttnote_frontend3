import React, {useMemo} from "react";
import Countdown, {zeroPad} from "react-countdown-now";

function CountdownTimer(props) {
  const {tomatoMinutes, onComplete} = props;

 return useMemo(() => (
   <Countdown
     date={Date.now() + tomatoMinutes * 60 * 1000}
     renderer={({minutes, seconds}) => {
      document.title = `${zeroPad(minutes)}:${zeroPad(seconds)}`;
      return(
        <span>{zeroPad(minutes)}:{zeroPad(seconds)}</span>
      );
     }}
     onComplete={onComplete}
   />
 ), [onComplete, tomatoMinutes])
}

export default CountdownTimer;