import React from 'react';
import Chart from 'react-apexcharts';

const ColumnChart = ({onFilterData}) => {

    // Ensure onFilterData is an array and has data
    if (!Array.isArray(onFilterData) || onFilterData.length === 0) {
        return <div style={{'backgroundColor':'#f1f1f1','padding':'10px','borderRadius':'10px','height':'450px','textAlign':'center'}}>Loading data...</div>;
    }

    // console.log("Filer data : ", onFilterData)

    const countryVisitorCounts = onFilterData.reduce((acc, record) => {

        //step1: Get the details from the current record
        // if the country name is missing data
        const country = record.country || "Unknown"; 
        const adults = parseInt(record.adults, 10) || 0;
        const children = parseInt(record.children, 10) || 0;
        const babies = parseInt(record.babies, 10) || 0;
        const totalVisitors = adults + children + babies;

        //step2: check if the current country record is present
        if (!acc[country]) {
            //if not create that country record
            acc[country] = 0;
        }

        //step3: add the totalVisitor to the record
        acc[country] += totalVisitors;

        return acc;
    }, {});

    // console.log("Data for chart : ",countryVisitorCounts)

    //Will give the array of the keys present in the object
    const countries = Object.keys(countryVisitorCounts);

    //Will give the array of the values present in the object
    const visitors = Object.values(countryVisitorCounts);

    // ApexCharts options
    const options = {
        chart: {
            id: 'country-visitors',
            type: 'bar',
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: false,
            },
        },
        dataLabels: {
            enabled: false,
        },
        xaxis: {
            categories: countries,
            title: {
                text: 'Country',
            },
        },
        yaxis: {
            title: {
                text: 'Number of Visitors',
            },
        },
        title: {
            text: 'Number of Visitors per Country',
            align: 'center',
        },
    };

    const series = [
        {
            name: 'Visitors',
            data: visitors,
        },
    ];


    return (
        <div id='columnChart' style={{'backgroundColor':'#f1f1f1','padding':'10px','borderRadius':'10px'}}>
            <Chart options={options} series={series} type="bar" height={450} />
        </div>
    );
};

export default ColumnChart;
