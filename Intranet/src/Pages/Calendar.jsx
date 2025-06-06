import React, { useState } from 'react';
import { Calendar, Views } from 'react-big-calendar';
import localizer from '../Utils/CalendarLocalizer';
import { Container, Row, Col, Button, Modal, Form, ButtonGroup } from 'react-bootstrap';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CalendarData from '../Data/CalendarData';

const CustomToolbar = (props) => {
    const { label, onNavigate, onView, view } = props;

    const handlePrev = () => {
        onNavigate('PREV');
    };

    const handleNext = () => {
        onNavigate('NEXT');
    };

    const handleToday = () => {
        onNavigate('TODAY');
    };

    const handleViewDay = () => {
        onView(Views.DAY);
    };

    const handleViewWeek = () => {
        onView(Views.WEEK);
    };

    const handleViewMonth = () => {
        onView(Views.MONTH);
    };

    return (
        <div className="d-flex justify-content-between align-items-center mb-2">
            <ButtonGroup>
                <Button variant="outline-primary" onClick={handlePrev}>
                    Previous
                </Button>
                <Button variant="outline-primary" onClick={handleToday}>
                    Today
                </Button>
                <Button variant="outline-primary" onClick={handleNext}>
                    Next
                </Button>
            </ButtonGroup>

            <h5 className="m-0">{label}</h5>

            <ButtonGroup>
                <Button
                    variant={view === Views.DAY ? 'primary' : 'outline-primary'}
                    onClick={handleViewDay}
                >
                    Day
                </Button>
                <Button
                    variant={view === Views.WEEK ? 'primary' : 'outline-primary'}
                    onClick={handleViewWeek}
                >
                    Week
                </Button>
                <Button
                    variant={view === Views.MONTH ? 'primary' : 'outline-primary'}
                    onClick={handleViewMonth}
                >
                    Month
                </Button>
            </ButtonGroup>
        </div>
    );
};

const CalendarPage = () => {
    const [date, setDate] = useState(new Date());
    const [view, setView] = useState(Views.WEEK);

    const [events, setEvents] = useState(CalendarData);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [newEvent, setNewEvent] = useState({
        title: '',
        start: '',
        end: '',
        desc: '',
    });

    const handleSelectEvent = (event) => {
        setSelectedEvent(event);
        setShowSidebar(true);
    };

    const handleCloseSidebar = () => {
        setSelectedEvent(null);
        setShowSidebar(false);
    };

    const handleSelectSlot = (slotInfo) => {
        setNewEvent({
            title: '',
            start: slotInfo.start,
            end: slotInfo.end,
            desc: '',
        });
        setShowModal(true);
    };

    const handleSaveEvent = () => {
        if (!newEvent.title.trim()) return;

        const eventToAdd = {
            id: events.length + 1,
            title: newEvent.title,
            start: newEvent.start,
            end: newEvent.end,
            desc: newEvent.desc,
        };

        setEvents([...events, eventToAdd]);
        setNewEvent({ title: '', start: '', end: '', desc: '' });
        setShowModal(false);
    };

    const handleUpdateEvent = (updatedEvent) => {
        setEvents((prevEvents) =>
            prevEvents.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
        );
        setSelectedEvent(updatedEvent);
    };

    const handleDeleteEvent = (eventId) => {
        setEvents(events.filter((ev) => ev.id !== eventId));
        handleCloseSidebar();
    };

    // Odkomentowana i zaimplementowana funkcja handleNavigate
    const handleNavigate = (newDate, newView, action) => {
        setDate(newDate);
    };

    const handleViewChange = (newView) => {
        setView(newView);
    };

    return (
        <Container fluid className="p-3">
            <Row>
                <Col md={showSidebar ? 9 : 12}>
                    <Calendar
                        localizer={localizer}
                        events={events}
                        startAccessor="start"
                        endAccessor="end"
                        style={{ height: '80vh' }}
                        selectable
                        views={['day', 'week', 'month']}
                        date={date}
                        view={view}
                        min={new Date(1970, 0, 1, 6, 0, 0)}
                        max={new Date(1970, 0, 1, 22, 0, 0)}
                        onSelectEvent={handleSelectEvent}
                        onSelectSlot={handleSelectSlot}
                        onNavigate={handleNavigate}
                        onView={handleViewChange}
                        components={{
                            toolbar: CustomToolbar,
                        }}
                    />
                </Col>
                {showSidebar && (
                    <Col md={3}>
                        <div className="border p-3">
                            <h5>Event Description</h5>
                            <p>
                                <strong>Title: </strong> {selectedEvent?.title}
                            </p>
                            <p>
                                <strong>Description: </strong> {selectedEvent?.desc}
                            </p>
                            <p>
                                <strong>From: </strong>{' '}
                                {selectedEvent?.start?.toLocaleString('pl-PL')}
                            </p>
                            <p>
                                <strong>To: </strong>{' '}
                                {selectedEvent?.end?.toLocaleString('pl-PL')}
                            </p>

                            <Button
                                variant="outline-secondary"
                                className="me-2"
                                onClick={() =>
                                    handleUpdateEvent({
                                        ...selectedEvent,
                                        title: selectedEvent.title + ' (Edytowane)',
                                    })
                                }
                            >
                                Edit
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => handleDeleteEvent(selectedEvent.id)}
                            >
                                Delete
                            </Button>
                            <hr />
                            <Button
                                variant="secondary"
                                onClick={handleCloseSidebar}
                                className="mt-2"
                            >
                                Cancel
                            </Button>
                        </div>
                    </Col>
                )}
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add New Event</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={newEvent.title}
                                onChange={(e) =>
                                    setNewEvent({ ...newEvent, title: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={newEvent.desc}
                                onChange={(e) =>
                                    setNewEvent({ ...newEvent, desc: e.target.value })
                                }
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Start Date: {newEvent.start.toString()}</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>End Date: {newEvent.end.toString()}</Form.Label>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSaveEvent}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default CalendarPage;
