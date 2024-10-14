// App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LoadScript } from '@react-google-maps/api';
import EventCreationForm from './components/EventCreationForm';
import EventListView from './components/EventListView';
import EditEventForm from './components/EditEventForm';
import SearchBar from './components/SearchBar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import './components/Sidebar.css';
import initialEvents from './data/events.json';

const libraries = ['places'];

const App = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    searchTerm: '',
    location: '',
    date: '',
  });

  useEffect(() => {
    setEvents(initialEvents);
  }, []);

  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [...prevEvents, newEvent]);
  };

  const deleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  const editEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) => (event.id === updatedEvent.id ? updatedEvent : event))
    );
  };

  const filteredEvents = events.filter((event) => {
    const matchesSearchTerm =
      event.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(filters.searchTerm.toLowerCase());

    const matchesLocation =
      !filters.location || event.location === filters.location;

    const matchesDate = !filters.date || event.date === filters.date;

    return matchesSearchTerm && matchesLocation && matchesDate;
  });

  return (
    <Router>
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_API_KEY" libraries={libraries}>
        <div className="app-container">
          <aside className="sidebar">
            <h2>Event Management</h2>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/events">Event List</Link>
              </li>
              <li>
                <Link to="/create">Create Event</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
            </ul>
          </aside>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/events"
                element={
                  <>
                    <SearchBar onSearch={setFilters} />
                    <EventListView
                      events={filteredEvents}
                      onDelete={deleteEvent}
                    />
                  </>
                }
              />
              <Route
                path="/create"
                element={<EventCreationForm onAddEvent={addEvent} />}
              />
              <Route
                path="/edit-event/:id"
                element={<EditEventForm events={events} onSave={editEvent} />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </main>
        </div>
      </LoadScript>
    </Router>
  );
};

export default App;
