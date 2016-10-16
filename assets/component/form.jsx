import React from 'react';

class Form extends React.Component {
	constructor() {
		super();
		this.props = {
			method: 'get'
		}
	}
	render() {
		return (
				<form action={this.props.action} method={this.props.method} onSubmit={this.handleSubmit}>
					<label>
						<input type="checkbox" name="flag" />
						选项
					</label>
					<button type="submit">保存</button>
				</form>
			)
	}

	handleSubmit(proxy, b, event) {
		// console.log(arguments);
		event.preventDefalult();
	}

	test() {
		console.log(this)
	}
} 

export default Form;