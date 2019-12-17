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

// 针对mobile端第一次进入网页后，点击定时播放后立即进入后台，声音会不法播放。
// 需要先播放一下后，才能转入到后台。
export function enableSound() {
  // window.restAudio.resume();
  window.restAudio.play();
  window.restAudio.pause();
  // const audio = new Howl({src: RestAudio, html5: true})
  // audio.play();
  // audio.pause();
}