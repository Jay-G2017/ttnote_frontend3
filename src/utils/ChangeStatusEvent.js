export const savingEvent = new CustomEvent('changeStatus', {
  detail: 'saving',
});
export const savedEvent = new CustomEvent('changeStatus', { detail: 'saved' });
export const failedEvent = new CustomEvent('changeStatus', {
  detail: 'failed',
});

export const dispatchSavedEventLater = (milliSeconds = 600) => {
  setTimeout(() => window.dispatchEvent(savedEvent), milliSeconds);
};
