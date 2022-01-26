import React from 'react';
import NumberFormat from 'react-number-format'
import PropTypes from 'prop-types';

import {
  TextField
} from '@material-ui/core/';

export const InputCNPJ = ({ value, onChange, Tipo }) => {

  const NumberFormatCustom = (props) => {
    const { inputRef, onChange, ...other } = props;

    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={(values) => {
          onChange({
            target: {
              name: props.name,
              value: values.value,
            },
          });
        }}
        isNumericString
        format={Tipo === 'J' ? "##.###.###/####-##" : "###.###.###-##"}
        mask="_"
      />
    );
  }

  NumberFormatCustom.propTypes = {
    inputRef: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  return (
    <TextField
      label={Tipo === 'J' ? "CNPJ" : "CPF"}
      value={value}
      onChange={(e) => onChange(e)}
      name="CNPJ"
      disabled={true}
      InputProps={{
        inputComponent: NumberFormatCustom,
      }}
      style={{
        width: Tipo === 'J' ? '150px' : '120px',
      }}
    />
  )
}
