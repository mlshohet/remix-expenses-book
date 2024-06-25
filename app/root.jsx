import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  Link
} from "@remix-run/react";

import styles from './styles/main.css';
import MainNavigation from "./components/MainNavigation";

export function Layout({ children }) {
    return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        {children}
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function ErrorBoundary({ error }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <title>An error occurred</title>
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <main>
          <h1>An error ocurred</h1>
          <p>{error?.message}</p>
          <p>Back to <Link to='/'>safety</Link></p>
        </main>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {}

export const links = () => {
  return [
    { rel: 'stylesheet', href: styles }
  ];
}

