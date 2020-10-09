import React from 'react';
import { FormGroup, Label, Input } from 'reactstrap';
import { useField } from 'formik';

const CustomInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <FormGroup>
      <Label for={props.name}>{label}</Label>
      <Input {...field} {...props} />
      {
        meta.touched && meta.error ? (
          <p className='text-danger small'>{meta.error}</p>
        ) : null
      }
    </FormGroup>
  )
}

export default CustomInput;
