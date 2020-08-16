import React from 'react'

const Table = ({ countries }) => {
	return (
		<div className="app-table">
			<table>
				<tbody>
					{
						countries.map((country,id)=>(
							<tr key={country._id}>
								<td>{id+1}</td>
								<td>{country.country}</td>
								<td><strong>{country.cases}</strong></td>
							</tr>
						))
					}
				</tbody>
			</table>
		</div>
	)
}

export default Table