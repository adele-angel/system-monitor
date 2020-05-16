import React from 'react';
import drawCircle from '../../util/canvasLoadAnimation';

function CPU(props) {
	const canvas = document.querySelector(`.${props.cpuData.cpuWidgetId}`);
	drawCircle(canvas, props.cpuData.cpuLoad);

	return (
		<div className='col-sm-4 cpu'>
			<h4>CPU</h4>
			<div className='canvas-wrapper'>
				<canvas className={props.cpuData.cpuWidgetId} width='100' height='100'></canvas>
				<div className='cpu-text'>{props.cpuData.cpuLoad}%</div>
			</div>
		</div>
	);
}

export default CPU;
