import React from 'react';
import './Menus.css';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DatePicker } from '@mui/x-date-pickers';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


function Menus() {
  const { locationName } = useParams();
  

  const mockMenus = [
    { title: "Gator Corner Dining Center", items: ["Item 1", "Item 2", "Item 3"] },
    { title: "Broward Dining", items: ["Item 1", "Item 2", "Item 3"] },
    { title: "Chick-Fil-A", items: ["Item 1", "Item 2", "Item 3"] },
    { title: "Panda Express", items: ["Item 1", "Item 2", "Item 3"] },
    { title: "Pollo Tropical", items: ["Item 1", "Item 2", "Item 3"] },
    { title: "Starbucks @ The Hub", items: ["Item 1", "Item 2", "Item 3"] }
  ];


  const menu = mockMenus.find(menu => menu.title.replace(/ /g, "-") === locationName);

  if (!menu)
    return <div>Menu not found</div>;

  return (
    <Container fixed>
      <Paper sx={{ mb: '1rem', boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;' }}>
        <Typography variant="h3" align="center" sx={{ pt: '1rem'}} gutterBottom>{menu.title}</Typography>
        <Typography variant="h4" align="center" sx={{ pb: '1rem' }} gutterBottom>Weekly Hours</Typography>
      </Paper>

      <LocalizationProvider dateAdapter={AdapterDayjs} >
        <DatePicker sx={{ mb: '1rem'}} label="Select a day" />
      </LocalizationProvider>

      <div>
      <Accordion sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography variant="h2" sx={{ fontFamily: 'Syne' }}>Breakfast</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h2" sx={{ fontFamily: 'Syne' }}>Lunch</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px;' }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography variant="h2" sx={{ fontFamily: 'Syne' }}>Dinner</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            malesuada lacus ex, sit amet blandit leo lobortis eget.
          </Typography>
        </AccordionDetails>
      </Accordion>
      </div>

    </Container>
  );
}

export default Menus;