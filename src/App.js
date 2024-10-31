import React, { useState } from 'react'
import GetUserData from './CSVfileReader/GetUserData'
import ColumnChart from './Charts/ColumnChart'
import TimeSeriesChart from './Charts/TimeSeriesChart';
const App = () => {

  const [filterData,setFilteredData] = useState([]);
  
  return (
    <div>
      <GetUserData getFilterData={setFilteredData}/>
      <ColumnChart onFilterData={filterData}/>
      <TimeSeriesChart onFilterData={filterData}/>
    </div>
  )
}

export default App