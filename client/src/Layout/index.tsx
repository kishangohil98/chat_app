import React from 'react';
import { Navbar } from './Navbar';

export function withLayout<P>(Component: React.ComponentType<P>) {
  return (props: P) => {
    return (
      <>
        <Navbar />
        <Component {...(props as P)} />
      </>
    );
  };
}
