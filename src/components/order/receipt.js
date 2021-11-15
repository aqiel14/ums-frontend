import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as orderActions from '../../actions/order.action';
import * as userActions from '../../actions/user.action';
import * as Yup from 'yup';
import { server } from '../../constants';
import './receipt.css';
import moment from 'moment';
import { Link } from 'react-router-dom';
import jsPDFInvoiceTemplate, {
  OutputType,
  jsPDF,
} from 'jspdf-invoice-template';

export default (props) => {
  const dispatch = useDispatch();
  const orderReducer = useSelector(({ orderReducer }) => orderReducer);
  const userReducer = useSelector(({ userReducer }) => userReducer);
  const [orderlist, setOrderlist] = useState([]);
  const [user, setUser] = useState([]);

  const decodeJWT = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  //   const order_list = [
  //     {
  //       _id: '1',
  //       name: 'OJOL',
  //       stock: 14,
  //       price: 12000,
  //       created: '2021-07-09T19:22:45.462Z',
  //       __v: 0,
  //       image: '1625858565502+OJOL.jpg',
  //       qty: 4,
  //     },
  //     {
  //       _id: '2',
  //       name: 'ODOL',
  //       stock: 11,
  //       price: 1200,
  //       created: '2021-07-09T19:22:45.462Z',
  //       __v: 0,
  //       image: '1625858565502+ODOL.jpg',
  //       qty: 6,
  //     },
  //   ];

  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push('/login');
    }
    const { id } = props.match.params;

    dispatch(orderActions.getSingleOrder(id));

    if (orderReducer.result) {
      console.log(orderReducer.result);
    } else {
      console.log('erorr');
    }
  }, []);

  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push('/login');
    }

    dispatch(
      userActions.getSingleUser(
        decodeJWT(localStorage.getItem(server.TOKEN_KEY)).id
      )
    );

    if (userReducer.result) {
      let user = userReducer.result;
    }
    setUser({ user });
  }, []);

  const renderTable = () => {
    if (userReducer.result) {
      //   console.log(userReducer.result);
      const userResult = userReducer;
      return (
        <div id='mid'>
          <div className='info'>
            <h3>Contact Info</h3>

            <p>
              {userResult.result.company_name}
              <br />
              Email : {userResult.result.email}
              <br />
              Phone : {userResult.result.phone}
              <br />
            </p>
          </div>
        </div>
      );
    } else {
      return 'loading...';
    }
  };

  const showReceipt = ({ values, handleSubmit, isSubmitting }) => {
    if (orderReducer.result) {
      const result = orderReducer.result;
      console.log(result.total);
      return (
        <form role='form' onSubmit={handleSubmit}>
          <div id='invoice-POS'>
            <center id='top'>
              <div className='logo' />
              <div className='info'>
                <h2>Order Receipt #{result.order_id}</h2>
              </div>
            </center>

            {renderTable()}
            <div id='bot'>
              <div id='table'>
                <table>
                  <tbody>
                    <tr className='tabletitle'>
                      <td className='item'>
                        <h2>Product</h2>
                      </td>
                      <td className='Hours'>
                        <h2>Qty</h2>
                      </td>
                      <td className='Rate'>
                        <h2>Sub Total</h2>
                      </td>
                    </tr>

                    {result.order_list &&
                      result.order_list.map((orders) => {
                        return (
                          <tr className='service'>
                            <td className='tableitem'>
                              <p className='itemtext'>{orders.name}</p>
                            </td>
                            <td className='tableitem'>
                              <p className='itemtext'>{orders.qty}</p>
                            </td>
                            <td className='tableitem'>
                              <p className='itemtext'>
                                Rp. {orders.qty * orders.price}
                              </p>
                            </td>
                          </tr>
                        );
                      })}
                    {/* {values.order_list.flat().map((orders) => {
                      renderTable(orders.order_list);
                    })} */}
                    <tr className='tabletitle'>
                      <td />
                      <td className='Rate'>
                        <h2>tax</h2>
                      </td>
                      <td className='payment'>
                        <h2>Rp. 0</h2>
                      </td>
                    </tr>
                    <tr className='tabletitle'>
                      <td />
                      <td className='Rate'>
                        <h2>Total</h2>
                      </td>
                      <td className='payment'>
                        <h2>Rp. {result.total}</h2>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div id='legalcopy'>
                <p className='legal'>
                  <strong>Order Date : </strong>&nbsp;{' '}
                  {moment(values.created).format('DD MMMM YYYY HH:MM')}
                </p>
              </div>
            </div>
            <button
              type='submit'
              disabled={isSubmitting}
              class='btn btn-primary btn-block'
            >
              Print
            </button>
          </div>
        </form>
      );
    } else {
      return 'Loading..';
    }
  };

  return (
    <div>
      <div className='content-header'>
        <Link
          to={'/order'}
          type='button'
          class='btn btn-primary'
          style={{ 'margin-right': '5px' }}
          onClick={() => dispatch(orderActions.Back(props.history))}
        >
          Back
        </Link>
      </div>
      <div className='content'>
        <div class='card-header'></div>
        <h1></h1>

        <Formik
          initialValues={orderReducer.result ? orderReducer.result : {}}
          onSubmit={(values, { setSubmitting }) => {
            console.log(orderReducer.result);
            var receiptProps = {
              outputType: OutputType.Save,
              returnJsPDFDocObject: true,
              fileName:
                userReducer.result.company_name +
                ' Order Receipt #' +
                orderReducer.result.order_id,
              orientationLandscape: false,

              contact: {
                label: 'Receipt',
                name: userReducer.result.company_name,
                address: userReducer.result.address,
                phone: userReducer.result.tel,
                email: userReducer.result.email,
              },
              invoice: {
                label: 'Receipt #: ',
                num: orderReducer.result.order_id,
                invDate:
                  'Receipt Date: ' +
                  moment(orderReducer.result.created).format(
                    'DD MMMM YYYY HH:MM'
                  ),
                // invGenDate: 'Invoice Date: 02/02/2021 10:17',
                headerBorder: false,
                tableBodyBorder: false,
                header: ['#', 'Product', 'Price', 'Quantity', 'Total'],
                table: Array.from(
                  orderReducer.result.order_list,
                  (item, index) => [
                    index + 1,
                    item.name,
                    item.price,
                    item.qty,
                    item.price * item.qty,
                  ]
                ),
                invTotalLabel: 'Total:',
                invTotal: orderReducer.result.total.toString(),
                invCurrency: 'IDR',
                // row1: {
                //   col1: 'Tax:',
                //   col2: '20',
                //   col3: '%',
                //   style: {
                //     fontSize: 10, //optional, default 12
                //   },
                // },
                // row2: {
                //   col1: 'SubTotal:',
                //   col2: '116,199.90',
                //   col3: 'ALL',
                //   style: {
                //     fontSize: 10, //optional, default 12
                //   },
                // },
                invDescLabel: 'Invoice Note',
                invDesc: 'ASD',
              },

              pageEnable: true,
              pageLabel: 'Page ',
            };
            jsPDFInvoiceTemplate(receiptProps);

            setSubmitting(false);
          }}
        >
          {/* {this.showForm()}            */}
          {(props) => showReceipt(props)}
        </Formik>

        {/* /.card */}
      </div>
    </div>
  );
};
