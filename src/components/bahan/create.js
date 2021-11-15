import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import * as bahanActions from '../../actions/bahan.action';
import { server } from '../../constants';

export default (props) => {
  const dispatch = useDispatch();
  const [multiselect, setMultiselect] = useState([]);
  const bahanReducer = useSelector(({ bahanReducer }) => bahanReducer);
  useEffect(() => {
    console.log(multiselect);
  }, [multiselect]);

  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push('/login');
    }
    dispatch(bahanActions.getDropdownProduct());
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
              options={bahanReducer.options ? bahanReducer.options : null}
            />
          </div>
          <div className='form-group input-group has-feedback'>
            <textarea
              name='amount'
              onChange={handleChange}
              value={values.amount}
              className='form-control'
              placeholder='Amount'
              className={
                errors.amount && touched.amount
                  ? 'form-control is-invalid'
                  : 'form-control'
              }
            ></textarea>
            <div class=''>
              <div class=''>
                
              </div>
            </div>
            {errors.amount && touched.amount ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.amount}
              </small>
            ) : null}
          </div>
          <div className='form-group input-group has-feedback'>
            <input
              type='text'
              name='materialname'
              onChange={handleChange}
              value={values.materialname}
              className='form-control'
              placeholder='Material Name'
              className={
                errors.alias && touched.alias
                  ? 'form-control is-invalid'
                  : 'form-control'
              }
            />
            {errors.alias && touched.alias ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.materialname}
              </small>
            ) : null}
          </div>
         
          <div className='form-group input-group has-feedback'>
            <input
              type='text'
              name='materialneeded'
              onChange={handleChange}
              value={values.materialneeded}
              className='form-control'
              placeholder='Material Needed'
              className={
                errors.materialneeded && touched.materialneeded
                  ? 'form-control is-invalid'
                  : 'form-control'
              }
            />
            
            {errors.materialneeded && touched.materialneeded ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.materialneeded}
              </small>
            ) : null}
          </div>
          <div className='form-group input-group has-feedback'>
          <select 
          name='materialunit'
          id="materialunit"
            onChange={handleChange}
              value={values.materialunit}
              className='form-control'
              placeholder='Material Unit'>
                <option value="">Material Unit</option>
              <option value="kg">KG</option>
              <option value="pcs">PCS</option>
              </select>
            <div class=''>
              <div class=''>
                
              </div>
            </div>
            {errors.materialunit && touched.materialunit ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.materialunit}
              </small>
            ) : null}
          </div>
          <div className='form-group input-group has-feedback'>
          <select 
          name='prounit'
          id="prounit"
            onChange={handleChange}
              value={values.prounit}
              className='form-control'
              placeholder='Product Unit'>
                <option value="">Product Unit</option>
              <option value="kg">KG</option>
              <option value="pcs">PCS</option>
              </select>
            <div class=''>
              <div class=''>
                
              </div>
            </div>
            {errors.prounit && touched.prounit ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.prounit}
              </small>
            ) : null}
          </div>
       
          {/* <div className='form-group input-group has-feedback'>
            <input
              type='text'
              name='stock'
              onChange={handleChange}
              value={values.stock}
              className='form-control'
              placeholder='Material Stock'
              className={
                errors.stock && touched.stock
                  ? 'form-control is-invalid'
                  : 'form-control'
              }
            />
            <div class=''>
              <div class=''>
                
              </div>
            </div>
            {errors.stock && touched.stock ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.stock}
              </small>
            ) : null}
          </div> */}
         
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
              <h1 className='m-0 text-dark'>Create Production Material Data</h1>
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
              materialname: '',
              amount: '',
              materialneeded: '',
              materialunit: '',
              prounit: '',
              product: '',
              status: '',
            }}
            onSubmit={(values, { setSubmitting }) => {
              let formData = new FormData();
              formData.append('materialname', values.materialname);
              formData.append('amount', values.amount);
              formData.append('materialneeded', values.materialneeded);
              formData.append('materialunit', values.materialunit);
              formData.append('prounit', values.prounit);
              formData.append('status', values.status);
              let result = multiselect.map((arr) => arr.value);
              console.log(result);
              formData.append('product', result);
              dispatch(bahanActions.Create(formData, props.history));
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
