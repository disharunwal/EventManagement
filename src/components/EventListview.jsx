import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Carousel from 'react-material-ui-carousel';
import { Card, CardContent, CardMedia, Typography, Button, Box } from '@mui/material';
import './EventListView.css';

const EventListView = ({ events, onDelete }) => {
  const navigate = useNavigate(); 

  return (
    <div className="event-list">
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((event) => (
          <Card key={event.id} className={`event-card ${event.isPublic ? 'public' : 'private'}`}>
            <Carousel autoPlay={true} interval={3000} animation="slide">
              {event.images.map((image, index) => (
                <CardMedia
                  key={index}
                  component="img"
                  image={image}
                  alt={`Event image ${index + 1}`}
                  height="200"
                />
              ))}
            </Carousel>

            <CardContent>
              <Typography variant="h5" component="div">
                {event.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {event.description}
              </Typography>
              <Typography variant="body2">
                <strong>Location:</strong> {event.location}
              </Typography>
              <Typography variant="body2">
                <strong>Date:</strong> {new Date(event.date).toLocaleString()} - {new Date(event.endDate).toLocaleString()}
              </Typography>
              <Typography variant="body2">
                <strong>Organizer:</strong> {event.organizer}
              </Typography>
              <Typography variant="body2">
                <strong>Status:</strong> {event.isPublic ? 'Public' : 'Private'}
              </Typography>
            </CardContent>

            <Box className="card-actions" sx={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
              <Link to={`/events/${event.id}`} className="details-link">
                <Button variant="contained" color="primary">
                  View Details
                </Button>
              </Link>
              <Button
                variant="contained"
                color="warning"
                onClick={() => navigate(`/edit-event/${event.id}`)} // Navigate to edit page
              >
                Edit
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => onDelete(event.id)}
              >
                Delete
              </Button>
            </Box>
          </Card>
        ))
      )}
    </div>
  );
};

export default EventListView;
