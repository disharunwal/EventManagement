import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './EventCreationForm.css';
import { TextField, Checkbox, Button, FormControlLabel, FormGroup } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import { Autocomplete } from '@react-google-maps/api';

const libraries = ['places']; // Necessary to load Places API

const EventCreationForm = ({ onAddEvent, onEdit }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [isEditing, setIsEditing] = useState(false);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    location: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    organizer: '',
    isPublic: true,
    images: [] 
  });

  const [autocomplete, setAutocomplete] = useState(null);

  useEffect(() => {
    if (location.state && location.state.event) {
      setEventData(location.state.event);
      setIsEditing(true);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEventData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleCheckboxChange = (type) => {
    setEventData((prevData) => ({
      ...prevData,
      isPublic: type === 'public',
    }));
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length <= 3) {
      const imageURLs = files.map(file => URL.createObjectURL(file));
      setEventData((prevData) => ({
        ...prevData,
        images: imageURLs,
      }));
    } else {
      alert('You can select up to 3 images.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      onEdit(eventData);
    } else {
      const newEvent = {
        ...eventData,
        id: Date.now(),
      };
      onAddEvent(newEvent);
    }
    navigate('/events');
  };


  const onPlaceSelected = (autocomplete) => {
    const place = autocomplete.getPlace();
    const address = place.formatted_address || place.name;
    setEventData((prevData) => ({
      ...prevData,
      location: address,
    }));
  };

  return (
    <div className="event-creation-container">
      <div className="header-image">
        <img 
          src="https://img.freepik.com/premium-vector/event-management-wedding-planner-manager-planning-event-conference-party_501813-2157.jpg" 
          alt="Event Creation" 
          className="welcome-image" 
        />
      </div>

      <form className="event-form" onSubmit={handleSubmit}>
        <h2>{isEditing ? 'Edit Event' : 'Create Event'}</h2>
        <div className="person-image-container">
          <img 
            src="https://img.freepik.com/premium-vector/upcoming-event-neon-sign-text-vector_118419-486.jpg" 
            alt="Organizer"
            className="person-image"
          />
        </div>

        <div className="input-container">
          <EventIcon className="input-icon" />
          <TextField
            name="title"
            label="Event Title"
            variant="outlined"
            fullWidth
            value={eventData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-container">
          <DescriptionIcon className="input-icon" />
          <TextField
            name="description"
            label="Event Description"
            variant="outlined"
            fullWidth
            multiline
            rows={3}
            value={eventData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Google Places Autocomplete */}
        <div className="input-container">
          <LocationOnIcon className="input-icon" />
          <Autocomplete
            onLoad={(autocomplete) => setAutocomplete(autocomplete)}
            onPlaceChanged={() => onPlaceSelected(autocomplete)}
            fields={['formatted_address', 'name']}
          >
            <TextField
              name="location"
              label="Location"
              variant="outlined"
              fullWidth
              value={eventData.location}
              onChange={handleChange}
              required
            />
          </Autocomplete>
        </div>

        <div className="input-container">
          <AccessTimeIcon className="input-icon" />
          <TextField
            name="startDate"
            label="Start Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={eventData.startDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-container">
          <AccessTimeIcon className="input-icon" />
          <TextField
            name="startTime"
            label="Start Time"
            type="time"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={eventData.startTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-container">
          <AccessTimeIcon className="input-icon" />
          <TextField
            name="endDate"
            label="End Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={eventData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-container">
          <AccessTimeIcon className="input-icon" />
          <TextField
            name="endTime"
            label="End Time"
            type="time"
            InputLabelProps={{ shrink: true }}
            fullWidth
            value={eventData.endTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-container">
          <PersonIcon className="input-icon" />
          <TextField
            name="organizer"
            label="Organizer"
            variant="outlined"
            fullWidth
            value={eventData.organizer}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-container">
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            style={{ display: 'none' }}
            id="image-upload"
          />
          <label htmlFor="image-upload">
            <Button variant="outlined" component="span">
              Upload Images (Max 3)
            </Button>
          </label>
          {eventData.images.length > 0 && (
            <div className="image-preview-container">
              {eventData.images.map((image, index) => (
                <img key={index} src={image} alt={`Event Preview ${index + 1}`} className="image-preview" />
              ))}
            </div>
          )}
        </div>

        <FormGroup row className="checkbox-container">
          <FormControlLabel
            control={
              <Checkbox
                checked={eventData.isPublic}
                onChange={() => handleCheckboxChange('public')}
                name="isPublic"
                color="primary"
              />
            }
            label="Public Event"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={!eventData.isPublic}
                onChange={() => handleCheckboxChange('private')}
                name="isPrivate"
                color="primary"
              />
            }
            label="Private Event"
          />
        </FormGroup>

        <Button 
          type="submit" 
          variant="contained" 
          color="primary"
          className="submit-btn"
        >
          {isEditing ? 'Update Event' : 'Create Event'}
        </Button>
      </form>
    </div>
  );
};

export default EventCreationForm;
