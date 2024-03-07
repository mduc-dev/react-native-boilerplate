import {
  checkCameraIsOpen,
  checkPhotoLibraryPermission,
} from '@functions/check-permission';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Platform, ToastAndroid } from 'react-native';
import {
  CameraOptions,
  ImageLibraryOptions,
  ImagePickerResponse,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';

export interface MediaResponseType {
  name: string;
  uri: string;
  type: string;
  size: number;
}

export const useMediaPicker = (props?: CameraOptions & ImageLibraryOptions) => {
  const { t } = useTranslation('Common');

  const [file, setFile] = useState<MediaResponseType | undefined>();

  const handleResponse = (response: ImagePickerResponse) => {
    // const result = {
    //   name: 'ProjectName-media',
    //   uri:
    //     Platform.OS === 'android'
    //       ? response.assets
    //       : response.path.replace('file://', ''),
    //   type: response.mime || 'video/mp4',
    //   size: response.size || 0,
    // };
    // setFile(response);
  };

  
  const handleError = useCallback(async (error: ImagePickerResponse) => {
    const { errorCode, errorMessage } = error || {};
    if (errorCode === 'camera_unavailable') {
      if (Platform.OS === 'android')
        ToastAndroid.show(t('notExsistCamera'), 500);
    }
    if (errorCode === 'others' || errorCode === 'permission') {
      if (Platform.OS === 'android')
        ToastAndroid.show(errorMessage.toLocaleUpperCase(), 500);
    }
  }, []);

  const openPicker = () => {
    const options = props;
    const data = [
      {
        label: t('take_photo'),
        icon: { name: 'camera', type: 'ionicons' },
        onPress: () => {
          checkCameraIsOpen(async () => {
            await launchCamera(options, response => {
              if (response.errorCode) handleError(response);
              handleResponse(response);
            });
          });
        },
      },
      {
        label: t('choose_from_library'),
        icon: { name: 'image', type: 'ionicons' },
        onPress: () => {
          checkPhotoLibraryPermission(async () => {
            await launchImageLibrary(options, response => {
              if (response.errorCode) handleError(response);
              handleResponse(response);
            });
          });
        },
      },
    ];
  };

  return { file, setFile, openPicker };
};
