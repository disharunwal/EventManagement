import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import Carousel from 'react-material-ui-carousel';
import { Card, CardContent, CardMedia, Typography, Button, Box, Drawer } from '@mui/material';
import EditEventForm from './EditEventForm';
import './EventListView.css';

const EventListView = ({ events, onDelete, onEdit }) => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const toggleDrawer = (event) => {
    setOpenDrawer(event);
  };

  const handleEditClick = (event) => {
    setCurrentEvent(event);
    toggleDrawer(true);
  };

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
              {/* <Link to={`/events/${event.id}`} className="details-link">
                <Button variant="contained" color="primary">
                  View Details
                </Button>
              </Link> */}
              <Button
                variant="contained"
                color="warning"
                onClick={() => handleEditClick(event)} 
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

    
      <Drawer anchor="right" open={openDrawer} onClose={() => toggleDrawer(false)}>
        <EditEventForm event={currentEvent} onSave={(updatedEvent) => {
          onEdit(updatedEvent);
          toggleDrawer(false);
        }} />
      </Drawer>
    </div>
  );
};

export default EventListView;
