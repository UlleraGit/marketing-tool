import { useState } from 'react';
import { Typography, Grid, Radio, RadioGroup, FormControlLabel, Button, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

const RatingScale = ({ question, options, onSubmit, id }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(selectedValue);
  };

  const prevId = Number(id) - 1;
  const nextId = Number(id) + 1;

  return (
    <Box
      id={`question-${id}`}
      sx={{
        display: 'flex',
        minWidth: '90vw',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          minWidth: '90vw',
          width: '90vw',
          height: '90vh',
          boxShadow: '0 3px 10px rgb(0 0 0 / 1)',
          borderRadius: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '60%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <Typography component="h5" variant="h5" fontSize="40px" fontWeight="bold">
            {id}. {question}
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '600px',
              justifyContent: 'flex-start',
              alignContent: 'flex-start',
              height: '250px',
              gap: '4%',
            }}
          >
            <RadioGroup name={`rating-${id}`} value={selectedValue} onChange={handleChange} row>
              {options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                  sx={{
                    width: '99%',
                    height: '20%',
                    color: selectedValue === option.value ? '#fff' : '#0000ff',
                    borderColor: selectedValue === option.value ? '#0000ff' : '#0000ff',
                    backgroundColor: selectedValue === option.value ? '#0000ff' : '#fff',
                    '&:hover': {
                      backgroundColor: selectedValue === option.value ? '#0000ff' : '#0000ff',
                      color: '#fff',
                      borderColor: '#0000ff',
                    },
                    borderRadius: '10px',
                  }}
                />
              ))}
            </RadioGroup>
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            borderRadius: '0 20px 20px 0',
            minWidth: '40%',
            width: '40%',
            backgroundImage: `url(https://images.unsplash.com/photo-1417325384643-aac51acc9e5d?q=75&fm=jpg)`,
            backgroundSize: '100% 100%',
            justifyContent: 'flex-end',
            alignContent: 'flex-end',
            alignItems: 'flex-end',
            gap: '10px 20px',
          }}
        >
          {id === 1 ? (
            <Box
              sx={{
                width: '129px',
                height: '40px',
                backgroundColor: '#0000ff',
                borderRadius: '10px',
                marginRight: '30px',
                marginBottom: '3px',
              }}
            >
              <Button
                href={`#question-${nextId}`}
                sx={{
                  color: '#fff',
                  height: '100%',
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ArrowDropDownIcon />
              </Button>
            </Box>
          ) : (
            <Box
              sx={{
                display: 'flex',
                width: '129px',
                height: '40px',
                backgroundColor: '#0000ff',
                borderRadius: '10px',
                marginRight: '30px',
                marginBottom: '3px',
              }}
            >
              <Button
                href={`#question-${prevId}`}
                sx={{
                  color: '#fff',
                  height: '100%',
                  width: '49%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ArrowDropUpIcon />
              </Button>
              <Box sx={{ backgroundColor: '#fff', width: '1%', height: '100%' }} />
              <Button
                href={`#question-${nextId}`}
                sx={{
                  color: '#fff',
                  height: '100%',
                  width: '49%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <ArrowDropDownIcon />
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default RatingScale;
