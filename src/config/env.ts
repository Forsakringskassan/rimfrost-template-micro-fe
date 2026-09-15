// eslint-disable-next-line @typescript-eslint/no-explicit-any -- window.__TEMPLATE_MICRO_FE_ENV__ is injected at runtime via runtime-config.js and has no type definition
const runtimeEnv = (window as any).__TEMPLATE_MICRO_FE_ENV__ ?? {};

/**
 * Centralized environment configuration.
 *
 * In development (npm run dev): values come from VITE_* in .env via Vite.
 * In Docker containers: RUNTIME_* values are injected into
 * window.__TEMPLATE_MICRO_FE_ENV__ at startup and take precedence over any
 * build-time baked values.
 *
 * Namespaced (not window._env_): this app is loaded as a Module Federation
 * remote inside a shell that shares one window with it, so a shared global
 * would let this app's config leak into — or be clobbered by — the shell's.
 */
export const env = {
  bffUrl: runtimeEnv.RUNTIME_BFF_URL || import.meta.env.VITE_BFF_URL || "",
};
