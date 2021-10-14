import { Route, Switch } from 'react-router-dom';
import Page404 from '../error/Page404/Page404';
import Dashboard from '../home/Dashboard';
import MainLayout from '../common/layout/MainLayout/MainLayout';
import Categories from '~/categories/Categories';
import Product from '~/products/Product/Product';
import NewProduct from '~/products/NewProduct/NewProduct';
import Products from '~/products/Products/Products';
import ImageModal from '~/common/components/ImageModal/ImageModal';
import Look from '~/looks/Look/Look';
import NewLook from '~/looks/NewLook/NewLook';
import Looks from '~/looks/Looks/Looks';
import Orders from '~/orders/Orders/Orders';

const MainRoutes = () => {
  return (
    <>
      <ImageModal />
      <MainLayout>
        <Switch>
          <Route exact path="/" component={Dashboard} />
          <Route path="/categories" component={Categories} />
          <Route exact path="/products" component={Products} />
          <Route path="/product/:id" component={Product} />
          <Route path="/products/new" component={NewProduct} />
          <Route exact path="/looks" component={Looks} />
          <Route path="/look/:id" component={Look} />
          <Route path="/looks/new" component={NewLook} />
          <Route path="/orders" component={Orders} />
          <Route component={Page404} />
        </Switch>
      </MainLayout>
    </>
  );
};

export default MainRoutes;
