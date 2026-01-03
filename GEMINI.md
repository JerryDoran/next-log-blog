## Project Overview

This is a Next.js application that serves as a blog platform. It is built with TypeScript and uses Tailwind CSS for styling. The application includes user authentication, session management, and models for posts and categories, indicating a multi-user blog with content categorization. The database is managed with Prisma, using a PostgreSQL backend.

## Building and Running

To get the development environment running, use the following command:

```bash
pnpm dev
```

To build the application for a production environment, use the following command:

```bash
pnpm run build
```

To start the application in a production environment, use the following command:

```bash
pnpm start
```

## Development Conventions

### Linting

To check for linting errors, run the following command:

```bash
pnpm lint
```

### Database

The application uses Prisma to manage the database. The database schema is defined in `prisma/schema.prisma`. To apply any changes to the database schema, you can use the following command:

```bash
npx prisma migrate dev
```

### Authentication

The application uses a custom authentication setup with `better-auth`. The authentication logic is located in `lib/auth.ts` and the related UI components are in `components/auth`.

### Additional Coding Preferences

- Always use tailwind css for styling
- Use Shadcn component library and all the necessary dependencies

### SEO Optimization
- optimize all pages for SEO
- example minimum metadata examples
- export const metadata: Metadata = {
  title: 'Blogs | Next.js App',
  description: 'Read our latest articles and insights',
  keywords: ['Blogs', 'Web Development', 'Next.js', 'React'],
  authors: [{ name: 'The Web Architech', url: 'https://thewebarchitech.com' }],
};

## Dependencies

The project uses `pnpm` as the package manager. The main dependencies are:
- `next`: The React framework for building server-side rendering and static web applications.
- `react`: A JavaScript library for building user interfaces.
- `typescript`: A typed superset of JavaScript that compiles to plain JavaScript.
- `tailwindcss`: A utility-first CSS framework for rapidly building custom user interfaces.
- `prisma`: A next-generation ORM for Node.js and TypeScript.
- `better-auth`: A library for handling authentication.
- `shadcn-ui`: A collection of re-usable components that are accessible and customizable.
- `zod`: A TypeScript-first schema declaration and validation library.
- `react-hook-form`: A library for managing forms in React.
- `resend`: A library for sending emails.
- `sonner`: A toast library for React.
- `lucide-react`: A library of icons.
- `next-themes`: A library for managing themes in Next.js.
- `eslint`: A tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
- `pnpm`: A fast, disk space-efficient package manager.