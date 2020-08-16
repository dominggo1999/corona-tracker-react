import React from 'react'
import numeral from 'numeral'

// Format numbers in infobox
export const prettifyNumber = n =>n>999?numeral(n).format('0.0a'):n;

// Sort country by total cases for table 

export const sortCases = (data) =>{
	return data.sort((a,b)=>b.cases-a.cases);
}

