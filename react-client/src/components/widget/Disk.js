import React from 'react';
import drawCircle from '../../util/canvasLoadAnimation';

function Disk(props) {
	const { diskWidgetId, fsTotal, fsUsed, fsUsage } = props.diskData;
	const canvas = document.querySelector(`.${diskWidgetId}`);
	drawCircle(canvas, fsUsage);

	return (
		<div className='col-sm-4 disk'>
			<h4>Disk</h4>
			<div className='canvas-wrapper'>
				<canvas className={diskWidgetId} width='100' height='100'></canvas>
				<div className='cpu-text'>{fsUsage}%</div>
			</div>
			<div>Total Disk Space: {fsTotal}GB</div>
			<div>Free Disk Space: {fsTotal - fsUsed}GB</div>
		</div>
	);
}

export default Disk;
