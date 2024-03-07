import * as Ting from '@baronha/ting';
import {
  ToastOptions as ToastTingOptions,
  AlertOptions as AlertTingOptions,
} from '@baronha/ting';

import { CustomOption, ValueOrFunction } from './type';

type ToastOptions = Omit<ToastTingOptions, 'title' | 'preset' | 'duration'> & {
  /**
   * Duration in milliseconds.
   */
  duration?: number;
};

type AlertOptions = Omit<AlertTingOptions, 'title'> & {};

function getPreset<T = string>(title: string, preset: T) {
  return title.length > 28 ? 'none' : preset;
}

export const toast = (title: string, options?: ToastOptions) => {
  if (typeof options?.duration === 'number') {
    options.duration = options.duration / 1000;
  }
  return Ting.toast({
    title: title,
    preset: 'none',
    ...options,
  });
};

toast.error = (title: string, options?: ToastOptions) => {
  if (typeof options?.duration === 'number') {
    options.duration = options.duration / 1000;
  }
  return Ting.toast({
    title: title,
    preset: getPreset(title, 'error'),
    haptic: 'error',
    ...options,
  });
};
toast.success = (title: string, options?: ToastOptions) => {
  if (typeof options?.duration === 'number') {
    options.duration = options.duration / 1000;
  }
  return Ting.toast({
    title: title,
    preset: getPreset(title, 'done'),
    haptic: 'success',
    ...options,
  });
};

toast.custom = (title: string, options: CustomOption) => {
  if (typeof options?.duration === 'number') {
    options.duration = options.duration / 1000;
  }
  return Ting.toast({
    title: title,
    icon: options.icon,
    duration: options.duration,
  });
};

toast.dismiss = () => false;

toast.promise = function <T>(
  promise: Promise<T>,
  msgs: {
    loading: string;
    success: ValueOrFunction<string, T>;
    error: ValueOrFunction<string, any>;
  },
  options?: AlertOptions,
) {
  if (typeof options?.duration === 'number') {
    options.duration = options.duration / 1000;
  }
  Ting.alert({
    title: msgs.loading,
    preset: 'spinner',
    ...(options as any),
  });
  promise
    .then(p => {
      Ting.dismissAlert();
      Ting.alert({
        title: msgs.success,
        preset: 'done',
        ...(options as any),
      });
      return p;
    })
    .catch(() => {
      Ting.dismissAlert();
      Ting.alert({
        title: msgs.error,
        preset: 'error',
        ...(options as any),
      });
    });

  return promise;
};
