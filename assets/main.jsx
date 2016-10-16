
import React from 'react';
import ReactDOM from 'react-dom';
import { Hello, Form } from 'component';

ReactDOM.render(
		<Hello name="World" />,
		document.querySelector('#hello')
	)	

ReactDOM.render(
		<Form action="login" method="post" />,
		document.querySelector('#form')
	)	