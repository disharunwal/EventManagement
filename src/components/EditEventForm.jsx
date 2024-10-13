import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EventCreationForm.css';
import { TextField, Checkbox, Button, FormControlLabel, FormGroup } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

const EditEventForm = ({ events, onSave }) => {
  const navigate = useNavigate();
  const { id } = useParams();
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
    images: [],
  });

  useEffect(() => {
    
    const eventToEdit = events.find((event) => event.id === parseInt(id, 10));
    if (eventToEdit) {
      setEventData(eventToEdit);
    }
  }, [id, events]);

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
    onSave(eventData); 
    navigate('/events');
  };

  return (
    <div className="event-creation-container">
      <div className="header-image">
        <img 
          src="https://img.freepik.com/premium-vector/event-management-wedding-planner-manager-planning-event-conference-party_501813-2157.jpg" 
          alt="Event Editing" 
          className="welcome-image" 
        />
      </div>

      <form className="event-form" onSubmit={handleSubmit}>
        <h2>Edit Event</h2>
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

    
        <div className="input-container">
          <LocationOnIcon className="input-icon" />
          <TextField
            name="location"
            label="Location"
            variant="outlined"
            fullWidth
            value={eventData.location}
            onChange={handleChange}
            required
          />
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

        {/* Image Upload Field */}
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
          Update Event
        </Button>
      </form>
    </div>
  );
};

export default EditEventForm;
