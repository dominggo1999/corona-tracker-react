import React,{ useState, useEffect } from 'react'
import { Line } from 'react-chartjs-2'
import numeral from 'numeral'


const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          parser: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
          	let format = value>1000?numeral(value).format('0.0a'):value;
          	return format
          },
        },
      },
    ],
  },
};

const buildChartData = (data, caseType) =>{
	let chartData = [];
	let lastDataPoint;
	for (let date in data[caseType]) {
		if(lastDataPoint){
			let newDataPoint = {
				x : date,
				y : data[caseType][date] - lastDataPoint
			}
			chartData.push(newDataPoint);
		}
		lastDataPoint = data[caseType][date];
	}

	return chartData;
}


const LineGraph = ({ caseType,country }) => {
	const [chartData, setChartData] = useState([]);

	useEffect(() => {
		let url = country==="worldwide"? 
					"https://disease.sh/v3/covid-19/historical/all?lastdays=121":
					`https://disease.sh/v3/covid-19/historical/${country.toLowerCase()}?lastdays=121`;


		const getHistoryData = async () =>{
			await fetch(url)
				.then(res=>res.json())
				.then(data=>{
					data = country==="worldwide"? data : data["timeline"];
					let newData = buildChartData(data,caseType);
					setChartData(newData);
				})
		}

		getHistoryData();

	}, [country,caseType])

	return (
		<div>
			{ chartData.length > 0 ? (
					<Line
			          data={{
			            datasets: [
			              {
			                backgroundColor: "rgba(204, 16, 52, 0.5)",
			                borderColor: "#CC1034",
			                data: chartData,
			              },
			            ],
			          }}
			          options={options}
			        />
				) : null
			}
		</div>
	)
}

export default LineGraph