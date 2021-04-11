import Pagination from '@material-ui/lab/Pagination';
import styled from 'styled-components';

export const Container = styled.div`
  margin: 20px;  
`;

export const MainSection = styled.div`
  display: flex;
`;

export const StyledPagination = styled(Pagination)`
  margin-top: 20px;
`;

export const LeftPanel = styled.div`
  flex: 1;
  margin-right: 20px;
`;

export const RightPanel = styled.div`
  width: 35%;
  max-width: 400px;
`;
