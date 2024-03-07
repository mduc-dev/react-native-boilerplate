import React from 'react';
export const ComponentDisplayName = {
  Button: 'Button',
} as const;

type DisplayNames = typeof ComponentDisplayName;

export const createComponent = <Props extends any>(
  Component: React.ComponentType<Props>,
  displayName: DisplayNames[keyof DisplayNames],
) => {
  const Comp: React.FC<Props> = (props: Props) => {
    return <Component {...(props as any)} />;
  };
  Comp.displayName = displayName;
  return Comp;
};
