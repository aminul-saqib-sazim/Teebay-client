import OrdersContainer from "@/modules/orders/containers/OrdersContainer";
import ProtectedRoute from "@/shared/components/wrappers/ProtectedRoute";
import AuthenticatedLayout from "@/shared/layouts/AuthenticatedLayout";
import { NextApplicationPage } from "@/shared/typedefs";

const OrdersPage: NextApplicationPage = () => <OrdersContainer />;

OrdersPage.Layout = AuthenticatedLayout;
OrdersPage.Guard = ProtectedRoute;

export default OrdersPage;
