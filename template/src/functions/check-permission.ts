import { toast } from '@components/toast';
import { Alert, Platform } from 'react-native';
import {
  PERMISSIONS,
  RESULTS,
  check,
  request,
  openSettings,
  Permission,
  openPhotoPicker,
} from 'react-native-permissions';
enum Setting {
  CAMERA = 'camera',
  PHOTO = 'photo',
  NOTIFICATION = 'notification',
}

const AlertOpenSettingContent = {
  photo: {
    title: 'Photo Permission',
    message: 'App cần quyền truy cập vào thư mục hình ảnh',
  },
  camera: {
    title: 'Camera Permission',
    message: 'App cần quyền truy cập vào máy ảnh',
  },
};

export function openSettingsApp() {
  openSettings().catch(() => console.log('cannot open settings'));
}

export function openSettingsAppWithAlert(settingKey?: Setting) {
  if (settingKey) {
    const { title, message } = AlertOpenSettingContent[settingKey];
    Alert.alert(
      title,
      message,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'destructive',
        },
        {
          text: 'Setting',
          onPress: openSettingsApp,
        },
      ],
      { cancelable: false },
    );
  } else {
    openSettingsApp();
  }
}

const permitPermission = (
  keyPermission: Permission,
  callback: () => void,
  settingKey?: Setting,
) => {
  if (keyPermission) {
    check(keyPermission)
      .then(result => {
        switch (result) {
          case RESULTS.BLOCKED:
            openSettingsAppWithAlert(settingKey);
            break;
          case RESULTS.DENIED:
            request(keyPermission).then(async response => {
              if (response === RESULTS.GRANTED) callback();
              if (response === RESULTS.BLOCKED)
                openSettingsAppWithAlert(settingKey);
            });
            break;
          case RESULTS.GRANTED:
          case RESULTS.LIMITED:
            callback();
            break;

          case RESULTS.UNAVAILABLE:
            request(keyPermission).then(response => {
              if (response === RESULTS.GRANTED) callback();
              if (response === RESULTS.BLOCKED)
                openSettingsAppWithAlert(settingKey);

              if (response === RESULTS.UNAVAILABLE) {
                if (Platform.OS === 'ios' && Number(Platform.Version) >= 14) {
                  openPhotoPicker().catch(err => {
                    toast.error(
                      keyPermission === PERMISSIONS.IOS.PHOTO_LIBRARY
                        ? err.message
                        : response,
                    );
                  });
                }
              }
            });
            break;
          default:
            break;
        }
      })
      .catch(error => {
        console.log(error);
      });
  }
};

export function checkPhotoLibraryPermission(callback: () => void) {
  let keyPermission: Permission = null;

  if (Platform.OS === 'ios') keyPermission = PERMISSIONS.IOS.PHOTO_LIBRARY;
  else
    keyPermission =
      Number(Platform.Version) >= 33
        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;

  permitPermission(keyPermission, callback, Setting.PHOTO);
}

export function checkCameraIsOpen(callback: () => void) {
  let keyPermission: Permission = null;

  if (Platform.OS === 'ios') keyPermission = PERMISSIONS.IOS.CAMERA;
  else keyPermission = PERMISSIONS.ANDROID.CAMERA;

  permitPermission(keyPermission, callback, Setting.CAMERA);
}
