
import React from 'react';
import { useParams } from 'react-router-dom';
import Slider from 'react-slick';
import initialEvents from '../data/events.json'; 
import './EventDetailView.css'; 

const EventDetailView = () => {
  const { id } = useParams();
  const event = initialEvents.find(event => event.id === parseInt(id));

  if (!event) {
    return <p>Event not found.</p>;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="event-detail-container">
      <h2>{event.title}</h2>
      <Slider {...settings} className="event-carousel">
        {event.images.map((image, index) => (
          <div key={index} className="carousel-image-container">
            <img src={image} alt={`Event ${index + 1}`} className="carousel-image" />
          </div>
        ))}
      </Slider>
      <p><strong>Description:</strong> {event.description}</p>
      <p><strong>Location:</strong> {event.location}</p>
      <p><strong>Date:</strong> {new Date(event.date).toLocaleString()} - {new Date(event.endDate).toLocaleString()}</p>
      <p><strong>Organizer:</strong> {event.organizer}</p>
      <p><strong>Status:</strong> {event.isPublic ? 'Public' : 'Private'}</p>
    </div>
  );
};

export default EventDetailView;
