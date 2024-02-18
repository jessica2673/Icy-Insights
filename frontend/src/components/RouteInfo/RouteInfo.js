import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const RiskChip = ({ risk, selectedRisk }) => {
    let chipColor = 'default'; // Default color

    if (risk === selectedRisk) {
        switch (risk) {
            case ('Low'):
                chipColor = 'success';
                break;
            case ('Medium'):
                chipColor = 'warning';
                break;
            default:
                chipColor = 'error';
        }
    }

    return <Chip color={chipColor} label={`${risk} Risk`} size="large" />;
};

export default function YourComponent({ accordionData, selectedRisk, handleButtonClick }) {
    return (
        <div>
            {accordionData && Array.isArray(accordionData) && accordionData.map(item => (
                <Accordion key={item.id}>
                    <AccordionSummary expandIcon={<ArrowDropDownIcon />} aria-controls={`panel${item.id}-content`} id={`panel${item.id}-header`}>
                        <Box sx={{ p: 2 }}>
                            <Stack direction="row" spacing={2}>
                                <RiskChip risk="Low" selectedRisk={item.risk} sx={{ width: '40px', height: '40px' }} />
                                <RiskChip risk="Medium" selectedRisk={item.risk} sx={{ width: '40px', height: '40px' }} />
                                <RiskChip risk="High" selectedRisk={item.risk} sx={{ width: '40px', height: '40px' }} />
                            </Stack>
                        </Box>
                    </AccordionSummary>

                    <AccordionDetails>
                        <Box>
                            <Typography variant="body1" sx={{ mx: 3, mt: -2 }}>
                                <strong>Time:</strong> {item.time}
                            </Typography>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="body1" sx={{ mx: 3 }}>
                                <strong>Percent Plowed:</strong> {item.percentPlowed}%
                            </Typography>
                        </Box>
                        <Button variant="contained" onClick={() => handleButtonClick(item.id)} sx={{ my: 2, mx: 2 }}>Select</Button>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
}
