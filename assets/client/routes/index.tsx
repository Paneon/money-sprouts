import userRoutes from '@/client/routes/userRoutes';
import accountRoutes from '@/client/routes/accountRoutes';

const routes = [...accountRoutes, ...userRoutes];

export default routes;
