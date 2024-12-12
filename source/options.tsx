import 'webext-base-css';
import './options.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { OptionsPage } from './components/OptionsPage';

// Initialize React app
const root = createRoot(document.getElementById('root')!);
root.render(<OptionsPage />);
