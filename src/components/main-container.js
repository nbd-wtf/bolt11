import styled from 'styled-components'

export const InnerWrapper = styled.div`
    display: flex;
    background: #151623;
    flex-direction: column;
    border-radius: 8px;
    padding: 40px 30px;
    max-width: 1000px;
`

export const Container = styled.div`
    padding: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

export const MainContainer = ({children}) => (
    <Container>
        <InnerWrapper>
            {children}
        </InnerWrapper>
    </Container>
)
