import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';

interface TooltipProps {
  children: React.ReactNode;
  text: string;
  delay?: number;
  placement?: 'top' | 'bottom' | 'left' | 'right';
}

const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const TooltipText = styled.div<{
  visible: boolean;
  placement: 'top' | 'bottom' | 'left' | 'right';
}>`
  visibility: ${(props) => (props.visible ? 'visible' : 'hidden')};
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  position: absolute;
  z-index: 1;
  opacity: ${(props) => (props.visible ? '1' : '0')};
  transition: opacity 0.3s;
  font-size: 12px;
  white-space: nowrap;

  /* Placement styles */
  ${(props) => {
    switch (props.placement) {
      case 'top':
        return `
          bottom: 125%;
          left: 50%;
          margin-left: -60px; /* Half of width */

          &::after {
            content: " ";
            position: absolute;
            top: 100%; /* At the bottom of the tooltip */
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: black transparent transparent transparent;
          }
        `;
      case 'bottom':
        return `
          top: 125%;
          left: 50%;
          margin-left: -60px; /* Half of width */

          &::after {
            content: " ";
            position: absolute;
            bottom: 100%; /* At the top of the tooltip */
            left: 50%;
            margin-left: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent black transparent;
          }
        `;
      case 'left':
        return `
          right: 125%;
          top: 50%;
          margin-top: -10px; /* Half of height */

          &::after {
            content: " ";
            position: absolute;
            top: 50%;
            left: 100%; /* At the right edge of the tooltip */
            margin-top: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent transparent transparent black;
          }
        `;
      case 'right':
        return `
          left: 125%;
          top: 50%;
          margin-top: -10px; /* Half of height */

          &::after {
            content: " ";
            position: absolute;
            top: 50%;
            right: 100%; /* At the left edge of the tooltip */
            margin-top: -5px;
            border-width: 5px;
            border-style: solid;
            border-color: transparent black transparent transparent;
          }
        `;
      default:
        return '';
    }
  }}
`;

const Tooltip: React.FC<TooltipProps> = ({
  children,
  text,
  delay = 500,
  placement = 'top',
}) => {
  const [visible, setVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  const showTooltip = () => {
    const id = setTimeout(() => {
      setVisible(true);
    }, delay);
    setTimeoutId(id);
  };

  const hideTooltip = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <TooltipContainer
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      ref={tooltipRef}
    >
      {children}
      <TooltipText visible={visible} placement={placement}>
        {text}
      </TooltipText>
    </TooltipContainer>
  );
};

export default Tooltip;