/**
 * @file Centralized configuration for Auth0 authentication.
 *
 * This file exports a typed configuration object for the Auth0 provider.
 * It reads the necessary values (domain, client ID, audience) from
 * environment variables to keep sensitive information out of the source code.
 *
 * This approach replaces hardcoded values previously found in App.tsx,
 * improving security and maintainability.
 *
 * Environment variables should be defined in a .env file at the project root,
 * prefixed with VITE_ as per Vite's convention.
 *
 * Example .env file:
 * VITE_AUTH0_DOMAIN="your-auth0-domain.auth0.com"
 * VITE_AUTH0_CLIENT_ID="your-auth0-client-id"
 * VITE_AUTH0_AUDIENCE="your-auth0-api-audience"
 */

interface Auth0Config {
  domain: string;
  clientId: string;
  audience: string;
  redirectUri: string;
}

// Vite exposes environment variables on the `import.meta.env` object.
const auth0Domain = import.meta.env.VITE_AUTH0_DOMAIN;
const auth0ClientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const auth0Audience = import.meta.env.VITE_AUTH0_AUDIENCE;

// Runtime validation to ensure the application is configured correctly.
if (!auth0Domain) {
  throw new Error("Auth0 configuration error: VITE_AUTH0_DOMAIN is not defined in your .env file.");
}

if (!auth0ClientId) {
  throw new Error("Auth0 configuration error: VITE_AUTH0_CLIENT_ID is not defined in your .env file.");
}

if (!auth0Audience) {
    // Note: The audience is crucial for securing API endpoints.
    // If the app only uses Auth0 for authentication and not for accessing a protected API,
    // this check might be adjusted. However, it's a best practice to have it.
  throw new Error("Auth0 configuration error: VITE_AUTH0_AUDIENCE is not defined in your .env file.");
}

export const auth0Config: Auth0Config = {
  domain: auth0Domain,
  clientId: auth0ClientId,
  audience: auth0Audience,
  redirectUri: window.location.origin,
};