import React from 'react';

function Network(props) {
	return (
		<div className='col'>
			<h6 className='text-center'>Network</h6>
			<div className='row network'>
				<div className='col'>MAC Address</div>
				<div className='col text-info h3'>&#x26AC;</div>
				<div className='col'>{props.networkData.macA}</div>
			</div>
		</div>
	);
}

export default Network;
