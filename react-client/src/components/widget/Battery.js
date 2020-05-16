import React from 'react';

function Battery(props) {
	console.log(props);

	const battery = props.batteryData?.hasbattery ? (
		<div className='battery'>
			<div className='widget-text'>
				<h5>Currently charging:</h5> {props.batteryData.ischarging ? 'Yes' : 'No'}
			</div>
			<div className='widget-text'>
				<h5>Remaining:</h5> {props.batteryData.percent}%
			</div>
			<div className='widget-text'>
				<h5>Voltage:</h5> {props.batteryData.voltage}V
			</div>
		</div>
	) : (
		<div>Device has no battery</div>
	);

	return (
		<div>
			<h5>Battery Info</h5>
			{battery}
		</div>
	);
}

export default Battery;
