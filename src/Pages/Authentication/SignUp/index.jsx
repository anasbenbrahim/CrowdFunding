import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUpPage.css'; // Créez ce fichier CSS similaire à votre LoginPage.css
import logoImage from '../../../Components/Assets/CoFund logo2.png'
import image from '../../../Components/Assets/imageAuth.jpg'

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    role: 'CONTRIBUTOR' 
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.phoneNumber) newErrors.phoneNumber = 'Phone number is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  setIsLoading(true);

  try {
    const response = await fetch('http://localhost:5000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.json();
    console.log('Inscription réussie !', data);
    alert('Inscription réussie !');
  } catch (error) {
    console.error('Erreur d\'inscription:', error.message);
    alert('Erreur lors de l\'inscription : ' + error.message);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="login-page">
      <div className="container-fluid">
        <div className="row g-0">
          {/* Left column with image */}
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

          
          {/* Right column with form */}
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
                <h3>Create your account</h3>
              </div>
              
              <form onSubmit={handleSubmit} noValidate>
                {/* First Name + Last Name (grouped) */}
                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label htmlFor="firstName" className="form-label">
                      First Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName && (
                      <div className="invalid-feedback">{errors.firstName}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="lastName" className="form-label">
                      Last Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.lastName ? 'is-invalid' : ''}`}
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName && (
                      <div className="invalid-feedback">{errors.lastName}</div>
                    )}
                  </div>
                </div>

                {/* Email + Password (grouped) */}
                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label htmlFor="email" className="form-label">
                      Email <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="password" className="form-label">
                      Password <span className="text-danger">*</span>
                    </label>
                    <input
                      type="password"
                      className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                </div>

                {/* Address + Phone (grouped) */}
                <div className="row mb-3">
                  <div className="col-md-6 mb-3 mb-md-0">
                    <label htmlFor="address" className="form-label">
                      Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="phoneNumber" className="form-label">
                      Phone <span className="text-danger">*</span>
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                      id="phoneNumber"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                    />
                    {errors.phoneNumber && (
                      <div className="invalid-feedback">{errors.phoneNumber}</div>
                    )}
                  </div>
                </div>

                {/* Role (single field) */}
                <div className="mb-4">
                  <label htmlFor="role" className="form-label">
                    Role <span className="text-danger">*</span>
                  </label>
                  <select
                    className="form-select"
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                  >
                    <option value="CONTRIBUTOR">Contributor</option>
                    <option value="PORTER">Porter</option>
                  </select>
                </div>

                {/* Submit button */}
                <div className="d-grid mb-3">
                  <button 
                    className="btn btn-primary btn-lg" 
                    type="submit"
                    disabled={isLoading}
                    style={{ backgroundColor: '#2563EB', borderColor: '#2563EB' }}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Signing up...
                      </>
                    ) : (
                      'Sign Up'
                    )}
                  </button>
                </div>
              </form>

              {/* Sign in link */}
              <div className="text-center">
                <p className="mb-0">
                  Already have an account?{' '}
                  <Link to="/" className="text-decoration-none" style={{ color: '#2563EB' }}>
                    Sign in
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;