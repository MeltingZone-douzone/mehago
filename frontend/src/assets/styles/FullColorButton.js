import styled from 'styled-components';
import { colors } from './properties/Colors';

const FullColorButton = styled.button`
    color:#fff;
    padding:.4em;

    border:1px solid ${colors.mainThemeColor};
    border-radius:5px;
    background:${colors.mainThemeColor};
    justify-content:center;
`

export default FullColorButton;
