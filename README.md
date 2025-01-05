# Django-Go-TypeScript Project

A modern web application that demonstrates the integration of Django, Go, and TypeScript. This project showcases how to leverage Django's robust web framework capabilities, Go's performance benefits for microservices, and TypeScript's type safety for frontend development.

## Technology Stack

### Backend

- **Django (Python)**

  - Main web framework
  - User authentication and authorization
  - Database operations
  - Template rendering
  - REST API endpoints
  - Business logic layer

- **Go**

  - High-performance microservices
  - Real-time operations
  - Background processing
  - Caching layer with Redis
  - Performance-critical operations

- **PostgreSQL**
  - Primary database
  - Data persistence
  - Relational data storage

### Frontend

- **TypeScript**

  - Type-safe JavaScript development
  - Modern ES6+ features
  - Component-based architecture
  - Strong typing system

- **Bootstrap**

  - Responsive UI framework
  - Modern design components
  - Mobile-first approach

- **Webpack**
  - Asset bundling
  - Code optimization
  - Development server
  - Hot module replacement

## Project Structure

```
django-go-typescript-project/
├── .git/
├── .gitignore
├── README.md
├── docker-compose.yml        # For running Django, Go services, and DB
├── Makefile                 # Helpful commands for development
├── backend/
│   ├── django_project/      # Django main project
│   │   ├── manage.py
│   │   ├── requirements.txt
│   │   ├── core/           # Django project settings
│   │   │   ├── __init__.py
│   │   │   ├── settings/
│   │   │   │   ├── base.py
│   │   │   │   ├── dev.py
│   │   │   │   └── prod.py
│   │   │   ├── urls.py
│   │   │   └── wsgi.py
│   │   └── apps/          # Django applications
│   │       └── main/      # Example app
│   └── go_services/       # Go microservices
│       ├── go.mod
│       ├── go.sum
│       ├── cmd/
│       │   └── api/      # Go API entry point
│       └── internal/     # Go business logic
├── frontend/
│   ├── package.json
│   ├── tsconfig.json
│   ├── webpack.config.js
│   ├── src/
│   │   └── ts/          # TypeScript source files
│   └── static/          # Compiled JS, CSS, etc.
└── static/              # Django collected static files
```

## Integration Points

### 1. Django Backend

- Serves as the main web server
- Handles user sessions and authentication
- Manages database operations through Django ORM
- Provides REST API endpoints
- Renders HTML templates
- Serves static files

### 2. Go Services

- Provides high-performance API endpoints
- Manages Redis caching layer
- Handles compute-intensive tasks
- Processes background jobs
- Offers real-time capabilities through WebSocket

### 3. TypeScript Frontend

- Compiles to JavaScript for browser execution
- Communicates with both Django and Go services
- Manages client-side state
- Handles user interactions
- Provides type-safe development

## Development Workflow

1. **Setup Development Environment**:

   ```bash
   # Install all dependencies
   make install
   ```

2. **Start Development Servers**:

   ```bash
   # Using docker-compose (recommended)
   make run

   # Or manually:
   cd backend/django_project
   python manage.py runserver

   cd backend/go_services
   go run cmd/api/main.go

   cd frontend
   npm run dev
   ```

3. **Access Development Servers**:
   - Django: http://localhost:8000
   - Go services: http://localhost:8080
   - Frontend dev server: http://localhost:3000

## Practical Use Cases

### 1. User Authentication Flow

- Django handles user registration and authentication
- Session management through Django's auth system
- TypeScript frontend manages login forms and validation
- Go services handle session verification for high-performance endpoints

### 2. Data Processing Pipeline

- User submits data through TypeScript frontend
- Django validates and stores the data
- Go services process the data in background
- Redis caches processed results
- Real-time updates sent to frontend

### 3. Real-time Features

- Go services manage WebSocket connections
- TypeScript frontend maintains socket connection
- Real-time updates through Go's efficient concurrency
- Django handles persistent storage of real-time data

### 4. High-Performance Operations

- Static content served by Django
- Compute-intensive operations handled by Go
- Caching layer managed by Go and Redis
- TypeScript handles client-side caching

## Best Practices

### Django (Python)

- Type hints for better code quality
- Modular settings for different environments
- Django REST Framework for APIs
- Proper authentication and authorization
- Environment variable configuration

### Go

- Clean architecture principles
- Proper error handling
- Context for cancellation
- Graceful shutdown
- Structured logging
- Redis integration for caching

### TypeScript

- Strict type checking
- Interface-based development
- Modern ES6+ features
- Component-based architecture
- Proper error handling
- API client abstraction

### Development

- Docker containerization
- Environment-based configuration
- Comprehensive logging
- Testing infrastructure
- Code formatting and linting
- Asset optimization

## Contributing

Please read CONTRIBUTING.md for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Getting Started

1. Clone the repository
2. Install dependencies:

   ```bash
   make install
   ```

3. Create necessary environment files:

   - `.env` in Django project root
   - `.env` in Go services directory

4. Start development servers:

   ```bash
   make run
   ```

5. Start developing!

## Testing

Run all tests across the stack:

```bash
make test
```

## Building for Production

```bash
make build
```

This will:

- Compile TypeScript to JavaScript
- Optimize and bundle assets
- Collect Django static files
- Prepare for deployment

## Deployment

The project is containerized and can be deployed using Docker:

```bash
docker-compose -f docker-compose.prod.yml up -d
```

## Additional Resources

- Django Documentation: https://docs.djangoproject.com/
- Go Documentation: https://golang.org/doc/
- TypeScript Documentation: https://www.typescriptlang.org/docs/
- Bootstrap Documentation: https://getbootstrap.com/docs/
