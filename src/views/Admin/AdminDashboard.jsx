// // AdminDashboard_Rewrite.jsx
// // Single-file React implementation containing:
// // - AdminDashboard (default export)
// // - EventFormModal
// // - VolunteerListModal
// // - Header (simple top header to import into your layout)
// // This file expects your existing services in ../../services/* to remain the same.

// import React, { useEffect, useState } from 'react';
// import EventForm from './EventForm'; // kept for backwards-compat if you want to reuse — optional
// import {
//   getEvents,
//   createEvent,
//   updateEvent,
//   deleteEvent,
// } from '../../services/eventService';
// import { assignVolunteer, removeVolunteer } from '../../services/volunteerService';
// import { getCurrentUser, logout } from '../../services/authService';
// import '../components/DashboardLayout.css'

// // -----------------------------
// // EventFormModal (keeps class names from your original EventForm)
// // -----------------------------
// export function EventFormModal({ isOpen, onClose, selectedEvent, onSubmit }) {
//   const [title, setTitle] = useState('');
//   const [capacity, setCapacity] = useState(10);
//   const [date, setDate] = useState('');

//   useEffect(() => {
//     if (selectedEvent) {
//       setTitle(selectedEvent.title || '');
//       setCapacity(selectedEvent.capacity || 10);
//       // selectedEvent.date might be ISO; safely handle it
//       setDate(selectedEvent.date ? selectedEvent.date.split('T')[0] : '');
//     } else {
//       setTitle('');
//       setCapacity(10);
//       setDate('');
//     }
//   }, [selectedEvent]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ title, capacity: Number(capacity), date }, !!selectedEvent);
//     // leave modal closing up to parent (so it can refresh then close)
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="modal-backdrop fixed inset-0 z-40 flex items-center justify-center">
//       <div className="modal p-4 bg-white rounded shadow w-full max-w-lg z-50">
//         <form onSubmit={handleSubmit} className="p-4">
//           <h3 className="font-bold mb-2">{selectedEvent ? 'Update Event' : 'Create Event'}</h3>
//           <input
//             type="text"
//             placeholder="Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="border p-2 rounded w-full mb-2"
//             required
//           />
//           <input
//             type="number"
//             placeholder="Capacity"
//             value={capacity}
//             onChange={(e) => setCapacity(e.target.value)}
//             className="border p-2 rounded w-full mb-2"
//             required
//           />
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             className="border p-2 rounded w-full mb-2"
//             required
//           />

//           <div className="flex gap-2 justify-end">
//             <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded">
//               Cancel
//             </button>
//             <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded">
//               {selectedEvent ? 'Update' : 'Create'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// // -----------------------------
// // VolunteerListModal
// // -----------------------------
// export function VolunteerListModal({ isOpen, onClose, event, onRefresh }) {
//   const [studentId, setStudentId] = useState('');
//   const [loading, setLoading] = useState(false);

//   if (!isOpen || !event) return null;

//   const handleAssign = async () => {
//     if (!studentId) return;
//     setLoading(true);
//     try {
//       await assignVolunteer(event.id, studentId);
//       setStudentId('');
//       onRefresh();
//     } catch (err) {
//       console.error(err);
//       alert(err?.response?.data?.detail || 'Failed to assign');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemove = async (volId) => {
//     if (!window.confirm('Remove volunteer?')) return;
//     setLoading(true);
//     try {
//       await removeVolunteer(event.id, volId);
//       onRefresh();
//     } catch (err) {
//       console.error(err);
//       alert(err?.response?.data?.detail || 'Failed to remove');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="modal-backdrop fixed inset-0 z-40 flex items-center justify-center">
//       <div className="modal p-4 bg-white rounded shadow w-full max-w-md z-50">
//         <div className="p-2">
//           <div className="flex justify-between items-center mb-2">
//             <h4 className="font-semibold">Manage Volunteers for {event.title}</h4>
//             <button onClick={onClose} className="px-2 py-1 bg-gray-200 rounded">Close</button>
//           </div>

//           <div className="flex gap-2 my-2">
//             <input
//               type="text"
//               placeholder="Student ID"
//               value={studentId}
//               onChange={(e) => setStudentId(e.target.value)}
//               className="border p-1 rounded flex-1"
//             />
//             <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={handleAssign} disabled={loading}>
//               Assign
//             </button>
//           </div>

//           <ul className="max-h-48 overflow-auto">
//             {event.volunteers && event.volunteers.length ? (
//               event.volunteers.map((vol) => (
//                 <li key={vol} className="flex justify-between items-center py-1">
//                   <span>{vol}</span>
//                   <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleRemove(vol)} disabled={loading}>
//                     Remove
//                   </button>
//                 </li>
//               ))
//             ) : (
//               <li>No volunteers yet</li>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// // -----------------------------
// // Small Header component
// // -----------------------------
// export function HeaderTop({ onLogout }) {
//   const admin = getCurrentUser();
//   return (
//     <header className="flex justify-between mb-6 items-center">
//       <h1 className="text-2xl font-bold">Welcome, {admin?.name || 'Admin'}</h1>
//       <div className="flex items-center gap-3">
//         <button onClick={onLogout} className="px-4 py-2 bg-red-500 text-white rounded">Logout</button>
//       </div>
//     </header>
//   );
// }

// // -----------------------------
// // AdminDashboard (default export)
// // Keeps classnames similar to your original so existing CSS works
// // -----------------------------
// export default function AdminDashboard() {
//   const [events, setEvents] = useState([]);
//   const [selectedEvent, setSelectedEvent] = useState(null);
//   const [refreshFlag, setRefreshFlag] = useState(false);
//   const [isEventModalOpen, setIsEventModalOpen] = useState(false);
//   const [isVolunteerModalOpen, setIsVolunteerModalOpen] = useState(false);
//   const [volEventContext, setVolEventContext] = useState(null);

//   useEffect(() => {
//     fetchEvents();
//   }, [refreshFlag]);

//   const fetchEvents = async () => {
//     try {
//       const data = await getEvents();
//       setEvents(data);
//     } catch (err) {
//       console.error('Failed fetching events', err);
//       alert('Failed to fetch events');
//     }
//   };

//   const openCreateModal = () => {
//     setSelectedEvent(null);
//     setIsEventModalOpen(true);
//   };

//   const handleEdit = (event) => {
//     setSelectedEvent(event);
//     setIsEventModalOpen(true);
//   };

//   const handleCreateOrUpdate = async (eventData, isUpdate = false) => {
//     try {
//       if (isUpdate && selectedEvent) {
//         await updateEvent(selectedEvent.id, eventData);
//         alert('Event updated');
//       } else {
//         await createEvent(eventData);
//         alert('Event created');
//       }
//       setIsEventModalOpen(false);
//       setSelectedEvent(null);
//       setRefreshFlag((p) => !p);
//     } catch (err) {
//       console.error(err);
//       alert(err?.response?.data || 'Operation failed');
//     }
//   };

//   const handleDelete = async (eventId) => {
//     if (!window.confirm('Are you sure you want to delete this event?')) return;
//     try {
//       await deleteEvent(eventId);
//       setRefreshFlag((p) => !p);
//     } catch (err) {
//       console.error(err);
//       alert('Delete failed');
//     }
//   };

//   const openVolunteerModal = (event) => {
//     setVolEventContext(event);
//     setIsVolunteerModalOpen(true);
//   };

//   const handleLogout = () => {
//     logout();
//     window.location.reload();
//   };

//   return (
//     <div className="p-6 bg-gray-100 min-h-screen">
//       <HeaderTop onLogout={handleLogout} />

//       <section className="mb-6 flex justify-between items-center">
//         <div>
//           <h2 className="text-xl font-semibold">Events</h2>
//           <p className="text-sm text-gray-600">Manage your events and volunteers</p>
//         </div>
//         <div>
//           <button onClick={openCreateModal} className="px-4 py-2 bg-blue-600 text-white rounded">
//             Create Event
//           </button>
//         </div>
//       </section>

//       <section>
//         <div className="grid gap-4">
//           {events.map((event) => (
//             <div key={event.id} className="p-4 bg-white rounded shadow">
//               <div className="flex justify-between items-center">
//                 <div>
//                   <h3 className="font-bold">{event.title}</h3>
//                   <p>Capacity: {event.capacity}</p>
//                   <p>Date: {event.date ? new Date(event.date).toLocaleDateString() : '-'}</p>
//                   <p>Volunteers: {event.volunteers ? event.volunteers.length : 0}</p>
//                 </div>
//                 <div className="flex gap-2">
//                   <button className="px-2 py-1 bg-blue-500 text-white rounded" onClick={() => handleEdit(event)}>
//                     Edit
//                   </button>
//                   <button className="px-2 py-1 bg-yellow-500 text-white rounded" onClick={() => openVolunteerModal(event)}>
//                     Volunteers
//                   </button>
//                   <button className="px-2 py-1 bg-red-500 text-white rounded" onClick={() => handleDelete(event.id)}>
//                     Delete
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Modals */}
//       <EventFormModal
//         isOpen={isEventModalOpen}
//         onClose={() => {
//           setIsEventModalOpen(false);
//           setSelectedEvent(null);
//         }}
//         selectedEvent={selectedEvent}
//         onSubmit={handleCreateOrUpdate}
//       />

//       <VolunteerListModal
//         isOpen={isVolunteerModalOpen}
//         onClose={() => {
//           setIsVolunteerModalOpen(false);
//           setVolEventContext(null);
//         }}
//         event={volEventContext}
//         onRefresh={() => setRefreshFlag((p) => !p)}
//       />
//     </div>
//   );
// }

// // -----------------------------
// // Notes:
// // - Keep your existing CSS files. I preserved many class names (p-6 bg-gray-100 min-h-screen, modal-backdrop, etc.)
// // - You can remove the old EventForm and VolunteerList or reuse them; the modal versions above are self-contained.
// // - Services are used directly as requested. Error handling is minimal but clear.
// // - If you want more polished UI (cards, charts, pagination), I can add them next.

