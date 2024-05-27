import type { RouteRecordRaw } from 'vue-router';

import { appRoutes } from './routes/app.routes';
import { errorRotes } from './routes/error.routes';

const routes: RouteRecordRaw[] = [...appRoutes, ...errorRotes];

export { routes };
