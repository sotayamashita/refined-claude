import {useState, useEffect} from 'react';
import {getSettings, saveSettings} from '../options-storage.js';

export const TemplateForm = () => {
	const [templates, setTemplates] = useState([]);
	const [newTemplate, setNewTemplate] = useState({title: '', content: ''});
	const [message, setMessage] = useState('');

	useEffect(() => {
		const loadTemplates = async () => {
			const settings = await getSettings();
			setTemplates(settings.templates || []);
		};

		loadTemplates();
	}, []);

	const handleSubmit = async event => {
		event.preventDefault();
		if (!newTemplate.title || !newTemplate.content) {
			setMessage('Please fill in both title and content');
			return;
		}

		try {
			const settings = await getSettings();
			const updatedTemplates = [...(settings.templates || []), newTemplate];
			await saveSettings({templates: updatedTemplates});
			setTemplates(updatedTemplates);
			setNewTemplate({title: '', content: ''});
			setMessage('Template added successfully');
		} catch (error) {
			setMessage('Error saving template');
			console.error('Error saving template:', error);
		}
	};

	const handleDelete = async index => {
		try {
			const settings = await getSettings();
			const updatedTemplates = settings.templates.filter((_, i) => i !== index);
			await saveSettings({templates: updatedTemplates});
			setTemplates(updatedTemplates);
			setMessage('Template deleted successfully');
		} catch (error) {
			setMessage('Error deleting template');
			console.error('Error deleting template:', error);
		}
	};

	return (
		<div className='container'>
			<form onSubmit={handleSubmit} className='options-form'>
				<div className='form-group'>
					<label htmlFor='templateTitle'>Template Title</label>
					<input
						type='text'
						id='templateTitle'
						value={newTemplate.title}
						onChange={event => setNewTemplate({...newTemplate, title: event.target.value})}
						className='form-control'
					/>
				</div>
				<div className='form-group'>
					<label htmlFor='templateContent'>Template Content</label>
					<textarea
						id='templateContent'
						value={newTemplate.content}
						onChange={event => setNewTemplate({...newTemplate, content: event.target.value})}
						className='form-control'
						rows='4'
					/>
				</div>
				<button type='submit' className='btn btn-primary'>Add Template</button>
				{message && <div className='message'>{message}</div>}
			</form>

			<div className='templates-list'>
				<h3>Saved Templates</h3>
				{templates.length === 0 ? (
					<p>No templates saved yet</p>
				) : (
					<ul>
						{templates.map((template, index) => (
							<li key={index} className='template-item'>
								<div className='template-info'>
									<h4>{template.title}</h4>
									<p>{template.content}</p>
								</div>
								<button
									onClick={() => handleDelete(index)}
									className='btn btn-danger'
								>
									Delete
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
		</div>
	);
};
