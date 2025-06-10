import React, { useState, ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { pageTransitionProps } from '../App'; // Import shared transition props

interface FormDataState {
  name: string;
  email: string;
  phone: string;
  watchBrandModel: string;
  referenceNumber: string;
  condition: string;
  includes: string;
  serviceHistory: string;
  description: string;
}

const initialFormData: FormDataState = {
  name: '',
  email: '',
  phone: '',
  watchBrandModel: '',
  referenceNumber: '',
  condition: '',
  includes: '',
  serviceHistory: '',
  description: '',
};

const SellPage: React.FC = () => {
  const [formData, setFormData] = useState<FormDataState>(initialFormData);
  const [files, setFiles] = useState<FileList | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(e.target.files);
  };

  const inputBaseClasses =
    'w-full p-3 bg-[#3B2620]/50 border border-[#B49857] rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-[#bca68e] focus:border-[#bca68e] outline-none transition-colors';
  const labelBaseClasses = 'block text-sm font-medium text-gray-300 mb-1';

  return (
    <motion.div
      {...pageTransitionProps}
      className='max-w-3xl mx-auto p-6 md:p-10 bg-[#1e1e1e] shadow-2xl rounded-lg my-10'
    >
      <h1 className="text-3xl font-['Georgia',_serif] text-[#bca68e] text-center mb-8">Sell Your Timepiece</h1>
      <form
        name='sell-request'
        method='POST'
        data-netlify='true'
        data-netlify-honeypot='bot-field'
        encType='multipart/form-data'
        className='space-y-6'
      >
        {/* Netlify: Hidden input for form name */}
        <input type='hidden' name='form-name' value='sell-request' />
        {/* Honeypot field (hidden from humans) */}
        <p className='hidden'>
          <label>
            <input name='bot-field' />
          </label>
        </p>
        <div>
          <label htmlFor='name' className={labelBaseClasses}>
            Your Name <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='name'
            id='name'
            value={formData.name}
            onChange={handleInputChange}
            className={inputBaseClasses}
            required
          />
        </div>

        <div>
          <label htmlFor='email' className={labelBaseClasses}>
            Your Email <span className='text-red-500'>*</span>
          </label>
          <input
            type='email'
            name='email'
            id='email'
            value={formData.email}
            onChange={handleInputChange}
            className={inputBaseClasses}
            required
          />
        </div>

        <div>
          <label htmlFor='phone' className={labelBaseClasses}>
            Your Phone Number
          </label>
          <input
            type='tel'
            name='phone'
            id='phone'
            value={formData.phone}
            onChange={handleInputChange}
            className={inputBaseClasses}
          />
        </div>

        <hr className='border-gray-600 my-8' />

        <div>
          <label htmlFor='watchBrandModel' className={labelBaseClasses}>
            Watch Brand & Model <span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            name='watchBrandModel'
            id='watchBrandModel'
            value={formData.watchBrandModel}
            onChange={handleInputChange}
            className={inputBaseClasses}
            required
          />
        </div>

        <div>
          <label htmlFor='referenceNumber' className={labelBaseClasses}>
            Reference Number
          </label>
          <input
            type='text'
            name='referenceNumber'
            id='referenceNumber'
            value={formData.referenceNumber}
            onChange={handleInputChange}
            className={inputBaseClasses}
          />
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div>
            <label htmlFor='condition' className={labelBaseClasses}>
              Condition <span className='text-red-500'>*</span>
            </label>
            <select
              name='condition'
              id='condition'
              value={formData.condition}
              onChange={handleInputChange}
              className={inputBaseClasses}
              required
            >
              <option value=''>Select Condition</option>
              <option value='New / Unworn'>New / Unworn</option>
              <option value='Mint'>Mint (Like New, minimal to no signs of wear)</option>
              <option value='Excellent'>Excellent (Light signs of wear, barely visible)</option>
              <option value='Good'>Good (Visible signs of wear, well-maintained)</option>
              <option value='Fair'>Fair (Significant wear, functional)</option>
            </select>
          </div>

          <div>
            <label htmlFor='includes' className={labelBaseClasses}>
              What's Included? <span className='text-red-500'>*</span>
            </label>
            <select
              name='includes'
              id='includes'
              value={formData.includes}
              onChange={handleInputChange}
              className={inputBaseClasses}
              required
            >
              <option value=''>Select Inclusions</option>
              <option value='Full Set'>Full Set (Original Box & Papers)</option>
              <option value='Watch & Box Only'>Watch & Box Only</option>
              <option value='Watch & Papers Only'>Watch & Papers Only</option>
              <option value='Watch Only'>Watch Only</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor='serviceHistory' className={labelBaseClasses}>
            Service History <span className='text-red-500'>*</span>
          </label>
          <select
            name='serviceHistory'
            id='serviceHistory'
            value={formData.serviceHistory}
            onChange={handleInputChange}
            className={inputBaseClasses}
            required
          >
            <option value=''>Select Service History</option>
            <option value='Unknown'>Unknown</option>
            <option value='Recently Serviced'>Recently Serviced (within last 6 months)</option>
            <option value='Serviced >6 months ago'>Serviced (more than 6 months ago)</option>
          </select>
        </div>

        <div>
          <label htmlFor='description' className={labelBaseClasses}>
            Additional Description
          </label>
          <textarea
            name='description'
            id='description'
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className={inputBaseClasses}
            placeholder='e.g., Still under warranty, specific customizations, notable history...'
          ></textarea>
        </div>

        <div>
          <label htmlFor='watchImages' className={labelBaseClasses}>
            Upload Watch Images
          </label>
          <input
            type='file'
            name='watchImages'
            id='watchImages'
            multiple
            accept='image/*'
            onChange={handleFileChange}
            className='block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#B49857] file:text-black hover:file:bg-[#a89174] cursor-pointer'
          />
          {files && files.length > 0 && <p className='text-xs text-gray-500 mt-1'>{files.length} file(s) selected.</p>}
        </div>

        <div className='pt-4'>
          <button
            type='submit'
            className='w-full bg-[#B49857] text-black font-semibold py-3 px-6 rounded-md hover:bg-[#a89174] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center'
          ></button>
        </div>
      </form>
      <p className='text-xs text-gray-500 mt-6 text-center'>
        Note: A backend service is required to process this form and send emails with attachments. This frontend is set
        up to send the data to an endpoint like '/api/sell-request'.
      </p>
    </motion.div>
  );
};

export default SellPage;
