import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import * as listproActions from '../../actions/listpro.action';
import { server } from '../../constants';

export default (props) => {
  const dispatch = useDispatch();
  const [multiselect, setMultiselect] = useState([]);
  const listproReducer = useSelector(({ listproReducer }) => listproReducer);
  useEffect(() => {
    console.log(multiselect);
  }, [multiselect]);

  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push('/login');
    }
    dispatch(listproActions.getDropdownProduct());
  }, []);

  const showForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
  }) => {
    return (
      <form role='form' onSubmit={handleSubmit}>
        <div class='card-body'>
        <div class='form-group '>
            <Select
            placeholder={'Product Name'}
              value={multiselect}
              onChange={setMultiselect}
              isMulti
              closeMenuOnSelect={false}
              options={listproReducer.options ? listproReducer.options : null}
            />
          </div>
          <div className='form-group input-group has-feedback'>
            <input
              type='date'
              name='tanggal'
              onChange={handleChange}
              value={values.tanggal}
              className='form-control'
              placeholder='Production Date'
              className={
                errors.tanggal && touched.tanggal
                  ? 'form-control is-invalid'
                  : 'form-control'
              }
            />
            {errors.tanggal && touched.tanggal ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.tanggal}
              </small>
            ) : null}
          </div>
          <div className='form-group input-group has-feedback'>
            <textarea
              name='quantity'
              onChange={handleChange}
              value={values.quantity}
              className='form-control'
              placeholder='Quanity'
              className={
                errors.quantity && touched.quantity
                  ? 'form-control is-invalid'
                  : 'form-control'
              }
            ></textarea>
            {errors.quantity && touched.quantity ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.quantity}
              </small>
            ) : null}
          </div>
          <div className='form-group input-group has-feedback'>
          <select 
          name='order'
          id="order"
            onChange={handleChange}
              value={values.order}
              className='form-control'
              placeholder='Order Unit'>
  <option value="">Quantity Unit</option>
  <option value="kg">KG</option>
  <option value="pcs">PCS</option>
</select>
            {errors.order && touched.order ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.order}
              </small>
            ) : null}
          </div>
          <div className='form-group input-group has-feedback'>
            <input
              type='date'
              name='duedate'
              onChange={handleChange}
              value={values.duedate}
              className='form-control'
              placeholder='Due Date'
              className={
                errors.duedate && touched.duedate
                  ? 'form-control is-invalid'
                  : 'form-control'
              }
            />
            {errors.duedate && touched.duedate ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.duedate}
              </small>
            ) : null}
          </div>
          <div className='form-group input-group has-feedback'>
            <input
              type='text'
              name='description'
              onChange={handleChange}
              value={values.description}
              className='form-control'
              placeholder='Description'
              className={
                errors.description && touched.description
                  ? 'form-control is-invalid'
                  : 'form-control'
              }
            />
            <div class='input-group-append col-3'>
            </div>
            {errors.description && touched.description ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.description}
              </small>
            ) : null}
          </div>
          <div className='form-group input-group has-feedback'>
            <input
              type='text'
              name='cost'
              onChange={handleChange}
              value={values.cost}
              className='form-control'
              placeholder='Cost'
              className={
                errors.cost && touched.cost
                  ? 'form-control is-invalid'
                  : 'form-control'
              }
            />
            <div class='input-group-append col-3'>
            </div>
            {errors.cost && touched.cost ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.cost}
              </small>
            ) : null}
          </div>
          <div className='form-group input-group has-feedback'>
          <select 
          name='status'
          id="status"
            onChange={handleChange}
              value={values.status}
              className='form-control'
              placeholder='Status'>
                <option value="">Status</option>
              <option value="progress">progress</option>
              <option value="done">Done</option>
              </select>
            <div class=''>
              <div class=''>
                
              </div>
            </div>
            {errors.status && touched.status ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.status}
              </small>
            ) : null}
          </div>
         
          <div class='row'>
            <div class='offset-md-4 col-4'>
              <button
                type='submit'
                disabled={isSubmitting}
                class='btn btn-primary btn-block'
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  };

  return (
    <div className='content-wrapper'>
      <div className='content-header'>
        <div className='container-fluid'>
          <div className='row mb-2'>
            <div className='col-sm-6'>
              <h1 className='m-0 text-dark'>Create Production Data</h1>
            </div>
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      <div className='content'>
        <div class='card card-primary'>
          <div class='card-header'></div>

          <Formik
            initialValues={{
              tanggal: '',
              quantity: '',
              order: '',
              duedate: '',
              description: '',
              product: '',
              cost: '',
              status: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              let formData = new FormData();
              formData.append('tanggal', values.tanggal);
              formData.append('quantity', values.quantity);
              formData.append('order', values.order);
              formData.append('duedate', values.duedate);
              formData.append('description', values.description);
              formData.append('cost', values.cost);
              formData.append('status', values.status);
              let result = multiselect.map((arr) => arr.value);
              console.log(result);
              formData.append('product', result);
              dispatch(listproActions.Create(formData, props.history));
              setSubmitting(false);
            }}
            // validationSchema={Create_Schema}
          >
            {/* {this.showForm()}            */}
            {(props) => showForm(props)}
          </Formik>
        </div>
        {/* /.card */}
      </div>
    </div>
  );
};
