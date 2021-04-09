import styled from 'styled-components';

export const BookmarkListItem = styled.div`
  padding: 10px;
  box-shadow: 
    rgb(0 0 0 / 20%) 0 2px 1px -1px,
    rgb(0 0 0 / 14%) 0px 1px 1px 0px,
    rgb(0 0 0 / 12%) 0px 1px 3px 0px;
`;

export const Url = styled.h1`
  font-size: 16px;
  font-weight: bold;
`;

export const Metadata = styled.p`
  font-size: 12px;
`;

export const Toolbar = styled.div`
  > :not(:first-child) {
    margin-left: 10px;
  }
`;

const BaseButton = styled.button`
  border: none;
  color: white;
  border-radius: 2px;
  padding: 5px 10px;
  
  &:hover {
    cursor: pointer;
  }
`;

export const ModifyButton = styled(BaseButton)`
  background-color: #2196f3;
`;

export const DeleteButton = styled(BaseButton)`
  background-color: #f44336;
`;

export const Container = styled.div`
  ${BookmarkListItem} + ${BookmarkListItem} {
    margin-top: 10px;
  }
`;
