import React, { useState } from 'react'
import GetUserData from './CSVfileReader/GetUserData'
import ColumnChart from './Charts/ColumnChart'
import TimeSeriesChart from './Charts/TimeSeriesChart';
import SparklineChart from './Charts/SparklineChart';
const App = () => {

  const [filterData,setFilteredData] = useState([]);
  
  return (
    <div>
      <GetUserData getFilterData={setFilteredData}/>
      <TimeSeriesChart onFilterData={filterData}/>
      <ColumnChart onFilterData={filterData}/>
      <div style={{'display':'flex','justifyContent':'space-evenly'}}>
        {/* For Adult= 1 and Children=2 */}
        <SparklineChart onFilterData={filterData} chartFor={1}/>
        <SparklineChart onFilterData={filterData} chartFor={2}/>
      </div>
    </div>
  )
}

export default App