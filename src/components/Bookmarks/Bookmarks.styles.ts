import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Badge from 'src/components/Badge/Badge';

export const BookmarkListItem = styled.div`
  padding: 10px;
  box-shadow: 
    rgb(0 0 0 / 20%) 0 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px,
    rgb(0 0 0 / 12%) 0px 1px 3px 0px;
  
  &:hover {
    cursor: pointer;
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: baseline;
`;

export const Url = styled.h1`
  font-size: 16px;
  font-weight: bold;
  
  &:not(:first-child) {
    margin-right: 10px;
  }
`;

export const Keyword = styled(Badge)`
  margin-left: 10px;
`;

export const Metadata = styled.p`
  margin-top: 0;
  font-size: 12px;
`;

export const Toolbar = styled.div`
  > :not(:first-child) {
    margin-left: 10px;
  }
`;

const BaseButtonCSS = css`
  border: none;
  color: white;
  border-radius: 2px;
  padding: 5px 10px;
  font-size: 12px;
  
  &:hover {
    cursor: pointer;
  }
`;

export const ModifyButton = styled(Link)`
  ${BaseButtonCSS};
  background-color: #2196f3;
`;

export const DeleteButton = styled.button`
  ${BaseButtonCSS};
  background-color: #f44336;
`;

export const Container = styled.div`
  ${BookmarkListItem} + ${BookmarkListItem} {
    margin-top: 10px;
  }
`;
