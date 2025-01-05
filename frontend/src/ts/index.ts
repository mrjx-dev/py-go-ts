// Import styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/styles.css';

// Import components
import { DataProcessor } from './components/DataProcessor';

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
  // Initialize Bootstrap
  const bootstrap = require('bootstrap');

  // Initialize our components
  new DataProcessor();

  console.log('Application initialized successfully');
}); 
