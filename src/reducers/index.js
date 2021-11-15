import { combineReducers } from 'redux';
import loginReducer from './login.reducer';
import registerReducer from './register.reducer';
import posmachineReducer from './posmachine.reducer';
import branchReducer from './branch.reducer';
import supplierReducer from './supplier.reducer';
import productReducer from './product.reducer';
import materialReducer from './material.reducer';
import shopReducer from './shop.reducer';
import statReducer from './stat.reducer';
import coststatReducer from './coststat.reducer';
import orderReducer from './order.reducer';
import userReducer from './user.reducer';
import machineReducer from './machine.reducer';
import listproReducer from './listpro.reducer';
import bahanReducer from './bahan.reducer';
export default combineReducers({
  loginReducer,
  registerReducer,
  posmachineReducer,
  branchReducer,
  supplierReducer,
  productReducer,
  materialReducer,
  shopReducer,
  statReducer,
  coststatReducer,
  orderReducer,
  userReducer,
  machineReducer,
  listproReducer,
  bahanReducer,
});
