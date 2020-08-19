import React from 'react'
import { Map as LeafletMap, TileLayer, Circle, Popup } from 'react-leaflet'
import { showDataOnMap } from './Util';

const test = {
	lat: 51.505,
	lng: 20.09,
}
const position = [test.lat, test.lng];
 
const Map = ({ caseType, mapZoom, mapCountries, mapCenter }) => {
	return (
		<div className="map">
			<LeafletMap center={mapCenter} zoom={mapZoom}>
				 <TileLayer
		           	attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	      			url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
		        />
		        { showDataOnMap(mapCountries,caseType) }
			</LeafletMap>
		</div>
	)
}

export default Map