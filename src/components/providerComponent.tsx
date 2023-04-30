'use client';

import React from 'react';
import { store } from '@/store';
import { Provider } from 'react-redux';

const ProviderComponent: React.FC<{
  children: React.ReactElement | React.ReactElement[];
}> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ProviderComponent;
