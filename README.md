# Herby

Herby is a modern, multi-layered (monorepo) web application built with Nuxt. It features user management, multiple OAuth providers, multi-language support, and customizable UI layers.

> **Note:** This is an old project I developed a long time ago. The codebase and dependencies may be outdated.
> 
> **GitHub Repository:** https://github.com/Xjectro/herby-oldest

## Features
- Nuxt 3-based client application
- Express-based server API
- OAuth integration: Discord, Twitch, GitHub, Kick
- Multi-language support (i18n)
- Layered structure: client, server, ui, translation, utils, packages
- User management, password reset, email verification
- Modern UI with Tailwind CSS
- Monorepo management with TurboRepo

## Getting Started
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/herby.git
   cd herby
   ```
2. Create a `.env` file and set the required environment variables:
   ```env
   # API keys and secrets
   SESSION_SECRET=xxx
   INTERACTION_TOKEN_SECRET=xxx
   DISCORD_CLIENT_ID=xxx
   DISCORD_CLIENT_SECRET=xxx
   DISCORD_REDIRECT_URI=xxx
   TWITCH_CLIENT_ID=xxx
   TWITCH_CLIENT_SECRET=xxx
   TWITCH_REDIRECT_URI=xxx
   GIT_CLIENT_ID=xxx
   GIT_CLIENT_SECRET=xxx
   GIT_REDIRECT_URI=xxx
   KICKPOINT_TOKEN=xxx
   SERVER_URL=http://localhost:3000
   CLIENT_URL=http://localhost:3001
   PROJECT_TITLE=Herby
   FILE_SIZE_LIMIT=5242880
   MIN_WITHDRAWABLE_ORBIT=10
   # ...other required variables
   ```
3. Install dependencies:
   ```sh
   bun install
   # or
   npm install
   ```
4. Start the development environment:
   ```sh
   bun run dev
   # or
   npm run dev
   ```

## Structure
- `apps/client`: Nuxt 3 client app
- `apps/server`: Express API server
- `layers/ui`, `layers/translation`, `layers/utils`, `layers/config`: Nuxt layers
- `packages/`: Shared code, database models, helpers, API services

## Contributing & License
Feel free to open a PR to contribute. License: MIT

---

**Warning:** Never commit secrets or API keys to the codebase. Always use a `.env` file for sensitive information. Do not push secrets to Github!
