import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import * as listproActions from '../../actions/listpro.action';
import { server } from '../../constants';
import Select from 'react-select';
export default (props) => {
  const dispatch = useDispatch();
  const [multiselect, setMultiselect] = useState([]);
  const listproReducer = useSelector(({ listproReducer }) => listproReducer);

  useEffect(() => {
    if (localStorage.getItem(server.TOKEN_KEY) === null) {
      return props.history.push('/login');
    }
    const { id } = props.match.params;
    
    dispatch(listproActions.getSingleListpro(id));
    dispatch(listproActions.clearState());
    
  }, []);
  useEffect(() => {
    if (listproReducer.result) {
      let initial_image = {
        file_obj: '',
        frontimage: listproReducer.result.frontimage,
      };
      showPreviewImage(initial_image);
    }
  }, [listproReducer]);
  const showPreviewImage = (values) => {
    return (
      <img
        id='frontimage'
        src={
          values.file_obj != null
            ? values.file_obj
            : process.env.REACT_APP_LISTPRO_FRONT_IMAGE_PATH +
              '/' +
              values.frontimage
        }
        class='img-fluid'
        width={300}
      />
    );
  };
  const renderSelectwithSelected = () => {
    {
      if (listproReducer.result) {
        return (
          <div class='form-group '>
            <Select
              name='product'
              defaultValue={
                listproReducer.result
                  ? listproReducer.result.product.map((val) => {
                      return {
                        value: val._id,
                        label: val.name,
                      };
                    })
                  : null
              }
              onChange={setMultiselect}
              isMulti
              closeMenuOnSelect={false}
              options={listproReducer.options ? listproReducer.options : null}
            />
          </div>
        );
      } else {
        return null; // or loading graphic
      }
    }
  };
  const showForm = ({
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isSubmitting,
    setFieldValue,
  }) => {
    return (
      <form role='form' onSubmit={handleSubmit}>
        <div class='card-body'>
          <input
            type='hidden'
            name='_id'
            onChange={handleChange}
            value={values._id}
          />
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
            <div class='input-group-append col-3'>
              <div class='input-group-text'>
              </div>
            </div>
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
              placeholder='Quantity'
              className={
                errors.quantity && touched.quantity
                  ? 'form-control is-invalid'
                  : 'form-control'
              }
            ></textarea>
            <div class='input-group-append'>
              <div class='input-group-text'>
              </div>
            </div>
            {errors.quantity && touched.quantity ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.quantity}
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
            <div class='input-group-append col-3'>
              <div class='input-group-text'>
              </div>
            </div>
            {errors.duedate && touched.duedate ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.duedate}
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
              <option value="kg">KG</option>
              <option value="pcs">PCS</option>
              </select>
            <div class='input-group-append col-3'>
              <div class='input-group-text'>
              </div>
            </div>
            {errors.order && touched.order ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.order}
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
              <div class='input-group-text'>
              </div>
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
              <div class='input-group-text'>
              </div>
            </div>
            {errors.cost && touched.cost ? (
              <small id='passwordHelp' class='text-danger'>
                {errors.cost}
              </small>
            ) : null}
          </div>
          <div className="form-group input-group has-feedback">
            <select
              name="status"
              id="status"
              onChange={handleChange}
              value={values.status}
              className="form-control"
              placeholder="Status"
            >
              <option value="">Status</option>
              <option value="progress">Progress</option>
              <option value="done">Done</option>
            </select>
            {errors.status && touched.status ? (
              <small id="passwordHelp" class="text-danger">
                {errors.status}
              </small>
            ) : null}
          </div>
          {renderSelectwithSelected()}
          {/* <div class='form-group '>{showPreviewImage(values)}</div>

          <div class='form-group '>
            <div class='input-group col-5'>
              <div class='custom-file'>
                <input
                  type='file'
                  onChange={(e) => {
                    e.preventDefault();
                    setFieldValue('frontimage', e.target.files[0]); // for upload
                    setFieldValue(
                      'file_obj',
                      URL.createObjectURL(e.target.files[0])
                    ); // for preview image
                  }}
                  name='frontimage'
                  className={
                    errors.frontimage && touched.frontimage
                      ? 'form-control is-invalid'
                      : 'form-control'
                  }
                  accept='image/*'
                  id='exampleInputFile'
                />
                <label class='custom-file-label' for='exampleInputFile'>
                  file
                </label>
              </div>
            </div>
          </div> */}

          <div class='row'>
            <div class='offset-md-4 col-4'>
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
              <h1 className='m-0 text-dark'>Update Production Data</h1>
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
              listproReducer.result
                ? listproReducer.result
                : { tanggal: '', quantity: '', order: '', duedate: '', description: '', cost: '', status: '' }
            }
            onSubmit={(values, { setSubmitting }) => {
              let formData = new FormData();
              formData.append('id', listproReducer.result._id);
              formData.append('tanggal', values.tanggal);
              formData.append('quantity', values.quantity);
              formData.append('order', values.order);
              formData.append('duedate', values.duedate);
              formData.append('description', values.description);
              formData.append('cost', values.cost);
              formData.append('status', values.status);
             
              let result = multiselect.map((arr) => arr.value);

              formData.append('product', result);
              if (values.frontimage) {
                formData.append('frontimage', values.frontimage);
              }
              dispatch(listproActions.Update(formData, props.history));
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
