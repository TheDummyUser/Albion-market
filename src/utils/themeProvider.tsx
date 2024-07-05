import React from 'react';
import { useTheme } from './utils';

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useTheme();

    const themeStyles = {
        '--color-base00': theme.base00,
        '--color-base01': theme.base01,
        '--color-base02': theme.base02,
        '--color-base03': theme.base03,
        '--color-base04': theme.base04,
        '--color-base05': theme.base05,
        '--color-base06': theme.base06,
        '--color-base07': theme.base07,
        '--color-base08': theme.base08,
        '--color-base09': theme.base09,
        '--color-base0A': theme.base0A,
        '--color-base0B': theme.base0B,
        '--color-base0C': theme.base0C,
        '--color-base0D': theme.base0D,
        '--color-base0E': theme.base0E,
        '--color-base0F': theme.base0F,
    } as React.CSSProperties;

    return <div style={themeStyles}>{children}</div>;
};