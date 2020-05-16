import React from 'react';
import drawCircle from '../../util/canvasLoadAnimation';

function Memory(props) {
	const { memoryWidgetId, totalMem, memUsage, freeMem } = props.memoryData;
	const canvas = document.querySelector(`.${memoryWidgetId}`);
	drawCircle(canvas, memUsage);

	return (
		<div className='col-sm-4 memory'>
			<h4>Memory</h4>
			<div className='canvas-wrapper'>
				<canvas className={memoryWidgetId} width='100' height='100'></canvas>
				<div className='memory-text'>{memUsage}%</div>
			</div>
			<div>Total Memory (RAM): {(totalMem / 1073741824).toFixed(2)}GB</div>
			<div>Free Memory: {(freeMem / 1073741824).toFixed(2)}GB</div>
		</div>
	);
}

export default Memory;
