import React from 'react';
import './Widget.css';
import Info from './Info';
import Memory from './Memory';
import CPU from './CPU';
import Disk from './Disk';
import Network from './Network';
import Battery from './Battery';

function Widget(props) {
	const {
		macA,
		freeMem,
		totalMem,
		usedMem,
		memUsage,
		osType,
		upTime,
		numCores,
		cpuModel,
		cpuSpeed,
		cpuLoad,
		cpuMinMax,
		fsTotal,
		fsUsed,
		fsUsage,
		battery,
	} = props.data;

	const cpuWidgetId = `cpu-widget-${macA}`.replace(/:/g, '');
	const memoryWidgetId = `memory-widget-${macA}`.replace(/:/g, '');
	const diskWidgetId = `disk-widget-${macA}`.replace(/:/g, '');

	const info = {
		macA,
		osType,
		upTime,
		numCores,
		cpuModel,
		cpuSpeed,
	};
	const network = { macA };
	const memory = { memoryWidgetId, totalMem, usedMem, memUsage, freeMem };
	const cpu = { cpuWidgetId, cpuLoad, cpuMinMax };
	const disk = { diskWidgetId, fsTotal, fsUsed, fsUsage };

	return (
		<div className='widget'>
			<div className='row'>
				<CPU cpuData={cpu} />
				<Memory memoryData={memory} />
				<Disk diskData={disk} />
			</div>
			<span className='separator mx-auto my-4'></span>
			<div className='row'>
				<Network networkData={network} />
			</div>
			<span className='separator mx-auto my-4'></span>
			<div className='row px-5 py-3'>
				<div className='col info'>
					<Info infoData={info} />
				</div>
				<div className='col'>
					<Battery batteryData={battery} />
				</div>
			</div>
		</div>
	);
}

export default Widget;
