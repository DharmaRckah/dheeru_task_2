import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking, resetStatus } from '../redux/bookingSlice';
import { Link } from 'react-router-dom';

const BookingForm = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector(state => state.booking);

  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    booking_date: '',
    booking_type: '',
    booking_slot: '',
    time_from: '',
    time_to: ''
  });

  useEffect(() => {
    if (success || error) {
      setTimeout(() => dispatch(resetStatus()), 5000);
    }
  }, [success, error, dispatch]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(createBooking(form));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">Booking Form</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Customer Name</label>
            <input
              type="text"
              name="customer_name"
              value={form.customer_name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>
          <div>
            <label className="block text-gray-600 font-medium mb-1">Customer Email</label>
            <input
              type="email"
              name="customer_email"
              value={form.customer_email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Booking Date</label>
            <input
              type="date"
              name="booking_date"
              value={form.booking_date}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Booking Type</label>
            <select
              name="booking_type"
              value={form.booking_type}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition"
            >
              <option value="">Select Booking Type</option>
              <option value="Full Day">Full Day</option>
              <option value="Half Day">Half Day</option>
              <option value="Custom">Custom</option>
            </select>
          </div>

          {form.booking_type === 'Half Day' && (
            <div>
              <label className="block text-gray-600 font-medium mb-1">Booking Slot</label>
              <select
                name="booking_slot"
                value={form.booking_slot}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition"
              >
                <option value="">Select Slot</option>
                <option value="First Half">First Half</option>
                <option value="Second Half">Second Half</option>
              </select>
            </div>
          )}

          {form.booking_type === 'Custom' && (
            <>
              <div>
                <label className="block text-gray-600 font-medium mb-1">Time From</label>
                <input
                  type="time"
                  name="time_from"
                  value={form.time_from}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition"
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">Time To</label>
                <input
                  type="time"
                  name="time_to"
                  value={form.time_to}
                  onChange={handleChange}
                  required
                  className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition"
                />
              </div>
            </>
          )}
        </div>

        <div className="flex justify-between">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
          >
            {loading ? 'Submitting...' : 'Submit Booking'}
          </button>
          <Link to="/">
          <button
           
            type="Back to Home"
            className="bg-red-600 hover:bg-red-400 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition duration-300"
          >
           Back to Home
          </button>
          </Link>
        </div>

        {success && (
          <p className="text-green-600 text-center font-semibold mt-4">✅ Booking created successfully!</p>
        )}
        {error && (
          <p className="text-red-600 text-center font-semibold mt-4">❌ {error}</p>
        )}
      </form>
    </div>
  );
};

export default BookingForm;
