import React, { Component } from "react";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import Footer from "./components/footer/";
import Home from "./components/home/home";
import SalesDashboard from "./components/salesdashboard";
import ProductionDashboard from "./components/productiondashboard";
import WarehouseDashboard from "./components/warehousedashboard";
import Login from "./components/login";
import Register from "./components/register";
import Profile from "./components/profile";
import PosMachineCreate from "./components/posmachine/create";
import PosMachineIndex from "./components/posmachine/index";
import PosMachineUpdate from "./components/posmachine/update";
import BranchCreate from "./components/branch/create";
import BranchUpdate from "./components/branch/update";
import BranchIndex from "./components/branch/index";
import SupplierCreate from "./components/supplier/create";
import SupplierUpdate from "./components/supplier/update";
import SupplierIndex from "./components/supplier/index";
import MaterialCreate from "./components/material/create";
import MaterialUpdate from "./components/material/update";
import MaterialIndex from "./components/material/index";
import ProductCreate from "./components/product/create";
import ProductUpdate from "./components/product/update";
import ProductIndex from "./components/product/index";
import CreateOrder from "./components/order/create";
import OrderIndex from "./components/order/index";
import OrderReceipt from "./components/order/receipt.js";
import MachineIndex from "./components/machine/index";
import MachineCreate from "./components/machine/create";
import MachineUpdate from "./components/machine/update";
import ListproIndex from "./components/listpro/index";
import ListproCreate from "./components/listpro/create";
import ListproUpdate from "./components/listpro/update";
import BahanIndex from "./components/bahan/index";
import BahanCreate from "./components/bahan/create";
import BahanUpdate from "./components/bahan/update";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import * as loginActions from "./actions/login.action";
import { useDispatch, useSelector } from "react-redux";

//Protected Route

const App = (props) => {
  // const {pathname} = this.props.location;
  useSelector(({ loginReducer }) => loginReducer);
  const SecuredRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        // ternary condition

        loginActions.isLoggedIn() === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
  return (
    <Router>
      <Switch>
        <Route exact path="/order/receipt/:id" component={OrderReceipt} />
        <div>
          {loginActions.isLoggedIn() && <Sidebar />}
          {loginActions.isLoggedIn() && <Header />}

          <Route path="/register" component={Register} />
          <Route path="/login/:notify?" component={Login} />
          <SecuredRoute path="/sales/dashboard" component={SalesDashboard} />
          <SecuredRoute
            path="/productiondashboard"
            component={ProductionDashboard}
          />
          <SecuredRoute path="/profile" component={Profile} />
          <SecuredRoute exact path="/posmachine/" component={PosMachineIndex} />
          <SecuredRoute
            path="/posmachine/create"
            component={PosMachineCreate}
          />
          <SecuredRoute
            path="/posmachine/update/:id"
            component={PosMachineUpdate}
          />
          <SecuredRoute exact path="/branch/" component={BranchIndex} />
          <SecuredRoute path="/branch/create" component={BranchCreate} />
          <SecuredRoute path="/branch/update/:id" component={BranchUpdate} />

          <SecuredRoute exact path="/supplier/" component={SupplierIndex} />
          <SecuredRoute path="/supplier/create" component={SupplierCreate} />
          <SecuredRoute
            path="/supplier/update/:id"
            component={SupplierUpdate}
          />
          <SecuredRoute exact path="/product/" component={ProductIndex} />
          <SecuredRoute path="/product/create" component={ProductCreate} />
          <SecuredRoute path="/product/update/:id" component={ProductUpdate} />
          <SecuredRoute
            path="/warehouse/dashboard"
            component={WarehouseDashboard}
          />
          <SecuredRoute exact path="/material/" component={MaterialIndex} />
          <SecuredRoute path="/material/create" component={MaterialCreate} />
          <SecuredRoute
            path="/material/update/:id"
            component={MaterialUpdate}
          />

          <SecuredRoute exact path="/order/create" component={CreateOrder} />

          <SecuredRoute exact path="/order/" component={OrderIndex} />
          <SecuredRoute exact path="/machine/" component={MachineIndex} />
          <SecuredRoute path="/machine/create" component={MachineCreate} />
          <SecuredRoute path="/machine/update/:id" component={MachineUpdate} />

          <SecuredRoute exact path="/listpro/" component={ListproIndex} />
          <SecuredRoute path="/listpro/create" component={ListproCreate} />
          <SecuredRoute path="/listpro/update/:id" component={ListproUpdate} />

          <SecuredRoute exact path="/bahan/" component={BahanIndex} />
          <SecuredRoute path="/bahan/create" component={BahanCreate} />
          <SecuredRoute path="/bahan/update/:id" component={BahanUpdate} />
          <SecuredRoute path="/home" component={Home} />
          <Route path="/" exact component={Login} />
          {loginActions.isLoggedIn() && <Footer />}
        </div>
      </Switch>
    </Router>
  );
};
export default App;
