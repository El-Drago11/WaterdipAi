import React from 'react';
import Chart from 'react-apexcharts';

const TimeSeriesChart = ({ onFilterData }) => {
    // console.log("Filter data: ", onFilterData);

    // Ensure onFilterData is an array and has data
    if (!Array.isArray(onFilterData) || onFilterData.length === 0) {
        return <div style={{'backgroundColor':'#f1f1f1','padding':'10px','borderRadius':'10px','height':'450px','textAlign':'center'}}>Loading data...</div>;
    }

    const timeSeriesData = onFilterData.reduce((acc, record) => {
        //Step1: Ensure two digits
        const day = record.arrival_date_day_of_month.padStart(2, '0');

        //Step2: get the month
        const month = new Date(Date.parse(record.arrival_date_month + " 1, 2020")).getMonth() + 1; // Get month index (1-12)

        //step3: get the year
        const year = record.arrival_date_year;

        //step4: create Format: YYYY-MM-DD
        const date = `${year}-${month.toString().padStart(2, '0')}-${day}`; 

        const adults = parseInt(record.adults, 10) || 0;
        const children = parseInt(record.children, 10) || 0;
        const babies = parseInt(record.babies, 10) || 0;
        const totalVisitors = adults + children + babies;

        // Create or update the entry for the date
        if (!acc[date]) {
            acc[date] = 0;
        }
        acc[date] += totalVisitors;

        return acc;
    }, {});

    // console.log("Data for chart: ", timeSeriesData);

    // Prepare data for the chart
    const dates = Object.keys(timeSeriesData);
    const visitors = Object.values(timeSeriesData);

    // ApexCharts options
    const options = {
        chart: {
            type: 'area',
            stacked: false,
            zoom: {
                type: 'x',
                enabled: true,
                autoScaleYaxis: true
            },
            toolbar: {
                autoSelected: 'zoom'
            }
        },
        dataLabels: {
            enabled: false,
        },
        markers: {
            size: 0,
        },
        xaxis: {
            type:'datetime',
            categories: dates,
            
        },
        yaxis: {
            title: {
                text: 'Number of Visitors',
            },
        },
        title: {
            text: 'Number of visitors per day',
            align: 'left',
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                inverseColors: false,
                opacityFrom: 0.8,
                opacityTo: 0.5,
                stops: [0, 90, 100]
            },
        },
        tooltip: {
            shared: false,
        }
    };

    const series = [
        {
            name: 'Visitors',
            data: visitors,
        },
    ];

    return (
        <div id='TimeSeriesChart' style={{'backgroundColor':'#f1f1f1','padding':'10px','borderRadius':'10px'}}>
            <Chart options={options} series={series} type="line" height={450} />
        </div>
    );
}

export default TimeSeriesChart;
