const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Machine = new Schema({
	macA: String,
	cpuLoad: Number,
	freeMem: Number,
	totalMem: Number,
	usedMem: Number,
	memUsage: Number,
	osType: String,
	upTime: Number,
	cpuModel: String,
	numCores: Number,
	cpuSpeed: Number,
	fsTotal: Number,
	fsUsed: Number,
	fsUsage: Number,
	isActive: Boolean,
	battery: {
		hasbattery: Boolean,
		ischarging: Boolean,
		voltage: Number,
		percent: Number,
	},
});

module.exports = mongoose.model('Machine', Machine);
