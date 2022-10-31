import styled from 'styled-components'

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

export const TitleText = styled.p`
  font-weight: 900;
  color: #D2DAEA;
  font-size: 50px;
  margin: 0;
  padding: 0;
`

export const DescriptionText = styled.p`
    margin: 0;
    padding: 0;
    margin-top: 10px;
    color: #A58AF9;
`

export const DescriptionWrapper = styled.div``

export const Title = () => (
    <TitleWrapper>
        <TitleText>The Lightning Invoice</TitleText>
        <DescriptionWrapper>
            <DescriptionText>
                Learn the inner workings of BOLT11, the Lightning Network invoice standard.
            </DescriptionText>
        </DescriptionWrapper>
    </TitleWrapper>
)
