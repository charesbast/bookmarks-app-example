import React, { FunctionComponent } from 'react';

import { Container } from './Badge.styles';

interface Props {
  className?: string;
  dataTestId?: string;
  label: string;
}

const Badge: FunctionComponent<Props> = ({
  className,
  dataTestId,
  label,
  children,
}) => (
  <Container
    data-testid={dataTestId}
    className={className}
  >
    {label}
    {children}
  </Container>
);

export default Badge;
