import createVuexCache from 'vuex-cache';

export default ({ store }) => {
  const options = {
    timeout: 1000 // Equal to 2 hours in milliseconds.
  };

  const setupVuexCache = createVuexCache(options);

  window.onNuxtReady(() => setupVuexCache(store));
};