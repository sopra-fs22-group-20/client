import {
  FormControl, Grid, InputLabel, MenuItem, Select,
} from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';

const CATEGORIES = [
  { value: 'Autos', name: 'Autos' },
  { value: 'Katzen', name: 'Katzen' },
  { value: 'Hunde', name: 'Hunde' },
  { value: 'New', name: '...suggest new category' },
];

function CustomSelect({ categories, label, value }) {
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={value}
        label={label}
      >
        {
          CATEGORIES.map((x, index) => (
            <MenuItem value={x.value} key={`${index}_value`}>
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
  onChange: PropTypes.func.isRequired,
};

export default CustomSelect;
