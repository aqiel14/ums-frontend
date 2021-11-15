import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Payment from './payment';
import * as productActions from '../../actions/product.action';
import * as shopActions from '../../actions/shop.action';
import NumberFormat from 'react-number-format';
import { Link } from 'react-router-dom';
import Table from '../Table';
import cashier from './cashier.png';
import './create.css';
export default (props) => {
  const shopReducer = useSelector(({ shopReducer }) => shopReducer);
  const productReducer = useSelector(({ productReducer }) => productReducer);
  const [data, setData] = useState([]);

  const dispatch = useDispatch();

  const columns = React.useMemo(
    () => [
      {
        Header: 'product',
        accessor: 'name',
        id: 'alias', // accessor is the "key" in the data
      },
      {
        Header: 'Price',
        accessor: 'price',
      },
      {
        Header: 'Stock',
        accessor: 'stock',
      },
      {
        Header: 'Action',
        accessor: (data) => {
          if (data.stock > 0) {
            return (
              <Link
                type='button'
                class='btn btn-primary'
                onClick={() => dispatch(shopActions.addOrder(data))}
              >
                <i class='fa fa-cart-plus'></i> Add to Cart
              </Link>
            );
          } else {
            return (
              <a type='button' class='btn btn-secondary'>
                Out Of Stock
              </a>
            );
          }
        },
      },
    ],
    []
  );
  const Holdon = (columns) => {
    if (productReducer.result) {
      console.log(productReducer.result);
      return <Table columns={columns} data={productReducer.result} />;
    } else {
      return <p>LOADING</p>;
    }
  };

  const renderPayment = () => {
    return (
      <div className='col-md-8' style={{ maxHeight: 710 }}>
        <Payment order={shopReducer.mOrderLines} />
      </div>
    );
  };

  const renderOrder = () => {
    const { mOrderLines } = shopReducer;

    return mOrderLines.map((item) => {
      console.log(item.image);
      return (
        <tr>
          <td>{item.name}</td>
          <td>
            <button
              type='button'
              class='btn btn-danger btn-number'
              onClick={() => dispatch(shopActions.minusOrder(item))}
            >
              -
            </button>
            <input
              type='number'
              class='form-control input-number'
              value={item.qty}
              name='qty'
              onChange={(e) =>
                dispatch(shopActions.qtyOrder(item, e.target.value))
              }
            />
            <button
              type='button'
              class='btn btn-success btn-number'
              onClick={() => dispatch(shopActions.plusOrder(item))}
            >
              +
            </button>
          </td>
          <td>{item.price}</td>
          <td>
            <Link
              type='button'
              class='btn btn-danger'
              onClick={() => dispatch(shopActions.removeOrder(item))}
            >
              <i class='fa fa-trash'></i>
            </Link>
          </td>
        </tr>
      );
    });
  };
  const isSelectedItem = (product) => {
    let index = shopReducer.mOrderLines.indexOf(product);
    return index !== -1;
  };

  function showCartButton(item) {
    if (item.qty != 0) {
      <Link
        type='button'
        class='btn btn-primary'
        onClick={() => dispatch(shopActions.addOrder(item))}
      >
        <i class='fa fa-cart-plus'></i> Add to Cart
      </Link>;
    }
  }

  const CartSection = (index) => {
    return (
      <>
        <div className='row'>
          <table class='table table-hover shopping-cart-wrap'>
            <thead class='text-muted'>
              <tr>
                <th scope='col'>Tax</th>
                <th scope='col' width='120'>
                  Total
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <NumberFormat
                    value={shopReducer.mTaxAmt}
                    displayType={'text'}
                    thousandSeparator={true}
                    decimalScale={2}
                    fixedDecimalScale={true}
                    prefix={'IDR '}
                  />
                </td>
                <td>
                  <NumberFormat
                    value={shopReducer.mTotalPrice}
                    displayType={'text'}
                    decimalScale={2}
                    thousandSeparator={true}
                    prefix={'IDR '}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className='row'>
          {shopReducer.mTotalPrice > 0 && !shopReducer.mIsPaymentMade && (
            <Link
              type='button'
              class='btn btn-success btn-block'
              onClick={() => dispatch(shopActions.togglePaymentState())}
            >
              <i class='fa fa-cart-plus'></i> Payment
            </Link>
          )}
        </div>
        <div className='row'>
          {shopReducer.mOrderLines.length > 0 ? (
            <table class='table table-hover'>
              <thead class='text-muted'>
                <tr>
                  <th scope='col'>Item</th>
                  <th scope='col' width='120'>
                    Qty
                  </th>
                  <th scope='col' width='120'>
                    Price
                  </th>
                  <th scope='col' class='text-right'></th>
                </tr>
              </thead>
              <tbody>{renderOrder()}</tbody>
            </table>
          ) : (
            <img src={cashier} style={{ width: 200 }} />
          )}
        </div>
      </>
    );
  };

  const renderProductRows = () => {
    if (productReducer.result) {
      //console.log(productReducer.result);
      const { result } = productReducer;
      return (
        <div className='card-body table-responsive p-0'>
          <table className='table table-hover text-nowrap'>
            <thead>
              <tr>
                <th>Product Image</th>
                <th>Name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {productReducer.result ? (
                productReducer.result.map((data, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img
                          class='img-fluid img-rounded'
                          width={200}
                          src={
                            process.env.REACT_APP_PRODUCT_IMAGE_PATH +
                            '/' +
                            data.image
                          }
                        />
                      </td>
                      <td>{data.name}</td>
                      <td>{data.stock}</td>
                      <td>{data.price}</td>
                      <td>
                        {data.stock > 0 ? (
                          <Link
                            type='button'
                            class='btn btn-primary'
                            onClick={() => dispatch(shopActions.addOrder(data))}
                          >
                            <i class='fa fa-cart-plus'></i> Add to Cart
                          </Link>
                        ) : (
                          <a type='button' class='btn btn-secondary'>
                            Out Of Stock
                          </a>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  {' '}
                  <td> No data </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      );
    } else {
      return 'loading...';
    }
  };

  const renderProductRowsLAMA = () => {
    if (productReducer.result) {
      //console.log(productReducer.result);
      const { result } = productReducer;
      return (
        <div className='row col-16'>
          {result &&
            result.map((item, index) => {
              return (
                <>
                  {index % 3 === 0 && <div class='w-100 d-lg-none mt-4'></div>}
                  <div class='col-md-6 col-lg-4 col-xl-3 py-2'>
                    <div className='card h-100'>
                      <img
                        className='card-img-top img-fluid'
                        src={
                          process.env.REACT_APP_PRODUCT_IMAGE_PATH +
                          '/' +
                          item.image
                        }
                        alt='Card image cap'
                      />
                      <div className='card-body'>
                        <h4 className='card-title'>{item.name}</h4>
                        <p className='card-text'>Price {item.price}</p>
                        {/* <input
                          type='text'
                          name='price'
                          // value=
                          className='form-control'
                          placeholder={item.qty}
                        /> */}
                        <p className='card-text'>
                          <small className='text-muted'>
                            remain {item.qty ? item.stock : item.stock} items
                          </small>
                          {isSelectedItem(item) && (
                            <div
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                              }}
                            >
                              <small className='text-muted'>
                                X {item.qty} items
                              </small>
                            </div>
                          )}
                        </p>
                        {item.stock > 0 ? (
                          <Link
                            type='button'
                            class='btn btn-primary'
                            onClick={() => dispatch(shopActions.addOrder(item))}
                          >
                            <i class='fa fa-cart-plus'></i> Add to Cart
                          </Link>
                        ) : (
                          <a type='button' class='btn btn-secondary'>
                            Out Of Stock
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      );
    } else {
      return 'loading...';
    }
  };

  useEffect(() => {
    dispatch(productActions.Index());
  }, []);

  return (
    <div className='content-wrapper'>
      {/* Content Header (Page header) */}
      <div className='content-header'>
        <div className='container-fluid'>
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <h1 className='m-0 text-dark'>Cashier Page</h1>
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      <section className='content'>
        <div className='container-fluid'>
          <div className='row'>
            <div
              className='col-9'
              data-spy='scroll'
              data-target='.navbar'
              data-offset='50'
            >
              {shopReducer.mIsPaymentMade
                ? renderPayment()
                : Holdon(columns, data)}
            </div>
            <div className='col-3'>{CartSection()}</div>
          </div>
        </div>
      </section>
    </div>
  );
};
