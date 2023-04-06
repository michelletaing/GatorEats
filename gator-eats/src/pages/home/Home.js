import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Home.css';
import { Container, Grid, CardActionArea } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { Typography } from '@mui/material';

function Home() {

    const mockLocations = [
        { name: "Gator Corner Dining Center", description: "description here", imageUrl: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"},
        { name: "Broward Dining", description: "description here", imageUrl: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"},
        { name: "Chick-Fil-A", description: "description here", imageUrl: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"},
        { name: "Panda Express", description: "description here", imageUrl: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"},
        { name: "Pollo Tropical", description: "description here", imageUrl: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"},
        { name: "Starbucks @ The Hub", description: "description here", imageUrl: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
    ];

    const navigate = useNavigate();

    const handleClick = (locationName) => {
        navigate(`/menus/${locationName}`);
    };

    return (
        <Container fixed>
            <h1>Locations</h1>
            <Grid container spacing={2}>
                {mockLocations.map((item, index) => 
                <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card>
                        <CardActionArea onClick={() => handleClick(item.name)}>
                            <CardMedia component="img" image={item.imageUrl} />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {item.name}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {item.description}
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Grid>
                )}
            </Grid>
        </Container>
    );
}

export default Home;