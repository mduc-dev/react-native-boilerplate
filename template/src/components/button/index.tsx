import React from 'react';
import { TouchableOpacity } from 'react-native';
import { createComponent } from '@components/create-component';
import { ButtonProps } from './type';

export default function Button() {
  const ButtonComponent = (props: ButtonProps) => {
    return <TouchableOpacity {...props}>{props.children}</TouchableOpacity>;
  };

  const Primary = createComponent(ButtonComponent, 'Button');
  const Secondary = createComponent(ButtonComponent, 'Button');
  const Outline = createComponent(ButtonComponent, 'Button');

  return {
    Primary,
    Secondary,
    Outline,
  };
}
