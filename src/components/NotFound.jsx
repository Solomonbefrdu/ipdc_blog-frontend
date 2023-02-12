import styled from "styled-components"

const NotFound = () => {
  return (
    <Container>
        <span>404 page</span>
        <span>You're kinda lost</span>
        <span>Maybe you should go back</span>
    </Container>
  )
}

const Container = styled.div`
    height: 90vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    span{
        color: #155853;
        font-size: 24px;
        font-weight: 500;

        &:first-child{
            font-size: 45px;
            font-weight: bold;
        }
    }
`;

export default NotFound