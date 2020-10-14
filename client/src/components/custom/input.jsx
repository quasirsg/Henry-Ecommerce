import React, { useState, createRef } from 'react';
import { FileImage } from 'react-bootstrap-icons';
import { FormGroup, Label, Input, Button } from 'reactstrap';
import { useField } from 'formik';

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [uploadFile, setFile] = useState({
    ok: field.value ? true : false,
    name: ''
  });

  const fileInput = createRef();

  const handleChangeFile = (e) => {
    setFile({
      ok: true,
      name: e.target.files[0].name
    })
    props.setFieldValue('image', e.target.files[0]);
  }

  /*
  const handleChange = (e) => {
    if (field.name === 'category') props.setFieldValue(e.target.name, [...Array.from(e.target.selectedOptions, (item) => item.value)])
  }
  */
  return (
    <FormGroup>
      <Label for={props.name}>{label}</Label>
      {
        props.type === 'file' ?
          <>
            <input
              type='file'
              name='image'
              style={{ display: "none" }}
              onChange={handleChangeFile}
              ref={fileInput}
            />
            <Button block color='default' className='d-block border text-secondary' type="button" onClick={() => fileInput.current.click()}>
              <FileImage className='mr-1' size={20} />
              {uploadFile.ok ? '1 Archivo seleccionado' : 'Seleccionar archivo'}
            </Button>
          </> : <Input {...field} {...props} style={{maxHeight: '4rem'}}/>
      }
      {
        meta.touched && meta.error ? (
          <p className='text-danger small'>{meta.error}</p>
        ) : null
      }
    </FormGroup>
  )
}

export default CustomInput;
