'use client';

import React, { useState, useEffect } from 'react';
import useMediaQuery from '@mui/material/useMediaQuery';

const CssButtonOutline = ({
  title,
  onClick,
  backgroundColor,
  textColor,
  margin,
  fontSize,
  padding,
  fontFamily,
  disabled,
  width,
  height,
  border,
  props
}) => {
  const mobile = useMediaQuery('(max-width:600px)');

  const styles = {
    border: border,
    backgroundColor,
    color: textColor,
    padding,
    outlineWidth: '0',
    margin,
    fontSize: mobile ? '0.8rem' : fontSize,
    fontWeight: 'normal',
    fontFamily: fontFamily ?? 'Archivo',
    borderRadius: '5px',
    cursor: 'pointer',
    width: width ?? '500px',
    height: height ?? '50px',
    ...props
  };

  return (
    <button onClick={onClick} type="button" style={styles} disabled={disabled}>
      {title}
    </button>
  );
};

function CssButtonSolid({
  title,
  onClick,
  backgroundColor,
  textColor,
  margin,
  fontSize,
  padding,
  type,
  disabled,
  props,
  weight,
  height
}) {
  // Function to determine button width based on screen size
  const getButtonWidth = () => {
    if (typeof window !== 'undefined') {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 1000) return '80px';
      if (screenWidth <= 1450) return '160px';
      if (screenWidth <= 1800) return '200px';
    }
    return '200px'; // default width
  };

  const [buttonWidth, setButtonWidth] = useState(getButtonWidth);

  // Update button width on resize only after component mounts
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const handleResize = () => {
        setButtonWidth(getButtonWidth());
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const styles = {
    background: backgroundColor,
    color: textColor,
    width: buttonWidth,
    height: height ?? '50px',
    padding,
    fontSize: fontSize ?? '1rem',
    outlineWidth: '0',
    margin,
    fontWeight: weight ?? 'normal',
    borderRadius: '5px',
    border: 'none',
    cursor: 'pointer',
    ...props
  };

  return (
    <button
      onClick={onClick}
      type={type === 'submit' ? 'submit' : 'button'}
      style={styles}
      disabled={disabled}
    >
      {title}
    </button>
  );
}

export { CssButtonOutline, CssButtonSolid };
