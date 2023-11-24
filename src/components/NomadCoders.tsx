import styled from "styled-components";

const NomadCoders = styled.footer`
  height: 5vh;
  display: flex;
  justify-content: center;
  align-items: center;

  span{
    margin-right: 3.5px;
    font-weight: 400;
    font-size: 12px;
    color: ${props=>props.theme.txt}
  }
  a{
    font-size: 14px;
    font-weight: 600;
    color: ${props=>props.theme.accent}
  }
`

function Footer(){
    return <NomadCoders>
        <span>Powered by</span>
        <a href="https://nomadcoders.co/">
            Nomad Coders
        </a>
    </NomadCoders>
}

export default Footer;