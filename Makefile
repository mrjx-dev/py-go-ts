.PHONY: help install run test clean build

help:
	@echo "Available commands:"
	@echo "  make install  - Install all dependencies"
	@echo "  make run      - Run development servers"
	@echo "  make test     - Run all tests"
	@echo "  make clean    - Clean up temporary files"
	@echo "  make build    - Build production assets"

install:
	@echo "Installing dependencies..."
	cd backend/django_project && python -m venv venv && \
		source venv/bin/activate && \
		pip install -r requirements.txt
	cd backend/go_services && go mod download
	cd frontend && npm install

run:
	@echo "Starting development servers..."
	docker-compose up

test:
	@echo "Running tests..."
	cd backend/django_project && python manage.py test
	cd backend/go_services && go test ./...
	cd frontend && npm test

clean:
	@echo "Cleaning up..."
	find . -type d -name "__pycache__" -exec rm -rf {} +
	find . -type f -name "*.pyc" -delete
	find . -type f -name "*.pyo" -delete
	find . -type f -name "*.pyd" -delete
	find . -type f -name ".coverage" -delete
	find . -type d -name "*.egg-info" -exec rm -rf {} +
	find . -type d -name "*.egg" -exec rm -rf {} +
	find . -type d -name ".cache" -exec rm -rf {} +
	find . -type d -name ".pytest_cache" -exec rm -rf {} +
	find . -type d -name "node_modules" -exec rm -rf {} +
	find . -type d -name "dist" -exec rm -rf {} +
	find . -type d -name "build" -exec rm -rf {} +

build:
	@echo "Building production assets..."
	cd frontend && npm run build
	cd backend/django_project && python manage.py collectstatic --noinput 
