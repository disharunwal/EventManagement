// EditEventForm.jsx
import React, { useState, useEffect } from 'react';
import { TextField, Checkbox, Button, FormControlLabel, FormGroup } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';
import './EventCreationForm.css';

const EditEventForm = ({ event, onSave }) => {
  const [eventData, setEventData] = useState(event);

  useEffect(() => {
    setEventData(event);
  }, [event]);

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
  };

  return (
    <form className="event-form" onSubmit={handleSubmit}>
      <h2>Edit Event</h2>
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
            />
          }
          label="Public Event"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={!eventData.isPublic}
              onChange={() => handleCheckboxChange('private')}
            />
          }
          label="Private Event"
        />
      </FormGroup>

      <Button variant="contained" color="primary" type="submit" style={{ marginTop: '10px' }}>
        Save Changes
      </Button>
    </form>
  );
};

export default EditEventForm;
