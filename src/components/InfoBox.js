import React from 'react'
import { Card, Typography, CardContent  } from '@material-ui/core'

const InfoBox = ({ title,cases,total }) => {
	return (
		<div>
			<Card className="app-stats">
				<CardContent> 
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