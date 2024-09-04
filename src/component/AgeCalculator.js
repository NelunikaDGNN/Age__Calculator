import React, { useState } from 'react';
import './style.css';

function AgeCalculator() {
  const [dob, setDob] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');

  const calculateAge = () => {
    setError('');

    if (!dob || !month || !year) {
      setError('Please fill all fields.');
      setAge('');
      return;
    }

    const dobInt = parseInt(dob);
    const monthInt = parseInt(month);
    const yearInt = parseInt(year);

    if (dobInt <= 0 || dobInt > 31) {
      setError('Day must be between 1 and 31.');
      setAge('');
      return;
    }

    if (monthInt <= 0 || monthInt > 12) {
      setError('Month must be between 1 and 12.');
      setAge('');
      return;
    }

    if (yearInt <= 0 || yearInt < 1800 || yearInt > 2100) {
      setError('Year must be between 1800 and 2100.');
      setAge('');
      return;
    }

    
    const daysInMonth = [31, isLeapYear(yearInt) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    
    const maxDays = daysInMonth[monthInt - 1];

    if (dobInt > maxDays) {
      setError(`Invalid ${getMonthName(monthInt)} has ${maxDays} days.`);
      setAge('');
      return;
    }

    const today = new Date();
    const birthDate = new Date(year, month - 1, dob);

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (months < 0 || (months === 0 && days < 0)) {
      years--;
      months += 12;
    }

    if (days < 0) {
      const tempDate = new Date(today.getFullYear(), today.getMonth() - 1, 0);
      days = tempDate.getDate() - birthDate.getDate() + today.getDate();
      months--;
    }

    setAge({
      years,
      months,
      days
    });
  };

  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const handleInputChange = (e, setter) => {
    const inputValue = e.target.value;
    const numericValue = parseInt(inputValue, 10);
    if (!isNaN(numericValue)) {
      setter(inputValue);
    }
  };

  const getMonthName = (month) => {
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return monthNames[month - 1];
  };

  return (
    <div className='age-calculator'>
      <div id="calculator">
        <div className='title'>Age Calculator</div>
        <label htmlFor="dob">When's your Birthday?</label>
        <input type="number" id="dob" placeholder="DD" min="1" max="31" value={dob} onChange={(e) => handleInputChange(e, setDob)} />
        <input type="number" id="month" placeholder="MM" min="1" max="12" value={month} onChange={(e) => handleInputChange(e, setMonth)} />
        <input type="number" id="year" placeholder="YYYY" min="1800" max="2100" value={year} onChange={(e) => handleInputChange(e, setYear)} />
        <button onClick={calculateAge}>Calculate Age</button>
        {error && <div style={{ color: 'red', marginTop: '5px' }}>{error}</div>}
        {age && !error && <div style={{ color: 'green', marginTop: '5px' }}>Age calculated successfully!</div>}

        <div id="result">
          {age && (
            <>
              <span style={{ color: '#FF1694', fontSize: '22px' }}>{age.years} </span><span style={{ fontSize: '16px' }}>Years</span>
              <span style={{ color: '#FF1694', fontSize: '22px' }}> {age.months} </span><span style={{ fontSize: '16px' }}>months</span>
              <span style={{ color: '#FF1694', fontSize: '22px' }}> {age.days} </span><span style={{ fontSize: '16px' }}>days</span>
              <span style={{ fontSize: '16px' }}> old</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AgeCalculator;
