import React, { FC, useEffect, useState, useContext, createContext, PropsWithChildren } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { Theme } from '@mui/material/styles';

import { darkTheme, lightTheme } from './index';
import useLocalStorage from './useLocalStorage';

interface ThemeContextValues {
  mode?: string;
  toggleMode: any;
  theme: Theme;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextValues>({
  mode: 'light',
  toggleMode: () => {},
  theme: lightTheme,
  isDarkMode: false,
});

const cacheKey = 'ui-theme-mode';

const ThemeConfig: FC<PropsWithChildren<{}>> = ({ children }) => {
  const [mode, setMode] = useLocalStorage(cacheKey, 'light');
  const [theme, setTheme] = useState(mode === 'light' ? lightTheme : darkTheme);

  function toggleMode() {
    if (mode === 'light') {
      setMode('dark');
    } else {
      setMode('light');
    }
  }

  useEffect(() => {
    if (mode === 'dark') {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  }, [mode]);

  return (
    <ThemeContext.Provider
      value={{
        mode,
        toggleMode,
        theme,
        isDarkMode: mode === 'dark',
      }}
    >
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeMode = () => useContext(ThemeContext);

export default ThemeConfig;
