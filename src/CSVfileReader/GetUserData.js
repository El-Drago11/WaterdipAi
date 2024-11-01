import React, { useEffect, useState } from 'react';
import Papa from 'papaparse';
import { useRef } from 'react';

const GetUserData = ({getFilterData}) => {
  const [data, setData] = useState([]);
  const selectedDate =  useRef();
  // const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    // Fetch the CSV file from the public folder
    fetch('/hotel_bookings.csv')
      .then((response) => response.text())
      .then((text) => {
        Papa.parse(text, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            // console.log('Parsed Results:', results.data);
            setData(results.data);
            getFilterData(results.data); // Set initial filtered data to the full dataset
          },
          error: (error) => {
            console.error('Error parsing CSV:', error);
          },
        });
      });
  }, []);

  // Filter data based on the selected date
  const filterDataByDate = (date) => {
    if (date) {

      let [year,month,day] = date.split('-');

       if(day[0]==0){
        day = day[1]
       }

       // Month is 0-based in JavaScript
       const monthIndex = parseInt(date.split('-')[1], 10) - 1; 
       //pareseInt(..,10) : convert the integer to base decimal 10

       let monthName;
       switch (monthIndex) {
         case 0: monthName = "January"; break;
         case 1: monthName = "February"; break;
         case 2: monthName = "March"; break;
         case 3: monthName = "April"; break;
         case 4: monthName = "May"; break;
         case 5: monthName = "June"; break;
         case 6: monthName = "July"; break;
         case 7: monthName = "August"; break;
         case 8: monthName = "September"; break;
         case 9: monthName = "October"; break;
         case 10: monthName = "November"; break;
         case 11: monthName = "December"; break;
         default: monthName = ""; break;
       }

      // console.log("User Input : ",year+'-'+monthName+'-'+day)

      const filtered = data.filter(row =>
        row.arrival_date_year == year.trim() && row.arrival_date_month == monthName.trim() && row.arrival_date_day_of_month == day.trim()
      );

      getFilterData(filtered);
    } else {
      getFilterData(data); // Reset to full data if no date selected
    }
  };


  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const dateValue = selectedDate.current.value
      // console.log("Entred Date : ",dateValue);
      filterDataByDate(dateValue);
    }
  };

  return (
    <div>
      <label style={{'fontSize':'20px'}}><b>Select Date:</b> </label>
      <input type="date" ref={selectedDate} onKeyDown={handleKeyPress} style={{'padding':'10px','borderRadius':'10px'}}/>
    </div>
  );
};

export default GetUserData;
