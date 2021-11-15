export const LOGIN_FETCHING = "LOGIN_FETCHING";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";

// Register Page
export const REGISTER_FETCHING = "REGISTER_FETCHING";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILED = "REGISTER_FAILED";

// POS Machine
export const POSMACHINE_FETCHING = "POSMACHINE_FETCHING";
export const POSMACHINE_SUCCESS = "POSMACHINE_SUCCESS";
export const POSMACHINE_FAILED = "POSMACHINE_FAILED";
export const POSMACHINE_CLEAR = "POSMACHINE_CLEAR";

//BRANCH
export const BRANCH_FETCHING = "BRANCH_FETCHING";
export const BRANCH_SUCCESS = "BRANCH_SUCCESS";
export const BRANCH_FAILED = "BRANCH_FAILED";
export const BRANCH_CLEAR = "BRANCH_CLEAR";
export const FETCHOPTION_SUCCESS = "FETCHOPTION_SUCCESS";

// SUPPLIER
export const SUPPLIER_FETCHING = "SUPPLIER_FETCHING";
export const SUPPLIER_SUCCESS = "SUPPLIER_SUCCESS";
export const SUPPLIER_FAILED = "SUPPLIER_FAILED";
export const SUPPLIER_CLEAR = "SUPPLIER_CLEAR";

//PRODUCTS
export const PRODUCT_FETCHING = "PRODUCT_FETCHING";
export const PRODUCT_SUCCESS = "PRODUCT_SUCCESS";
export const PRODUCT_FAILED = "PRODUCT_FAILED";
export const PRODUCT_CLEAR = "PRODUCT_CLEAR";
export const FETCH_OPTION_SUCCESS = "FETCH_OPTION_SUCCESS";

//MATERIAL
export const MATERIAL_FETCHING = "MATERIAL_FETCHING";
export const MATERIAL_SUCCESS = "MATERIAL_SUCCESS";
export const MATERIAL_FAILED = "MATERIAL_FAILED";
export const MATERIAL_CLEAR = "MATERIAL_CLEAR";

// Shop Page
export const SHOP_FETCHING = "SHOP_FETCHING";
export const SHOP_SUCCESS = "SHOP_SUCCESS";
export const SHOP_FAILED = "SHOP_FAILED";
export const SHOP_UPDATE_ORDER = "SHOP_UPDATE_ORDER";
export const SHOP_UPDATE_PAYMENT = "SHOP_UPDATE_PAYMENT";

//DASHBOARD STATS
export const STAT_FETCHING = "STAT_FETCHING";
export const STAT_SUCCESS = "STAT_SUCCESS";
export const STAT_FAILED = "STAT_FAILED";

//DASHBOARD COSTSTATS
export const COSTSTAT_FETCHING = "COSTSTAT_FETCHING";
export const COSTSTAT_SUCCESS = "COSTSTAT_SUCCESS";
export const COSTSTAT_FAILED = "COSTSTAT_FAILED";

export const ORDER_FETCHING = "ORDER_FETCHING";
export const ORDER_SUCCESS = "ORDER_SUCCESS";
export const ORDER_FAILED = "ORDER_FAILED";
export const ORDER_CLEAR = "ORDER_CLEAR";

//Machine Information
export const MACHINE_FETCHING = "MACHINE_FETCHING";
export const MACHINE_SUCCESS = "MACHINE_SUCCESS";
export const MACHINE_FAILED = "MACHINE_FAILED";
export const MACHINE_CLEAR = "MACHINE_CLEAR";

//List Production
export const LISTPRO_FETCHING = "LISTPRO_FETCHING";
export const LISTPRO_SUCCESS = "LISTPRO_SUCCESS";
export const LISTPRO_FAILED = "LISTPRO_FAILED";
export const LISTPRO_CLEAR = "LISTPRO_CLEAR";

//Bahan Produksi
export const BAHAN_FETCHING = "BAHAN_FETCHING";
export const BAHAN_SUCCESS = "BAHAN_SUCCESS";
export const BAHAN_FAILED = "BAHAN_FAILED";
export const BAHAN_CLEAR = "BAHAN_CLEAR";
//FETCH

export const USER_FETCHING = "USER_FETCHING";
export const USER_SUCCESS = "USER_SUCCESS";
export const USER_FAILED = "USER_FAILED";
export const USER_CLEAR = "USER_CLEAR";

//Forgot password
// export const FORGOT_FETCHING = "FORGOT_FETCHING";
// export const FORGOT_SUCCESS = "FORGOT_SUCCESS";
// export const FORGOT_FAILED = "FORGOT_FAILED";

// export const imageUrl = 'http://localhost:8080';
export const server = {
  LOGIN_URL: `login`,
  REFRESH_TOKEN_URL: `refresh/token`,
  REGISTER_URL: `register`,
  PRODUCT_URL: `product`,
  ORDER_URL: `order`,
  REPORT_URL: `report`,
  TOKEN_KEY: `token`,
  REFRESH_TOKEN_KEY: `refresh_token`,
  STAT_ENDPOINT: `stat`,
  COSTSTAT_ENDPOINT: `coststat`,
};

export const Roles = [
  { name: "Admin", credentials: "admin" },
  { name: "Staff", credentials: "staff" },
];
