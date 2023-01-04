import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function NewToggleButton(props) {
  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  

  return (
    <ToggleButtonGroup
      value={alignment}
      color="primary"
      exclusive
      onChange={handleChange}
      aria-label="Platform"
      size='large'
      sx={{width:'100%', my:"10px", backgroundColor:"#fff"}}
    >
        {props.value.map((content)=>(
        <ToggleButton key={content} value={content} sx={{width:100/props.value.length + "%"}}>{content}</ToggleButton>))}
      </ToggleButtonGroup>
  );
}