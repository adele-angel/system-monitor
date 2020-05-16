import React, { Component } from 'react';
import moment from 'moment';

import socket from '../util/socketConnection';
import Widget from './widget/Widget';
import './Main.css';

export class Main extends Component {
	constructor() {
		super();
		this.state = {
			perfData: {},
		};
	}

	componentDidMount() {
		// Get new data
		socket.on('data', (data) => {
			// Creating a copy of current state
			const currentState = { ...this.state.perfData };
			currentState[data.macA] = data;
			// Updating (mutating) the state
			this.setState({
				perfData: currentState,
			});
		});
	}

	render() {
		let widgets = [];
		const data = this.state.perfData;
		Object.entries(data).forEach(([key, value]) => {
			widgets.push(<Widget key={key} data={value} />);
		});

		return (
			<main>
				<header className='py-3 pl-5 mb-4'>
					<h3>System Monitor</h3>
					<span className='header-date'>{moment().format('MMMM Do YYYY, h:mm:ss a')}</span>
				</header>
				<div className='widgets'>{widgets}</div>
			</main>
		);
	}
}

export default Main;
