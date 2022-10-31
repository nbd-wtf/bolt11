import styled from 'styled-components'

import { EXPLAINERS } from '../constants/explainers'

export const IntroWrapper = styled.div`
  margin: 50px 0 30px 0;
`

export const IntroTitle = styled.div`
  color: #fff;
  font-size: 26px;
  font-weight: 600;
`

export const IntroDescription = styled.div`
  color: #858692;
  font-size: 14px;
  font-weight: 400;
  padding-bottom: 8px;
  line-height: 1.5;
`

export const IntroInnerWrapper = styled.div`
  display: grid;
  margin-top: 40px;
  grid-row-gap: 50px;
  grid-column-gap: 20px;
  grid-template-rows: 1fr;
  grid-template-columns: repeat(3, 1fr);
`

export const ExplainerIssue = styled.div`
  color: #D2DAEA;
  padding-top: 6px;
  font-size: 14px;
`

export const ExplainerSolution = styled.div`
  background-color: #20475C;
  color: #fff;
  padding: 12px 10px;
  border-radius: 8px;
  margin-top: 8px;
  font-size: 14px;
`

export const ExplainerTitle = styled.div`
  color: #D2DAEA;
  font-size: 18px;
  font-weight: 600;
  padding-bottom: 4px;
`

export const Explainer = styled.div``

export const Intro = () => (
  <IntroWrapper>
    <IntroTitle>
      The BOLT11 invoice format is a revolution.
    </IntroTitle>
    <IntroDescription>It solves all the problems of the old and clumsy Bitcoin "address" that have always plagued Bitcoin adoption by users, companies and services.</IntroDescription>
    <IntroInnerWrapper>
      {EXPLAINERS.map((exp, i) => (
        <Explainer key={i}>
          <ExplainerTitle>{exp.title}</ExplainerTitle>
          <ExplainerIssue>{exp.issue}</ExplainerIssue>
          <ExplainerSolution>{exp.solution}</ExplainerSolution>
        </Explainer>
      ))}
    </IntroInnerWrapper>
  </IntroWrapper>
)
