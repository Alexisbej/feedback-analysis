# Real-Time Customer Feedback Tool 📊

An end-to-end platform for businesses to collect, analyze, and act on customer feedback using QR codes, mobile links, and AI-powered insights.

![Version](https://img.shields.io/badge/version-0.1.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 📚 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technology Stack](#technology-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Development](#development)
  - [Using Docker](#using-docker)
  - [Available Scripts](#available-scripts)
  - [Linting and Testing](#linting-and-testing)
- [Deployment](#deployment)
- [CI/CD Pipeline](#cicd-pipeline)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Overview

The Real-Time Customer Feedback Tool is a SaaS application designed to help service businesses gather, analyze, and act on customer feedback through easily distributable QR codes and mobile links. The platform enables businesses to quickly identify areas for improvement, enhance service quality, and ultimately improve customer satisfaction.

Built with a modern technology stack including Next.js 15, React 19, and PostgreSQL with Prisma ORM, the application follows hexagonal architecture principles for clean separation of concerns and maintainability.

## Key Features

### 📝 Feedback Collection

- Create customizable feedback forms with various question types
- Distribute via QR codes, direct links, email, or SMS
- White-label support for brand consistency

### 📊 Real-Time Analytics Dashboard

- Monitor feedback as it arrives with live response tracking
- Get automated alerts for negative feedback
- Segment data by campaign, time period, or feedback channel

### 🧠 AI-Powered Insights

- Sentiment analysis using Claude 3.5 Sonnet AI model
- Trend identification and actionable recommendations
- Automated report generation with key findings

### 🌐 Multi-Tenant Support

- Full multi-tenant architecture
- Tenant-specific branding and settings
- Role-based access control

### 💰 Subscription Management

- Tiered pricing plans (Free, Pro, Enterprise)
- Seamless upgrade/downgrade flows
- Usage tracking and limits

## Technology Stack

### Frontend

- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS, Shadcn UI components
- **State Management**: Zustand
- **Data Fetching**: SWR, TanStack Query

### Backend

- **API**: Next.js API routes (serverless)
- **Database**: PostgreSQL (Neon serverless)
- **ORM**: Prisma with Neon adapter
- **Authentication**: NextAuth.js with Google OAuth
- **AI Integration**: Anthropic Claude via AI SDK

### Infrastructure

- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Deployment**: Vercel or self-hosted options

## Architecture

The application follows a hexagonal architecture (also known as ports and adapters) pattern:

- **Core Domain**: Business logic independent of external concerns
- **Application Layer**: Use cases that orchestrate domain operations
- **Infrastructure**: External adapters for persistence, messaging, etc.

This approach allows for:

- Clear separation of concerns
- Easier testing through dependency isolation
- Flexibility to swap out infrastructure components

## Getting Started

### Prerequisites

- Node.js (v20.x or later)
- npm (v9.x or later) or pnpm
- PostgreSQL database (or Neon account)
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/feedback-analysis.git
cd feedback-analysis

# Install dependencies
npm install
# or
pnpm install

# Copy environment variables template
cp .env.example .env

# Run database migrations
npx prisma migrate dev --name init

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env` file in the project root and add the following:

```ini
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/feedbackdb"

# Authentication
NEXTAUTH_SECRET="your-nextauth-secret"
NEXTAUTH_URL="http://localhost:3000"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# AI Services
ANTHROPIC_API_KEY="your-anthropic-api-key"

# Application Settings
BASE_URL="http://localhost:3000"
```

## Development

### Using Docker

For a consistent development environment, you can use Docker:

```bash
docker-compose -f docker/docker-compose.yaml up
```

### Available Scripts

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm start          # Start production server
npm run lint       # Run code linting
npm run test       # Run tests
npm run test:watch # Run tests in watch mode
npm run type-check # Run TypeScript type checking
```

### Linting and Testing

The project uses:

- ESLint for code linting
- Vitest for testing
- TypeScript for type checking
- Husky for pre-commit hooks

## Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure the environment variables
4. Deploy

### Self-Hosted Deployment

For self-hosted deployment, use Docker:

```bash
# Build the production image
docker build -f docker/Dockerfile --target production -t feedback-app .

# Run the production container
docker run -p 3000:3000 --env-file .env feedback-app
```

## CI/CD Pipeline

The project includes a GitHub Actions workflow for continuous integration and deployment.

## API Documentation

- `POST /api/feedback` - Submit new feedback
- `GET /api/feedback/:id` - Get specific feedback
- `POST /api/sentiment` - Analyze text sentiment using Claude AI

## Contributing

Contributions are welcome! Please fork the repo, create a feature branch, and submit a PR.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Built with ❤️ by Alexis Bejrach
