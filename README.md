# Japan Housing - Modern Real Estate Blog

A modern, multilingual real estate blog platform specializing in Japanese housing, offering dynamic content, internationalization, and user-centric design for global property enthusiasts.

## Features

- Multilingual support (English, Japanese, Vietnamese)
- Dark/Light theme switching
- Responsive design for all devices
- Static data for articles, categories, and users
- Client-side authentication with local storage
- Minimalist UI inspired by modern Japanese design
- No backend dependency - fully static site

## Technology Stack

- React with TypeScript
- Tailwind CSS for styling
- Shadcn UI components
- React Query for state management
- Wouter for routing
- Context API for themes and languages

## Development

### Standard Development (with Express backend)

```bash
npm run dev
```

This starts both the Express backend and the Vite frontend server.

### Client-Only Development

For a completely static site experience without any server-side dependencies:

```bash
# Using the frontend.sh script directly
./frontend.sh

# Or using Node.js
node client-dev.js
```

This will start a Vite development server for the client only, using the static data files.

## Building for Production

### Static Site Build

To create a static build that can be deployed to any static hosting service:

```bash
# Build the static site
./frontend.sh build

# Preview the built site
./frontend.sh preview
```

Or use the export script that creates both a build and a simple server.js file:

```bash
node static-export.js
```

## Authentication

The site includes a client-side authentication system that:

1. Uses static data for demo users
2. Persists login state in localStorage
3. Supports login and registration (new users are stored in memory only)

## Data Structure

All data is now stored statically in the client:

- `client/src/data/articles.ts` - Blog posts and articles
- `client/src/data/categories.ts` - Property categories
- `client/src/data/users.ts` - User accounts for authentication

## License

MIT