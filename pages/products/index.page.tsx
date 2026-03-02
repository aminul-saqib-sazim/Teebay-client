import ProductsContainer from "@/modules/products/containers/ProductsContainer";
import ProtectedRoute from "@/shared/components/wrappers/ProtectedRoute";
import AuthenticatedLayout from "@/shared/layouts/AuthenticatedLayout";
import { NextApplicationPage } from "@/shared/typedefs";

const ProductsPage: NextApplicationPage = () => <ProductsContainer />;

ProductsPage.Layout = AuthenticatedLayout;
ProductsPage.Guard = ProtectedRoute;

export default ProductsPage;
