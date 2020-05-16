function drawCircle(canvas, currentLoad) {
	if (canvas) {
		let context = canvas.getContext('2d');
		// Draw Inner Circles
		context.clearRect(0, 0, 500, 500);
		context.fillStyle = 'rgb(32, 32, 32)';
		context.beginPath();
		context.arc(50, 50, 45, Math.PI * 0, Math.PI * 2);
		context.closePath();
		context.fill();

		context.lineWidth = 5;
		context.strokeStyle = 'rgb(60,60,60)';
		context.beginPath();
		context.arc(50, 50, 40,Math.PI * 0, Math.PI * 2);
		context.stroke();

		// Draw the outer line
		context.lineWidth = 5;
		if (currentLoad < 20) {
			context.strokeStyle = '#00ff00';
		} else if (currentLoad < 40) {
			context.strokeStyle = '#337ab7';
		} else if (currentLoad < 60) {
			context.strokeStyle = '#f0ad4e';
		} else {
			context.strokeStyle = '#d9534f';
		}
		context.beginPath();
		context.arc(50, 50, 40, Math.PI * 1.5, (Math.PI * 2 * currentLoad) / 100 + Math.PI * 1.5);
		context.stroke();
	}
}

export default drawCircle;
