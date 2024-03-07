import { useRoute } from '@react-navigation/native';

export default function useParams<T>(param: T, defaultValue: T): T {
  const route = useRoute();
  if (route.params) {
    return (route.params as Record<string | any, T>)[param] || defaultValue;
  }
  return defaultValue;
}
