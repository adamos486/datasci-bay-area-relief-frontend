import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import { colors } from "../../theme";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fafafa;
  min-height: 100vh;
`;

export const TopSection = styled.div`
  text-align: center;
  width: 708px;
  padding-top: 120px;
`;

export const TopSectionBody = styled(Typography).attrs({variant: "body1"})`
  color: ${colors.text};
  margin: 0px;
  padding: 0px;
`;

export const Section = styled.div`
  width: 714px;
  display: flex;
  text-align: center;
  margin-top: 44px;
`;

export const SectionHeader = styled(Typography).attrs({variant: "h4"})`
  display: flex;
  flex: 1 1 0;
  margin: 0px;
  width: 38%;
  text-align: left;
`;

export const DonationList = styled.ul`
  width: 62%;
  list-style: none;
  text-align: left;
  padding: 0px;
  margin: 0px;
`;

export const ListItem = styled.li`
  padding: 0px;
  margin: 0px;
  color: #ef5350;
`;