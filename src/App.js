// Core Lib Imports
import useComputedState from 'use-computed-state'
import { decode } from 'light-bolt11-decoder'
import React, { useState } from 'react'
import { Buffer } from 'buffer'

// Local Imports
import { InputDescription } from './components/input-description'
import { PaymentRequest } from './components/payment-request'
import { MainContainer } from './components/main-container'
import { InfoWrapper } from './components/info-wrapper'
import { HoverText } from './components/hover-text'
import { Resources } from './components/resources'
import { Textarea } from './components/textarea'
import { Section } from './components/section'
import { Footer } from './components/footer'
import { Intro } from './components/intro'
import { Title } from './components/title'
import { Info } from './components/info'
import { Row } from './components/row'
import { Tag } from './components/tag'
import {
  InfoSectionData,
  InfoSectionTitle,
  InfoSectionTitleWrapper,
} from './components/section-title'

function App() {
  const [pr, setPR] = useState(
    'lnbc15u1p3xnhl2pp5jptserfk3zk4qy42tlucycrfwxhydvlemu9pqr93tuzlv9cc7g3sdqsvfhkcap3xyhx7un8cqzpgxqzjcsp5f8c52y2stc300gl6s4xswtjpc37hrnnr3c9wvtgjfuvqmpm35evq9qyyssqy4lgd8tj637qcjp05rdpxxykjenthxftej7a2zzmwrmrl70fyj9hvj0rewhzj7jfyuwkwcg9g2jpwtk3wkjtwnkdks84hsnu8xps5vsq4gj5hs'
    // 'lnbc120n1p39wfrtpp5n24pj26fpl0p9dsyxx47ttklcazd7z87pkmru4geca6n6kz4409qdpzve5kzar2v9nr5gpqw3hjqsrvde68scn0wssp5mqr9mkd94jm5z65x94msas8hqhcuc96tqtre3wqkrm305tcvzgmqxqy9gcqcqzys9qrsgqrzjqtx3k77yrrav9hye7zar2rtqlfkytl094dsp0ms5majzth6gt7ca6uhdkxl983uywgqqqqqqqqqq86qqjqrzjq0h9s36s2kpql0a99c6k4zfq7chcx9sjnsund8damcl96qvc4833tx69gvk26e6efsqqqqlgqqqqpjqqjqrzjqd98kxkpyw0l9tyy8r8q57k7zpy9zjmh6sez752wj6gcumqnj3yxzhdsmg6qq56utgqqqqqqqqqqqeqqjqxahrxthcc8syrjyklsg57mzsqauargyc748lf8s2dezw5x7aww0j5v4k5wz9p5x4ax840h4q0qmgucglkesgzvvc22wwmqc756ec02qp34yg8p'
  )

  const parsed = useComputedState(() => pr && decode(pr), [pr])
  const [fixedAt, fix] = useState(null)
  const [info, setInfo] = useState(null)

  return (
    <MainContainer>
      <Title />
      <Intro />

      <InputDescription>
        Anatomy of a Lightning invoice:
      </InputDescription>
      <Textarea value={pr} onChange={ev => setPR(ev.target.value)} />
      {parsed && (
        <Row>
          <PaymentRequest isFixed={!!fixedAt}>
            {parsed.sections.map(section => (
              <Section
                key={section.letters}
                name={section.name}
                onMouseEnter={() => fixedAt === null ? setInfo(section) : null }
                onMouseLeave={() => fixedAt === null ? setInfo(null) : null }
                onClick={() => {
                  if (fixedAt === section) {
                    fix(null)
                  } else {
                    fix(section)
                    setInfo(section)
                  }
                }}
                isAnyFixed={!!fixedAt}
                isFixed={fixedAt === section}
              >
                {section.tag ? (
                  <>
                    <Tag>{section.tag}</Tag>
                    {section.letters.slice(1)}
                  </>
                ) : (
                  section.letters
                )}
              </Section>
            ))}
          </PaymentRequest>
          <InfoWrapper name={info ? info.name : null}>
            {info ? (
              <Info>
                <InfoSectionTitleWrapper>
                  <InfoSectionTitle>Section:</InfoSectionTitle>
                  <InfoSectionData>{info.name}</InfoSectionData>
                </InfoSectionTitleWrapper>
                {info.tag && (
                  <InfoSectionTitleWrapper>
                    <InfoSectionTitle>Tag:</InfoSectionTitle>
                    <InfoSectionData>{info.tag}</InfoSectionData>
                  </InfoSectionTitleWrapper>
                )}
                {info.value && (
                  <InfoSectionTitleWrapper>
                    <InfoSectionTitle>Data:</InfoSectionTitle>
                    <InfoSectionData>{Buffer.isBuffer(info.value) ? info.value.toString('hex') : JSON.stringify(info.value, null, 4)}</InfoSectionData>
                  </InfoSectionTitleWrapper>
                )}
              </Info>
            ) : (
              <HoverText>
                Hover over a highlighted section above to see more information.
              </HoverText>
            )}
          </InfoWrapper>
          <Resources />
        </Row>
      )}
      <Footer />
    </MainContainer>
  )
}

export default App
