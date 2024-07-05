import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

export const useTheme = () => {
    const theme = useSelector((state: RootState) =>
        state.theme.darkmode ? DarkTheme : LightTheme,
    );
    return theme;
};

export const DarkTheme = {
    base00: '#171e1f',
    base01: '#252c2d',
    base02: '#373c3d',
    base03: '#555e5f',
    base04: '#818f80',
    base05: '#c7c7a5',
    base06: '#e3e3c8',
    base07: '#e1eaef',
    base08: '#ff4658',
    base09: '#e6db74',
    base0A: '#fdb11f',
    base0B: '#499180',
    base0C: '#66d9ef',
    base0D: '#498091',
    base0E: '#9bc0c8',
    base0F: '#d27b53',
};
export const LightTheme = {
    base00: '#efecf4',
    base01: '#e2dfe7',
    base02: '#8b8792',
    base03: '#7e7887',
    base04: '#655f6d',
    base05: '#585260',
    base06: '#26232a',
    base07: '#19171c',
    base08: '#be4678',
    base09: '#aa573c',
    base0A: '#a06e3b',
    base0B: '#2a9292',
    base0C: '#398bc6',
    base0D: '#576ddb',
    base0E: '#955ae7',
    base0F: '#bf40bf',
};