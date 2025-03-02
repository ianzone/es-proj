import { useCallback, useEffect, useState } from 'react';

export type ThemeMode = 'light' | 'dark' | 'system';

export type Theme = 'light' | 'dark';

const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');

function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const init = matchMedia.matches ? 'dark' : 'light';
    return init;
  });

  useEffect(() => {
    const onThemeChange: MediaQueryList['onchange'] = (event) => {
      if (event.matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    };

    matchMedia.addEventListener('change', onThemeChange);

    return () => {
      matchMedia.removeEventListener('change', onThemeChange);
    };
  }, []);

  return theme;
}

export function useThemeMode(
  props: {
    localStorageKey?: string;
  } = {},
) {
  const { localStorageKey } = props;

  const [themeMode, setThemeMode] = useState<ThemeMode>(() => {
    const preferredThemeMode =
      localStorageKey?.length && (localStorage.getItem(localStorageKey) as ThemeMode | null);

    return preferredThemeMode ? preferredThemeMode : 'system';
  });

  const setThemeModeWithLocalStorage = useCallback(
    (mode: ThemeMode) => {
      setThemeMode(mode);
      if (localStorageKey?.length) {
        localStorage.setItem(localStorageKey, mode);
      }
    },
    [localStorageKey],
  );

  const currentTheme = useTheme();
  const theme = themeMode === 'system' ? currentTheme : themeMode;

  return {
    theme,
    themeMode,
    setThemeMode: setThemeModeWithLocalStorage,
  };
}
