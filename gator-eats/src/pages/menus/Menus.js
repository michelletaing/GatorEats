import React from 'react';
import { useParams } from 'react-router-dom';
import { Container, Paper, Typography } from '@mui/material';

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
      <h1>{menu.title}</h1>

      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        {menu.items.map((item, index) => (
          <Typography gutterBottom variant="h5" component="h2">
            {item}
          </Typography>
        ))}
      </Paper>

    </Container>
  );
}

export default Menus;