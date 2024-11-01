import React from 'react';
import Chart from 'react-apexcharts';

const SparklineChart = ({ onFilterData,chartFor }) => {

    // Ensure onFilterData is an array and has data
    if (!Array.isArray(onFilterData) || onFilterData.length === 0) {
        return <div  style={{'backgroundColor':'#f1f1f1','padding':'10px','borderRadius':'10px','height':'200px','width':'500px','textAlign':'center'}}>Loading data...</div>;
    }

    var TotalNumber = 0;

    // Calculate total numbers of adult visitor
    TotalNumber = onFilterData.reduce((total, curr) => {
        let value = parseInt(chartFor==1? curr.adults:curr.children || 0, 10);
        return total + (isNaN(value) ? 0 : value);
    }, 0);


    // TotalNumber = onFilterData.reduce((total, curr) => {
    //     let value = parseInt(curr.children || 0, 10);
    //     return total + (isNaN(value) ? 0 : value);
    // }, 0);

    // Prepare data in the correct format for a line chart
    const series = [
        {
            name: 'Visitors',
            data: onFilterData.map(item => chartFor==1?item.adults:item.children), // Assuming `adults` and `children` are numbers
        }
    ];

    const options = {
        chart: {
          type: 'line',
          sparkline: {
            enabled: true
          }
        },
        tooltip: {
          fixed: {
            enabled: false
          },
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function (seriesName) {
                return ''
              }
            }
          },
          marker: {
            show: false
          }
        }
    };

    return (
        <div style={{'backgroundColor':'#f1f1f1','padding':'10px','borderRadius':'10px','textAlign':'center'}}>
            <h3>Total No of {chartFor==1?'Adult':'Children'} visitors: {TotalNumber}</h3>
            <div>
                <Chart options={options} series={series} height={200} width={500}/>
            </div>
        </div>
    );
};

export default SparklineChart;
