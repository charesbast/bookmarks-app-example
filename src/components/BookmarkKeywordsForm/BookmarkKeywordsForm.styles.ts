import styled from 'styled-components';

import Badge from 'src/components/Badge/Badge';

export const Container = styled.div``;

export const PendingKeywords = styled.div`
  display: flex;
  margin-bottom: 20px;
  
  > :not(:first-child) {
    margin-left: 10px;
  }
`;

export const PendingKeyword = styled(Badge)`
  padding: 5px 10px;
  
  button {
    margin-left: 5px;
    background: none;
    border: none;
    font-size: 10px;
    font-weight: bold;
    color: white;
    
    &:hover {
      cursor: pointer;
    }
  }
`;
