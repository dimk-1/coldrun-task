import { createPinia } from 'pinia';
import { PiniaSharedState } from 'pinia-shared-state';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

const pinia = createPinia();

pinia.use(piniaPluginPersistedstate);

try {
  const channel = new BroadcastChannel('test_channel');

  if (channel && channel.name) {
    channel.close();
    pinia.use(
      PiniaSharedState({
        enable: false,
        initialize: false
      })
    );
  }
} catch (e) {
  console.log('BroadcastChannel is not supported:', e);
}

export { pinia };
