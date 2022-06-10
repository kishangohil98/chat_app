/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { Navbar } from './Navbar';

export function withLayout<P>(Component: React.ComponentType<P>) {
  return function returnComponent(props: P) {
    return (
      <>
        <Navbar />
        <Component {...(props as P)} />
      </>
    );
  };
}
