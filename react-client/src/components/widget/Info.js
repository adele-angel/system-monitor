import React from 'react';
import moment from 'moment';

function Info(props) {
	return (
		<div className='col'>
			<h5>Operating System</h5>
			<div className='widget-text'>{props.infoData.osType}</div>
			<h5>Time Online</h5>
			<div className='widget-text'>{moment.duration(props.infoData.upTime).humanize()}</div>
			<h5>Processor Information</h5>
			<div className='widget-text'>
				<strong>Type:</strong> {props.infoData.cpuModel}
			</div>
			<div className='widget-text'>
				<strong>Number of Cores:</strong> {props.infoData.numCores}
			</div>
			<div className='widget-text'>
				<strong>Clock Speed:</strong> {props.infoData.cpuSpeed}MHz
			</div>
		</div>
	);
}

export default Info;
