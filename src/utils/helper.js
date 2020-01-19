import {Howl} from "howler";
import SoundWebm from "../audio/sound.webm";
import SoundMp3 from "../audio/sound.mp3";

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

export function initSound() {
  if (!window.ttnoteSound)
    window.ttnoteSound = new Howl({
      src: [
        SoundWebm,
        SoundMp3,
      ],
      sprite: {
        begin: [
          0,
          2243.6281179138323
        ],
        rest: [
          4000,
          3205.0113378684805
        ],
        complete: [
          9000,
          1764.353741496599
        ]
      },
      onplayerror: function() {
        console.log('play error')
      }
    })
}

// 针对mobile端第一次进入网页后，点击定时播放后立即进入后台，声音会无法播放。
// 需要先播放一下后，才能转入到后台。
// 但似乎没什么用
export function enableRestSound() {
  window.restAudio.play();
  window.restAudio.pause();
}

export function enableDingDingSound() {
  window.dingDingAudio.play();
  window.dingDingAudio.pause();
}