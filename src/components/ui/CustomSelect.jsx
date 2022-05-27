import {
  FormControl, InputLabel, MenuItem, Select,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

function CustomSelect({
  autoWidth, categories, label, value, onChange,
}) {
  return (
    <FormControl sx={{ m: 1, minWidth: 80 }}>
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
        categories={categories}
        onChange={(e) => {
          console.log('test');

          onChange(e.target.value);
        }}
        autoWidth={autoWidth}
      >
        {
          categories.map((x, index) => (
            <MenuItem value={x.name} key={`${index}_value`}>
              {x.name}
            </MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
}

CustomSelect.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  autoWidth: PropTypes.any.isRequired,
};

export default CustomSelect;
