import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authService } from '../services/api';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    role: 'PARTICIPANT',
    fullName: '',
    registerNumber: '',
    department: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    // Validate role specific fields
    if (formData.role === 'PARTICIPANT' && !formData.registerNumber) {
      setError('Register number is required for students.');
      setLoading(false);
      return;
    }

    try {
      await authService.register(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.response?.data || 'An error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 mt-4 fade-in-up">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card custom-card p-4 p-md-5">
            <div className="text-center mb-4">
              <i className="fa-solid fa-bridge-water text-primary fs-1 mb-2"></i>
              <h3 className="fw-bold">Create Account</h3>
              <p className="text-muted small">Join Event Bridge to manage and track college events</p>
            </div>

            {error && (
              <div className="alert alert-danger d-flex align-items-center gap-2 py-2" role="alert">
                <i className="fa-solid fa-triangle-exclamation"></i>
                <div className="small">{error}</div>
              </div>
            )}

            {success && (
              <div className="alert alert-success d-flex align-items-center gap-2 py-2" role="alert">
                <i className="fa-regular fa-circle-check"></i>
                <div className="small">Registration successful! Redirecting to login...</div>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-semibold small text-muted">Full Name</label>
                <input 
                  type="text" 
                  name="fullName"
                  className="form-control bg-light" 
                  placeholder="Enter full name" 
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold small text-muted">Username</label>
                <input 
                  type="text" 
                  name="username"
                  className="form-control bg-light" 
                  placeholder="Choose username" 
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold small text-muted">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  className="form-control bg-light" 
                  placeholder="Enter institutional email" 
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold small text-muted">Password</label>
                <input 
                  type="password" 
                  name="password"
                  className="form-control bg-light" 
                  placeholder="Create password" 
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold small text-muted">Register As</label>
                <select 
                  name="role"
                  className="form-select bg-light"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="PARTICIPANT">Student Participant</option>
                  <option value="ORGANIZER">Event Convener / Organizer</option>
                  <option value="FACULTY">Faculty Member</option>
                </select>
              </div>

              {formData.role === 'PARTICIPANT' && (
                <div className="mb-3">
                  <label className="form-label fw-semibold small text-muted">Register Number</label>
                  <input 
                    type="text" 
                    name="registerNumber"
                    className="form-control bg-light" 
                    placeholder="e.g. CSE2023001" 
                    value={formData.registerNumber}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              {['PARTICIPANT', 'FACULTY', 'ORGANIZER'].includes(formData.role) && (
                <div className="mb-4">
                  <label className="form-label fw-semibold small text-muted">Department</label>
                  <input 
                    type="text" 
                    name="department"
                    className="form-control bg-light" 
                    placeholder="e.g. Computer Science / Electronics" 
                    value={formData.department}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}

              <button 
                type="submit" 
                className="btn btn-primary-custom w-100 py-2.5"
                disabled={loading || success}
              >
                {loading ? (
                  <>
                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    <span>Creating Account...</span>
                  </>
                ) : (
                  <span>Register Account</span>
                )}
              </button>
            </form>

            <div className="text-center mt-4">
              <span className="text-muted small">Already have an account? </span>
              <Link to="/login" className="small fw-semibold text-primary text-decoration-none">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
