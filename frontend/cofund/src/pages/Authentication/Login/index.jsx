import React, { useState } from 'react';
import './LoginPage.css';
import { Link, useNavigate } from "react-router-dom";
import logoImage from '../../../components/Assets/logo.png';
import image from '../../../components/Assets/imageAuth.jpg';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Initialize navigate here

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch {
          errorData = await response.text();
        }
        throw new Error(errorData.message || errorData || 'Échec de la connexion');
      }

      const data = await response.json();

      localStorage.setItem('userId', data.userId);
      localStorage.setItem('role', data.role);

      alert('Connexion réussie !');

      setFormData({
        email: '',
        password: '',
        rememberMe: false,
      });

      navigate('/communities-page');
    } catch (error) {
      console.error('Erreur de connexion:', error);
      setErrors((prev) => ({
        ...prev,
        serverError: error.message || 'Une erreur est survenue lors de la connexion',
      }));
      alert(`Erreur : ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="container-fluid">
        <div className="row g-0">
          {/* Colonne de gauche avec l'image pleine largeur/hauteur */}
          <div className="col-md-6 left-column p-0">
            <div className="w-100 h-100">
              <img
                src={image}
                alt="Illustration"
                className="w-100 h-100 object-fit-cover"
                loading="lazy"
              />
            </div>
          </div>

          {/* Colonne de droite avec le formulaire */}
          <div className="col-md-6 right-column">
            <div className="p-3 p-md-4 p-xl-5">
              <div className="d-flex flex-column align-items-center mb-4">
                <img
                  className="img-fluid rounded mb-3"
                  loading="lazy"
                  src={logoImage}
                  width="130"
                  height="100"
                  alt="Logo"
                />
                <h3>Sign in to your Account</h3>
              </div>

              <form onSubmit={handleSubmit} noValidate>
                <div className="row gy-3 gy-md-4 overflow-hidden">
                  <div className="col-12">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>

                  <div className="col-12">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={isLoading}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>

                  <div className="col-12">
                    <div className="d-grid">
                      <button
                        className="btn btn-primary btn-lg"
                        type="submit"
                        disabled={isLoading}
                        style={{ backgroundColor: '#2563EB', borderColor: '#2563EB' }}
                      >
                        {isLoading ? (
                          <>
                            <span
                              className="spinner-border spinner-border-sm me-2"
                              role="status"
                              aria-hidden="true"
                            ></span>
                            Logging in...
                          </>
                        ) : (
                          'Login'
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>

              <div className="row mt-3">
                <div className="col-12">
                  <hr className="border-secondary-subtle" />
                  <div className="d-flex justify-content-between">
                    <div>
                      <span className="text-muted">Don't have an account? </span>
                      <Link
                        to="/signup"
                        className="text-decoration-none"
                        style={{ color: '#2563EB' }}
                      >
                        Sign up
                      </Link>
                    </div>
                    <a href="#!" className="link-secondary text-decoration-none">
                      Forgot password
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;