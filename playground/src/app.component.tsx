import type { Component } from 'solid-js';
import { UseTimeRoute } from './routes/use-time.route';
import './app.styles.css';

export const App: Component = () => {
  return (
    <main>
      <UseTimeRoute />

      <h1>Heading</h1>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, dolorum.
      </p>
    </main>
  );
};
