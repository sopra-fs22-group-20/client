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
// TODO: categories must be different on different views (f.e. upload with new category and home rating only categories)

/*
const handleSetCategory = (event) => {
  const newValue = event.target.value;
  if (newValue === 'New') {
    setIsNewCategory(true);
  }
  setCategory(event.target.value);
};

if (CATEGORIES.length === 0) {
  return null;
}
*/

const CustomSelect = (props) => {
  <Grid item>
    <FormControl>
      <InputLabel id="demo-simple-select-label">Category</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={props.value}
        label={props.label}
//        onChange={(e) => handleSetCategory(e.target.value)}
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
  </Grid>;
};

CustomSelect.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default CustomSelect;
