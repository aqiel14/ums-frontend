import React, { useEffect } from 'react';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import * as machineActions from '../../actions/machine.action';
import * as Yup from 'yup';
import { server } from '../../constants';
const Create_Schema = Yup.object().shape({
   machinename: Yup.string()
    .min(2, 'name is Too Short!')
    .max(50, 'name is Too Long!')
    .required('name is Required'),
  operator: Yup.string().required(),
  description: Yup.string().required('Description is required'),
  capacity: Yup.string().required('Capacity is required'),
  unit: Yup.string().required('Unit is required'),
  status: Yup.string().required('Status is required'),
});
export default (props) => {
  const dispatch = useDispatch();
  const machineReducer = useSelector(({ machineReducer }) => machineReducer);
  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push('/login');
    }
    const { id } = props.match.params;
    dispatch(machineActions.getSingleMachine(id));
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
          <div class='row'>
            <input
              type='hidden'
              name='_id'
              onChange={handleChange}
              value={values._id}
            />
            <div className='form-group col-md-6 input-group has-feedback'>
              <input
                type='text'
                name='machinename'
                onChange={handleChange}
                value={values.machinename}
                className='form-control'
                placeholder='Machine Name'
                className={
                  errors.machinename && touched.machinename
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
              />
              <div class='input-group-append'>
                <div class='input-group-text'>
                  <span class='fas fa-user'></span>
                </div>
              </div>
              {errors.machinename && touched.machinename ? (
                <small id='passwordHelp' class='text-danger'>
                  {errors.machinename}
                </small>
              ) : null}
            </div>
          </div>
          <div class='row'>
            <div className='form-group col-md-8 input-group has-feedback'>
              <textarea
                name='operator'
                onChange={handleChange}
                value={values.operator}
                className='form-control'
                placeholder='Machine operator'
                className={
                  errors.operator && touched.operator
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
              ></textarea>
              <div class='input-group-append'>
                <div class='input-group-text'>
                  <span class='fas fa-building'></span>
                </div>
              </div>
              {errors.operator && touched.operator ? (
                <small id='passwordHelp' class='text-danger'>
                  {errors.operator}
                </small>
              ) : null}
            </div>
          </div>
          <div class='row'>
            <div className='form-group col-md-8 input-group has-feedback'>
              <textarea
                name='capacity'
                onChange={handleChange}
                value={values.capacity}
                className='form-control'
                placeholder='Capacity'
                className={
                  errors.capacity && touched.capacity
                    ? 'form-control is-invalid'
                    : 'form-control'
                }
              ></textarea>
              <div class='input-group-append'>
                <div class='input-group-text'>
                  <span class='fas fa-building'></span>
                </div>
              </div>
              {errors.capacity && touched.capacity ? (
                <small id='passwordHelp' class='text-danger'>
                  {errors.capacity}
                </small>
              ) : null}
            </div>
          </div>
          <div className='form-group input-group has-feedback'>
          <select 
          name='unit'
          id="unit"
            onChange={handleChange}
              value={values.unit}
              className='form-control'
              placeholder='Unit'>
              <option value="">Unit</option>
  <option value="ton">TON</option>
  <option value="pcs">PCS</option>
  <option value="kg">KG</option>
              </select>
            <div class='input-group-append col-3'>
              <div class='input-group-text'>
              </div>
            </div>
            {errors.unit && touched.unit ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.unit}
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
            {errors.description && touched.description ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.tel}
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
  <option value="ready">Ready</option>
  <option value="maintanance">Maintenance</option>
  <option value="damaged">Damaged</option>
  <option value="down">Down</option>
              </select>
            <div class='input-group-append col-3'>
              <div class='input-group-text'>
              </div>
            </div>
            {errors.status && touched.status ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.status}
              </small>
            ) : null}
          </div>
          <div class='row'>
            <div class='offset-md-1 col-4'>
              <button
                type='submit'
                disabled={isSubmitting}
                class='btn btn-primary btn-block'
              >
                Update  
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
              <h1 className='m-0 text-dark'>Update Machine Information</h1>
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
            enableReinitialize={true}
            initialValues={
              machineReducer.result
                ? machineReducer.result
                : { machinename: '', operator: '', capacity: '', unit: '', description: '', status: '', }
            }
            onSubmit={(values, { setSubmitting }) => {
              dispatch(machineActions.Update(values, props.history));
              setSubmitting(false);
            }}
            validationSchema={Create_Schema}
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
