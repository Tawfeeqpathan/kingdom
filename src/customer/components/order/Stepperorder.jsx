import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

const steps = [
  'Placed',
  'Order Confirmed',
  'Shipped',
  'Out of delivery',
  'Delivered'
];

export default function Stepperorder({activeStep}) {
  return (
    <Box sx={{ width: '90%'}}>
      <Stepper activeStep={activeStep} alternativeLabel>
       
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      </Box>
  );
}