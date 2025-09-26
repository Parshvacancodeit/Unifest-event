import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AuthPages.css';
import { signIn } from '../../services/authService'; // ✅ import your API service

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student' // 👈 default role, you can make it dynamic later
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (apiError) setApiError('');
  };

  const validateForm = () => {
    const newErrors = {};
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
    return newErrors;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const newErrors = validateForm();

  if (Object.keys(newErrors).length === 0) {
    try {
      setLoading(true);
      setApiError('');
      const res = await signIn({
        email: formData.email,
        password: formData.password,
        role: formData.role
      });

      // Save role in localStorage
      localStorage.setItem('userRole', formData.role);

      console.log("Login successful:", res);

      // Redirect based on role
      if (formData.role === 'admin') {
        navigate('/dashboard'); // admin goes to dashboard
      } else {
        navigate('/'); // student goes to landing page
      }
    } catch (error) {
      console.error("Login failed:", error);
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
              <h1>Welcome Back</h1>
              <p className="auth-subtitle">Sign in to your account to continue</p>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
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
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  {errors.password && <span className="error-message">{errors.password}</span>}
                </div>

                {/* Optional: Role selector if needed */}
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

                {apiError && <div className="error-message">{apiError}</div>}

                <button type="submit" className="btn btn-primary w-full" disabled={loading}>
                  {loading ? "Signing in..." : "Sign In"}
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
                Don't have an account? <Link to="/register" className="auth-link">Sign up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
