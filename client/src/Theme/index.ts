import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { darkTheme } from './darkTheme';
import { lightTheme } from './lightTheme';

export const getTheme = ({ darkMode = false }: { darkMode: boolean }) => {
  const theme = createTheme(darkMode ? darkTheme : lightTheme);

  return responsiveFontSizes(theme);
};
