# Real-Time Customer Feedback Tool

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [CI/CD Pipeline](#cicd-pipeline)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

The Real-Time Customer Feedback Tool is a SaaS application designed to help service businesses gather real-time feedback from customers through QR codes and mobile links. This tool enables businesses to quickly address concerns, improve service quality, and enhance customer satisfaction.

## Features

- **Feedback Collection:** Create customizable feedback forms and distribute them via QR codes or links.
- **Real-Time Analytics Dashboard:** Monitor feedback in real-time with live response tracking and automated alerts.
- **Reporting & Insights:** Generate automated reports and gain actionable insights through sentiment analysis.
- **Compliance & Localization:** Ensure GDPR compliance and support multiple languages.
- **White-Labeling:** Customize the tool with your brand's logo, colors, and domain.

## Technology Stack

- **Frontend:** Next.js, React, Tailwind CSS
- **Backend:** Next.js API routes, Prisma ORM
- **Database:** PostgreSQL
- **Authentication:** NextAuth.js with Google SSO
- **State Management:** Zustand
- **CI/CD:** GitHub Actions
- **Linting & Formatting:** ESLint, Prettier, Husky

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm (v6 or later) or yarn
- Git

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo
   ```
2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables:**

   ```bash
   DATABASE_URL=your_database_url
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Initialize Prisma:**

   ```bash
   npx prisma migrate dev --name init
   ```

5. **Run the Development Server:**

   ```bash
   npm run dev
   ```

6. **Access the Application:**

   Open your browser and navigate to http://localhost:3000.

## Project Structure

```
my-next-app/
├── app/
│ ├── (admin)/ # Admin routes (grouped)
│ │ └── dashboard/page.tsx
│ ├── (public)/ # Public routes (grouped)
│ │ └── feedback/[id]/page.tsx
│ ├── api/ # API routes directory
│ │ ├── webhooks/
│ │ │ └── stripe/route.ts # Stripe webhook handler
│ │ └── feedback/route.ts # Feedback API endpoint
│ │
│ ├── lib/ # Hexagonal Architecture core
│ │ ├── core/ # Domain entities
│ │ │ └── feedback/
│ │ │ ├── aggregate.ts # Feedback business rules
│ │ │ └── repository.ts # Interface definition
│ │ │
│ │ ├── infrastructure/ # Adapters implementation
│ │ │ ├── prisma-repository.ts # Prisma implementation
│ │ │ └── twilio-adapter.ts # SMS service adapter
│ │ │
│ │ └── use-cases/ # Application layer
│ │ └── process-feedback.ts
│ │
│ ├── components/ # UI components
│ │ ├── feedback-form.tsx
│ │ └── realtime-chart.tsx
│ │
│ ├── middleware.ts # Auth & tenant resolution
│ ├── layout.tsx # Root layout
│ └── page.tsx # Home page
│
├── prisma/
│ └── schema.prisma # Single schema file
│
├── public/ # Static assets
│ └── brands/ # White-label assets
│
├── styles/ # Tailwind configuration
│ ├── globals.css
│ └── tailwind.config.ts
│
├── store/ # Zustand stores
│ └── feedback-store.ts
│
├── types/ # Shared TS types
│
├── .env.local # Environment variables
├── next.config.js # Next.js config
└── package.json
```

## Configuration

- Environment Variables: Configure your environment variables in the .env.local file.
- Prisma: Update the Prisma schema in prisma/schema.prisma and run migrations using npx prisma migrate dev.
- Tailwind CSS: Customize your Tailwind CSS configuration in styles/tailwind.config.ts.

## CI/CD Pipeline

- GitHub Actions: The CI/CD pipeline is configured using GitHub Actions. The workflow is defined in .github/workflows/ci.yml.
- Workflow Steps:
  Checkout code
  Set up Node.js
  Install dependencies
  Lint code
  Run tests
  Build project

## Contributing

1. Fork the repository
2. Create a new branch (git checkout -b feature-branch)
3. Commit your changes (git commit -am 'Add new feature')
4. Push to the branch (git push origin feature-branch)
5. Create a new Pull Request

## License

This project is licensed under the MIT License. See the LICENSE file for details.
