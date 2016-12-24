import React from 'react';
import { Link } from 'react-router';

export default () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </div>
  );
};
