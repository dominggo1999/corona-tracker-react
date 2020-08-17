import React from 'react'
import { Card, Typography, CardContent  } from '@material-ui/core'

const InfoBox = ({ title,id,cases,total,changeCases }) => {
	return (
		<div>
			<Card className="app-stats" onClick={changeCases} id={id}>
				<CardContent className="pointer-event-none"> 
					<Typography color="textSecondary">
						{title}
					</Typography>
					<h1>{cases}</h1>
					<Typography color="textSecondary">
						{total} total
					</Typography>
				</CardContent>
			</Card>
		</div>
	)
}

export default InfoBox