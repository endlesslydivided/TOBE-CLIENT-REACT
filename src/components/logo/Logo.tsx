import PropTypes from 'prop-types';
import { FC, forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';

interface ILogoProps
{
  sx: object,
  disabledLink: boolean,
}

const Logo  = forwardRef(({ disabledLink = false, sx, ...other }:ILogoProps, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
    <Box ref={ref} component="div" sx={{ width: 40, height: 40, display: 'inline-flex', ...sx}} {...other}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 512 512">
        <defs id="defs34" >
          <linearGradient id="BG1" x1="100%" x2="50%" y1="9.946%" y2="50%">
            <stop offset="0%" stopColor={PRIMARY_DARK} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>

          <linearGradient id="BG2" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>

          <linearGradient id="BG3" x1="50%" x2="50%" y1="0%" y2="100%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>
        <g id="layer1">
          <g id="g7542">
            <path
              d="M 262.5 241.5 A 47 47 0 1 1  168.5,241.5 A 47 47 0 1 1  262.5 241.5 z"
              fill="BG1"
              id="path1933" />
            <path
              d="M 262.5 335.5 A 47 47 0 1 1  168.5,335.5 A 47 47 0 1 1  262.5 335.5 z"
              fill="BG1"
              id="path1961" />
            <path
              d="M 262.5 147.5 A 47 47 0 1 1  168.5,147.5 A 47 47 0 1 1  262.5 147.5 z"
              fill="BG1"
              id="path1967" />
            <path
              d="M 180.5 194.5 A 47 47 0 1 1  86.5,194.5 A 47 47 0 1 1  180.5 194.5 z"
              fill="BG1"
              id="path1971" />
            <path
              d="M 344.5 194.5 A 47 47 0 1 1  250.5,194.5 A 47 47 0 1 1  344.5 194.5 z"
              fill="BG1"
              id="path1973" />
            <path
              d="M 180.5 288.5 A 47 47 0 1 1  86.5,288.5 A 47 47 0 1 1  180.5 288.5 z"
              fill="BG1"
              id="path1979" />
            <path
              d="M 344.5 288.5 A 47 47 0 1 1  250.5,288.5 A 47 47 0 1 1  344.5 288.5 z"
              fill="BG1"
              id="path1981" />
            <path
              d="M 262.5 429.5 A 47 47 0 1 1  168.5,429.5 A 47 47 0 1 1  262.5 429.5 z"
              fill="BG1"
              id="path1963" />
            <path
              d="M 262.5 53.5 A 47 47 0 1 1  168.5,53.5 A 47 47 0 1 1  262.5 53.5 z"
              fill="BG1"
              id="path1965" />
            <path
              d="M 98.5 147.5 A 47 47 0 1 1  4.5,147.5 A 47 47 0 1 1  98.5 147.5 z"
              fill="BG1"
              id="path1969" />
            <path
              d="M 426.5 147.5 A 47 47 0 1 1  332.5,147.5 A 47 47 0 1 1  426.5 147.5 z"
              fill="BG1"
              id="path1975" />
            <path
              d="M 98.5 335.5 A 47 47 0 1 1  4.5,335.5 A 47 47 0 1 1  98.5 335.5 z"
              fill="BG1"
              id="path1977" />
            <path
              d="M 426.5 335.5 A 47 47 0 1 1  332.5,335.5 A 47 47 0 1 1  426.5 335.5 z"
              fill="BG1"
              id="path1983" />
          </g>
          <g
            id="g7557">
            <path
              d="M 215.5,53.5 L 379.5,147.5 L 379.5,335.5 L 215.5,429.5 L 51.5,335.5 L 51.5,147.5 L 215.5,53.5 z "
              fill="BG2"
              id="path2886" />
            <path
              d="M 215.5,53.5 L 51.5,335.5 L 379.5,335.5 L 215.5,53.5 z "
              fill="BG2"
              id="path2888" />
            <path
              d="M 51.5,147.5 L 215.5,429.5 L 379.5,147.5 L 51.5,147.5 z "
              fill="BG2"
              id="path2890" />
            <path
              d="M 215.5,147.5 L 133.5,194.5 L 133.5,288.5 L 215.5,335.5 L 297.5,288.5 L 297.5,194.5 L 215.5,147.5 z "
              fill="BG2"
              id="path2892" />
            <path
              d="M 133.5,288.5 L 215.5,53.5 L 297.5,288.5 L 133.5,288.5 z "
              fill="BG2"
              id="path2894" />
            <path
              d="M 215.5,429.5 L 133.5,194.5 L 297.5,194.5 L 215.5,429.5 z "
              fill="BG2"
              id="path2896" />
            <path
              d="M 51.5,147.5 L 379.5,335.5"
              fill="BG2"
              id="path2898" />
            <path
              d="M 51.5,335.5 L 379.5,147.5"
              fill="BG2"
              id="path2900" />
            <path
              d="M 215.5,53.5 L 215.5,429.5"
              fill="BG2"
              id="path2902" />
            <path
              d="M 51.5,335.5 L 215.5,147.5 L 297.5,288.5 L 51.5,335.5 z "
              fill="BG2"
              id="path2904" />
            <path
              d="M 379.5,335.5 L 215.5,147.5 L 133.5,288.5 L 379.5,335.5 z "
              fill="BG2"
              id="path2906" />
            <path
              d="M 379.5,147.5 L 133.5,194.5 L 215.5,335.5 L 379.5,147.5 z "
              fill="BG2"
              id="path2908" />
            <path
              d="M 51.5,147.5 L 215.5,335.5 L 297.5,194.5 L 51.5,147.5 z "
              fill="BG2"
              id="path2910" />
          </g>
        </g>

      </svg>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});



export default Logo;
