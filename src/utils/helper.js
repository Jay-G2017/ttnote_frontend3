import {Howl} from "howler";
import BreakSound from "../audio/BreakSound.mp3";

export function setCookie(name, value, exSeconds) {
  let d = new Date();
  d.setTime(d.getTime() + (exSeconds * 1000));
  const expires = "expires="+d.toUTCString();
  document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

export function getCookie(name) {
  let cookieObject = {};
  if (document.cookie) {
    document.cookie.split(";").forEach(item => {
      const pair = item.split("=");
      cookieObject[pair[0].trim()] = pair[1].trim();
    });
  }
  return cookieObject[name];
}

export function enableSound() {
  const sound = new Howl({src: BreakSound});
  sound.play();
  sound.stop();
}