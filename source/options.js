// eslint-disable-next-line import/no-unassigned-import
import React from 'react';
import {createRoot} from 'react-dom/client';
import 'webext-base-css';
import './options.css';
import {TemplateForm} from './components/template-form';

const App = () => (
	<div className='detail-view-container'>
		<h1>Refined Claude Settings</h1>
		<a href='https://claude.ai' target='_blank' rel='noopener noreferrer'>
			Open Claude in a new tab
		</a>
		<section>
			<TemplateForm />
		</section>
	</div>
);

// Initialize React app
const root = createRoot(document.querySelector('#root'));
root.render(<App />);
