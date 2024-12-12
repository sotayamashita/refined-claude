import React from 'react';
import {createRoot} from 'react-dom/client';
import {TemplateForm} from './components/template-form.js';
import 'webext-base-css';
import './options.css';

// Main App component
const App = () => (
	<div className='container'>
		<TemplateForm />
	</div>
);

// Initialize React app
const root = createRoot(document.querySelector('#app'));
root.render(<App />);
