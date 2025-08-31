# Keystone API

A comprehensive NestJS-based API system for managing tasks, machines, and data integration workflows. Built with TypeScript, PostgreSQL, and Redis for high-performance data processing and management.

## Features

- **Task Management**: Queue-based task processing with status tracking
- **Machine Management**: Configuration and monitoring of processing machines
- **Data Integration**: Support for various data sources and destinations
- **Authentication & Authorization**: JWT-based authentication with role-based permissions
- **Notification System**: Multi-channel notifications (Email, SMS, Push, WhatsApp)
- **AWS Integration**: Complete AWS services integration
- **State Machine**: Workflow state management system
- **File Processing**: Support for CSV, Excel, and various file formats
- **API Documentation**: Swagger/OpenAPI integration
- **Monitoring**: Sentry integration for error tracking

## Architecture

### Core Libraries

- **@can/aws**: AWS services integration
- **@can/common**: Shared utilities and services
- **@can/notification**: Multi-channel notification system
- **@can/state-machine**: Workflow state management

### Key Modules

- **Core**: Authentication, authorization, user management
- **APIs**: RESTful API endpoints
- **Tasks**: Task queue and processing system
- **Machines**: Machine configuration and management
- **Common**: Shared services and utilities

## Prerequisites

- Node.js 14 or higher
- PostgreSQL 12 or higher
- Redis 6 or higher
- Docker (optional, for containerized deployment)

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gnm-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Copy the development environment file and configure your settings:
   ```bash
   cp src/core/config/development.env .env
   ```
   
   Update the environment variables in `.env` file:
   ```env
   NODE_ENV=development
   PORT=6000
   
   # Database Configuration
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASS=your_password
   DB_NAME=gnm_dev
   
   # Redis Configuration
   REDIS_HOST_URL=localhost
   REDIS_PORT=6379
   
   # JWT Configuration
   JWT_SECRET=your_jwt_secret
   JWT_EXP_TIME=365days
   ```

4. **Database Setup**
   Ensure PostgreSQL is running and create the required databases:
   ```sql
   CREATE DATABASE gnm_dev;
   ```

## Usage

### Development

```bash
# Start in development mode with watch
npm run start:dev

# Start in debug mode
npm run start:debug
```

### Production

```bash
# Build the application
npm run build

# Start in production mode
npm run start:prod
```

### Docker

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in detached mode
docker-compose up -d
```

## API Documentation

The API documentation is available via Swagger UI at:
```
http://localhost:6000/v1/docs
```

## Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

## Code Quality

```bash
# Lint the code
npm run lint

# Format the code
npm run format
```

## Project Structure

```
gnm-api/
├── src/
│   ├── apis/                 # API endpoints and modules
│   ├── common/              # Shared services and utilities
│   ├── core/                # Core functionality (auth, config, etc.)
│   └── main.ts              # Application entry point
├── libs/                    # Shared libraries
│   ├── aws/                 # AWS integration
│   ├── common/              # Common utilities
│   ├── notification/        # Notification services
│   └── state-machine/       # State machine implementation
├── test/                    # Test files
├── docker-compose.yml       # Docker composition
├── Dockerfile              # Docker configuration
└── package.json            # Project dependencies
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|--------|
| `NODE_ENV` | Environment mode | `development` |
| `PORT` | Server port | `6000` |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXP_TIME` | JWT expiration time | `365days` |
| `DB_HOST` | Database host | `localhost` |
| `DB_PORT` | Database port | `5432` |
| `REDIS_HOST_URL` | Redis host | `localhost` |
| `REDIS_PORT` | Redis port | `6379` |

## Deployment

### Staging

```bash
npm run deploy:stage
```

### Production

```bash
npm run deploy:prod
```

## Monitoring

- **Logs**: Winston-based logging with daily rotation
- **Health Checks**: Built-in health check endpoints

## Security

- **Helmet**: Security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Request throttling
- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Fine-grained permissions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Write unit tests for new features
- Use conventional commit messages
- Ensure code passes linting and formatting checks

## License

This project is licensed under UNLICENSED.

## Support

For support and questions, please contact the development team or create an issue in the project repository.



## Views need to be created in DB

-- public.user_role_permissions source

CREATE OR REPLACE VIEW public.user_role_permissions
AS SELECT u.id AS user_id,
    u.name AS user_name,
    u.email,
    urp.role_id,
    roles.name AS role_name,
    rpm.permission_id,
    permissions.action AS permission_name,
    u.status,
    u.mobile,
    ou.organization_id AS "organizationId",
    o.display_name as "org_display_name",
    u.type
   FROM users u
     JOIN user_role urp ON u.id = urp.user_id
     JOIN role_permission rpm ON urp.role_id = rpm.role_id
     JOIN roles ON rpm.role_id = roles.id
     JOIN permissions ON rpm.permission_id = permissions.id
     LEFT JOIN organization_users ou ON u.id = ou.user_id AND ou.status = 'active'::enum_organisation_users_status
     LEFT JOIN organizations o ON o.id = ou.organization_id
  WHERE u.status::text = 'active'::text AND urp.status::text = 'active'::text AND permissions.status::text = 'active'::text
  ORDER BY u.id, urp.role_id, rpm.permission_id;


  -- public.user_app_role_permissions source
  
  scp -i ./nuros_gcp.pem ../gnm-api/dist/main.js systemadmin@34.131.205.168:/home/systemadmin/projects/codebases/gnm-api



  -- public.user_app_role_permissions source

CREATE OR REPLACE VIEW public.user_app_role_permissions
AS SELECT u.id AS "userId",
    u.name AS "userName",
    ar.name AS "appRoleName",
    ar.id AS "appRoleId",
    a.app_image AS "appImage",
    a.app_url AS "appUrl",
    a.id AS "appId",
    a.description,
    a.name AS "appName",
    ap.id AS "appPermissionId",
    ap.action AS "appPermissionName",
    u.status,
    u.type,
    u.mobile
   FROM users u
     JOIN user_app_roles uar ON u.id = uar.user_id
     JOIN app_roles ar ON ar.id = uar.app_role_id
     JOIN applications a ON a.id = uar.app_id
     JOIN app_role_permissions arp ON arp.app_role_id = uar.app_role_id
     JOIN app_permissions ap ON ap.id = arp.app_permission_id
  WHERE a.status::text = 'active'::text AND ap.status::text = 'active'::text AND ar.status::text = 'active'::text AND arp.status::text = 'active'::text AND uar.status::text = 'active'::text;