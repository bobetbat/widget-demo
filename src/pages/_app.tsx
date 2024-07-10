import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useCallback } from 'react';
import { Stack, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { EstimateGasWidget, ThemeMode } from 'estimate-gas-widget';
import useLocalStorage from '../hooks/useLocalStorage';

function MyApp({ Component, pageProps }: AppProps) {
  const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>('themeMode', ThemeMode.Light);

  const toggleThemeMode = useCallback(() => {
    setThemeMode((prevMode) => (prevMode === ThemeMode.Light ? ThemeMode.Dark : ThemeMode.Light));
  }, [setThemeMode]);

  return (
    <Stack>
      <Stack direction="row" justifyContent="flex-end">
        <IconButton onClick={toggleThemeMode} color="inherit">
          {themeMode === ThemeMode.Light ? <Brightness4 /> : <Brightness7 />}
        </IconButton>
      </Stack>
      <Stack>
        <EstimateGasWidget themeMode={themeMode ?? ThemeMode.Light} />
      </Stack>
    </Stack>
  );
}

export default MyApp;
