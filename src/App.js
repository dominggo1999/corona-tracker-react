import React, { useState, useEffect} from 'react';
import { MenuItem, FormControl, Select, InputLabel } from '@material-ui/core';
import './styles/main.scss';
import { prettifyNumber,sortCases } from './components/Util';
import InfoBox from './components/InfoBox';
import Table from './components/Table';

const App = () => {
	const [country, setCountry] = useState('worldwide'); //Yang ini cuma satu
	const [countries, setCountries] = useState([]); //Yang ini semua
	const [countryInfo, setCountryInfo] = useState({});
	const [tableData, setTableData] = useState([]);

	// Panggil data untuk worldwide waktu pertama kali loading 
	useEffect(() => {
		fetch("https://disease.sh/v3/covid-19/all")
			.then(res=>res.json())
			.then(data=>{
				setCountryInfo(data);
			})
	}, []);


	// Call disease API to get all countries
	useEffect(() => {
		const getCountriesData = async () =>{
			await fetch("https://disease.sh/v3/covid-19/countries")
				.then(res=>res.json())
				.then(data=>{
					const countries = data.map(country=>({
						name : country.country,
						value : country.countryInfo.iso2,
						id : country.countryInfo._id
					}))
					const sortedData = sortCases(data);

					setTableData(sortedData);
					setCountries(countries);
				})
		}	

		getCountriesData();	
	}, [])

	const onCountryChange = async (e) =>{
		const dataTarget = e.target.value;

		setCountry(dataTarget);

		const url = 
			dataTarget === "worldwide"? 
				"https://disease.sh/v3/covid-19/all"
			:
				`https://disease.sh/v3/covid-19/countries/${dataTarget}`;

		await fetch(url)
			.then(res=>res.json())
			.then(data=>{
				setCountryInfo(data);
			})
	}


	return (
		<div className="app">
			<div className="app-left">
				<div className="app-header">
					<h1>CORONA TRACKER</h1>
					<FormControl>
						<InputLabel>Country</InputLabel>
						<Select
							value = {country}
							onChange = {onCountryChange}
						>
							<MenuItem value={'worldwide'} key={999}>Worldwide</MenuItem>
							{
								countries.map(country=>{
									return (
										<MenuItem value={country.value} key={`${country.name}${country.info}`}>{country.name}</MenuItem>
									)
								})
							}
						</Select>
					</FormControl>
				</div>
				<div className="app-info-boxes">
					<InfoBox 
						title={"Coronavirus Cases"}
						cases={prettifyNumber(countryInfo.todayCases)}
						total={prettifyNumber(countryInfo.cases)}
					/>
					<InfoBox 
						title={"Recovered"}
						cases={prettifyNumber(countryInfo.todayRecovered)}
						total={prettifyNumber(countryInfo.recovered)}
					/>
					<InfoBox 
						title={"Deaths"}
						cases={prettifyNumber(countryInfo.todayDeaths)}
						total={prettifyNumber(countryInfo.deaths)}
					/>
				</div>
			</div>


			<div className="app-right">
				<h3>Live Cases by Country</h3>
				<Table countries={tableData}/>
			</div>
		</div>
	);
}

export default App;

