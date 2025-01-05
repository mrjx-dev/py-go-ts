import { api } from '../api';

export class DataProcessor {
  private form: HTMLFormElement;
  private input: HTMLInputElement;
  private output: HTMLDivElement;
  private loading: HTMLDivElement;

  constructor() {
    this.initializeElements();
    this.bindEvents();
  }

  private initializeElements(): void {
    // Create form
    this.form = document.createElement('form');
    this.form.className = 'mb-4';

    // Create input group
    const inputGroup = document.createElement('div');
    inputGroup.className = 'input-group';

    // Create input
    this.input = document.createElement('input');
    this.input.type = 'text';
    this.input.className = 'form-control';
    this.input.placeholder = 'Enter data to process...';
    this.input.required = true;

    // Create submit button
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.className = 'btn btn-primary';
    submitButton.textContent = 'Process';

    // Create loading indicator
    this.loading = document.createElement('div');
    this.loading.className = 'spinner-border text-primary d-none';
    this.loading.setAttribute('role', 'status');
    this.loading.innerHTML = '<span class="visually-hidden">Loading...</span>';

    // Create output area
    this.output = document.createElement('div');
    this.output.className = 'mt-3';

    // Assemble elements
    inputGroup.appendChild(this.input);
    inputGroup.appendChild(submitButton);
    this.form.appendChild(inputGroup);

    // Add to document
    const container = document.createElement('div');
    container.className = 'container mt-5';
    container.appendChild(this.form);
    container.appendChild(this.loading);
    container.appendChild(this.output);
    document.body.appendChild(container);
  }

  private bindEvents(): void {
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  private async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();

    const inputValue = this.input.value.trim();
    if (!inputValue) return;

    try {
      this.setLoading(true);

      // First, try to get cached data
      try {
        const cachedResult = await api.getCachedData(inputValue);
        this.showResult('Cached Result:', cachedResult.data);
      } catch (error) {
        // If not in cache, process the data
        const processedResult = await api.processData(inputValue);
        this.showResult('Processed Result:', processedResult);
      }
    } catch (error) {
      this.showError(error);
    } finally {
      this.setLoading(false);
    }
  }

  private setLoading(isLoading: boolean): void {
    this.loading.classList.toggle('d-none', !isLoading);
    this.input.disabled = isLoading;
    this.form.querySelector('button')!.disabled = isLoading;
  }

  private showResult(title: string, data: any): void {
    this.output.innerHTML = `
      <div class="alert alert-success">
        <h5>${title}</h5>
        <pre class="mb-0"><code>${JSON.stringify(data, null, 2)}</code></pre>
      </div>
    `;
  }

  private showError(error: any): void {
    this.output.innerHTML = `
      <div class="alert alert-danger">
        <h5>Error</h5>
        <p class="mb-0">${error.message || 'An unexpected error occurred'}</p>
      </div>
    `;
  }
}

// Initialize the component when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new DataProcessor();
}); 
