import React from 'react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './addSchool.module.css';

const AddSchool = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm(); 
  const [image, setImage] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', data.name);
    formData.append('address', data.address);
    formData.append('city', data.city);
    formData.append('state', data.state);
    formData.append('contact', data.contact);
    formData.append('email_id', data.email_id);

    try {
      const res = await fetch('/api/addSchool', {
        method: 'POST',
        body: formData
      });
      if (res.ok) {
        setSubmitSuccess(true);
        reset(); 
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        console.error('Failed to add school');
      }
    } catch (error) {
      console.error('Failed to add school:', error);
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className={styles.container}>
      {submitSuccess && <p className={styles['success-message']}>Thank you! School successfully submitted.</p>}
      <h2 className={styles.heading}>School Form</h2>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="name">School Name</label>
        <input type="text" {...register('name', { required: true })} placeholder="Enter School Name" />
        {errors.name && <span className={styles.error}>This field is required</span>}

        <label htmlFor="address">Address</label>
        <input type="text" {...register('address', { required: true })} placeholder="Enter Address" />
        {errors.address && <span className={styles.error}>This field is required</span>}

        <label htmlFor="city">City</label>
        <input type="text" {...register('city', { required: true })} placeholder="Enter City" />
        {errors.city && <span className={styles.error}>This field is required</span>}

        <label htmlFor="state">State</label>
        <input type="text" {...register('state', { required: true })} placeholder="Enter State" />
        {errors.state && <span className={styles.error}>This field is required</span>}

        <label htmlFor="contact">Contact Number</label>
        <input type="tel" {...register('contact', { required: true, minLength: 10, maxLength: 10 })} placeholder="Enter Contact Number" />
        {errors.contact && <span className={styles.error}>Please enter a 10-digit phone number</span>}

        <label htmlFor="email_id">Email</label>
        <input type="email" {...register('email_id', { required: true, pattern: /^\S+@\S+$/i })} placeholder="Enter Email" />
        {errors.email_id && <span className={styles.error}>Please enter a valid email address</span>}

        <label htmlFor="image">Image</label>
        <input type="file" onChange={handleImageChange} accept="image/*" />
        {errors.image && <span className={styles.error}>This field is required</span>}

        <button type="submit">Add School</button>

        
      </form>
    </div>
  );
};

export default AddSchool;



