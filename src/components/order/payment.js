import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TransactionRequest } from './transaction';
import * as shopActions from '../../actions/shop.action';
import { Formik, Form, Field } from 'formik';

export default (props) => {
  const shopReducer = useSelector(({ shopReducer }) => shopReducer);
  const dispatch = useDispatch();
  const [user_id, setUser_id] = useState();
  useEffect(() => {
    getcurrentRole();
  }, []);
  const getcurrentRole = () => {
    let token = localStorage.getItem('token');
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );

    let { id } = JSON.parse(jsonPayload);
    console.log(id);
    setUser_id(id);
  };

  const isMustChanged = (values) => {
    try {
      return values.given > shopReducer.mTotalPrice;
    } catch (err) {
      return false;
    }
  };

  const updateChange = (given, setFieldValue) => {
    let change = given - shopReducer.mTotalPrice;
    if (change > 0) {
      setFieldValue('change', change);
    } else {
      setFieldValue('change', 0);
    }
  };

  const onClickGiven = (newValue, oldValue, setFieldValue) => {
    const newGiven = newValue + oldValue;
    console.log(newValue);
    setFieldValue('given', newGiven);
    updateChange(newGiven, setFieldValue);
  };

  const onClickExact = (setFieldValue) => {
    setFieldValue('given', shopReducer.mTotalPrice);
    updateChange(0, setFieldValue);
  };

  const onClickSubmit = (values) => {
    let trans = new TransactionRequest();
    trans.total = shopReducer.mTotalPrice;
    trans.paid = values.given;
    trans.change = values.change;
    trans.payment_type = 'cash';
    trans.payment_detail = 'full';
    trans.user_id = user_id;
    trans.order_list = props.order;
    console.log(props.order);
    console.log();
    dispatch(shopActions.submitPayment(trans));
  };

  const showForm = ({ values, setFieldValue }) => {
    return (
      <div>
        <div className='row'>
          <div className='col'>
            {isMustChanged(values) && (
              <div class='input-group mb-3'>
                <div class='input-group-prepend'>
                  <span class='input-group-text' id='basic-addon1'>
                    Change
                  </span>
                </div>
                <input
                  type='text'
                  readonly='readonly'
                  name='change'
                  value={values.change}
                  className='form-control'
                  placeholder='Change'
                />
              </div>
            )}
            <div class='input-group mb-3'>
              <div class='input-group-prepend'>
                <span class='input-group-text' id='basic-addon1'>
                  Given
                </span>
              </div>
              <input
                type='text'
                readonly='readonly'
                name='given'
                value={values.given}
                className='form-control'
                placeholder='Given'
              />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <button
              onClick={() => onClickGiven(100000, values.given, setFieldValue)}
              className='btn btn-primary btn-lg btn-block'
              type='button'
            >
              100000
            </button>
          </div>
          <div className='col'>
            <button
              onClick={() => onClickGiven(50000, values.given, setFieldValue)}
              className='btn btn-primary btn-lg btn-block'
              type='button'
            >
              50000
            </button>
          </div>
          <div className='col'>
            <button
              onClick={() => onClickGiven(10000, values.given, setFieldValue)}
              className='btn btn-primary btn-lg btn-block'
              type='button'
            >
              10000
            </button>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <button
              onClick={() => onClickGiven(5000, values.given, setFieldValue)}
              className='btn btn-primary btn-lg btn-block'
              type='button'
            >
              5000
            </button>
          </div>
          <div className='col'>
            <button
              onClick={() => onClickGiven(2000, values.given, setFieldValue)}
              className='btn btn-primary btn-lg btn-block'
              type='button'
            >
              2000
            </button>
          </div>
          <div className='col'>
            <button
              onClick={() => onClickGiven(1000, values.given, setFieldValue)}
              className='btn btn-primary btn-lg btn-block'
              type='button'
            >
              1000
            </button>
          </div>
        </div>
        <div className='row'>
          <div className='col'>
            <button
              onClick={() => setFieldValue('given', 0)}
              className='btn btn-danger btn-lg btn-block'
              type='button'
            >
              Clear
            </button>
          </div>
          <div className='col'>
            <button
              onClick={() => onClickExact(setFieldValue)}
              className='btn btn-primary btn-lg btn-block'
              type='button'
            >
              Exact
            </button>
          </div>
          <div className='col'>
            <button
              onClick={() => onClickSubmit(values)}
              className='btn btn-success btn-lg btn-block'
              type='button'
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <Formik initialValues={{ given: 0 }}>{(props) => showForm(props)}</Formik>
    </div>
  );
};
