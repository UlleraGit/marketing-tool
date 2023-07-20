import { useState } from 'react';
import { Typography, Grid, Radio, RadioGroup, FormControlLabel, Button } from '@mui/material';

const LikertScale = () => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Selected value:', selectedValue);
    // You can perform additional actions with the selected value here
  };

  return (
    <>
      <Typography variant="h4" align="center" gutterBottom>
        Likert Scale Question
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item>
            <Typography variant="subtitle1" align="center">
              Strongly Disagree
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <RadioGroup
              name="likertScale"
              value={selectedValue}
              onChange={handleChange}
              row
            >
              <FormControlLabel
                value="1"
                control={<Radio />}
                label="1"
              />
              <FormControlLabel
                value="2"
                control={<Radio />}
                label="2"
              />
              <FormControlLabel
                value="3"
                control={<Radio />}
                label="3"
              />
              <FormControlLabel
                value="4"
                control={<Radio />}
                label="4"
              />
              <FormControlLabel
                value="5"
                control={<Radio />}
                label="5"
              />
            </RadioGroup>
          </Grid>
          <Grid item>
            <Typography variant="subtitle1" align="center">
              Strongly Agree
            </Typography>
          </Grid>
        </Grid>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          size="large"
          fullWidth
          sx={{ marginTop: 4 }}
        >
          Submit
        </Button>
      </form>
    </>
  );
};

export default LikertScale;
