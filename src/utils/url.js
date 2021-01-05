export const normalizeUrl = (url) => {
  if (/^(http:\/\/|https:\/\/)/.test(url)) {
    return url
  } else {
    return 'https://' + url
  }
}
