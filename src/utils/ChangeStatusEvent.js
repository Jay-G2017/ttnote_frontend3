export const savingEvent = new CustomEvent('changeStatus', {
  detail: { status: 'saving' },
});
export const savedEvent = new CustomEvent('changeStatus', {
  detail: { status: 'saved' },
});
export const failedEvent = (message) => {
  return new CustomEvent('changeStatus', {
    detail: { status: 'failed', message },
  });
};

export const dispatchSavedEventLater = (milliSeconds = 600) => {
  setTimeout(() => window.dispatchEvent(savedEvent), milliSeconds);
};
