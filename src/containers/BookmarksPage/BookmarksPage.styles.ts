import Pagination from '@material-ui/lab/Pagination';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  margin: 20px;  
`;

export const StyledPagination = styled(Pagination)`
  margin-top: 20px;
`;

export const BookmarksContainer = styled.div`
  flex: 1;
  margin-right: 20px;
`;

export const SelectedBookmarkContainer = styled.div`
  width: 35%;
  max-width: 400px;
`;
