import React from 'react';
import {createRoot} from 'react-dom/client';
import {TemplateForm} from './components/template-form.js';
import 'webext-base-css';
import './options.css';

// Main App component
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
const container = document.querySelector('#root');
const root = createRoot(container);
root.render(<App />);
