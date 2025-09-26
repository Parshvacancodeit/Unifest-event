import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPages.css';
import { signUp } from '../../services/authService'; // ✅ import service

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student', // 👈 default role
    agreeToTerms: false
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (apiError) setApiError('');
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Full name is required';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      try {
        setLoading(true);
        setApiError('');
        // ✅ API call
        const res = await signUp({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        });

        console.log("Registration successful:", res);
        navigate('/dashboard'); // redirect on success
      } catch (error) {
        console.error("Registration failed:", error);
        if (error.response?.data?.detail?.error) {
          setApiError(error.response.data.detail.error);
        } else {
          setApiError("Something went wrong. Please try again.");
        }
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <Link to="/" className="auth-logo">
            Event <span className="text-primary">Hive</span>
          </Link>
          <div className="auth-nav">
            <Link to="/login" className="btn btn-outline">Login</Link>
            <Link to="/register" className="btn btn-primary">Signup</Link>
          </div>
        </div>

        <div className="auth-content">
          <div className="auth-form-container">
            <div className="auth-form">
              <h1>Registration</h1>
              <p className="auth-subtitle">Create your account to get started</p>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="error-message">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="error-message">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    name="password"
                    className={`form-input ${errors.password ? 'error' : ''}`}
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>

                {/* Optional: Role selector */}
                <div className="form-group">
                  <label className="form-label">Role</label>
                  <select
                    name="role"
                    className="form-input"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="student">Student</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                    />
                    <span>
                      I agree to the <Link to="/terms" className="auth-link">Terms and Conditions</Link> and <Link to="/privacy" className="auth-link">Privacy Policy</Link>
                    </span>
                  </label>
                  {errors.agreeToTerms && <span className="error-message">{errors.agreeToTerms}</span>}
                </div>

                {apiError && <div className="error-message">{apiError}</div>}

                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>

              <div className="auth-divider">
                <span>or continue with</span>
              </div>

              <div className="social-login">
                <button className="btn btn-outline social-btn">
                  <span>Google</span>
                </button>
                <button className="btn btn-outline social-btn">
                  <span>Facebook</span>
                </button>
              </div>

              <p className="auth-footer">
                Already have an account? <Link to="/login" className="auth-link">Sign in</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
