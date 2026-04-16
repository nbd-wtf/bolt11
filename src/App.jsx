import React, { useEffect, useMemo, useState } from 'react'

import { InputDescription } from './components/input-description'
import { PaymentRequest } from './components/payment-request'
import { MainContainer } from './components/main-container'
import { InfoWrapper } from './components/info-wrapper'
import { HoverText } from './components/hover-text'
import { Resources } from './components/resources'
import { Textarea } from './components/textarea'
import { Section } from './components/section'
import { Footer } from './components/footer'
import { Title } from './components/title'
import { Info } from './components/info'
import { Row } from './components/row'
import { Tag } from './components/tag'
import {
  InfoSectionData,
  InfoSectionTitle,
  InfoSectionTitleWrapper,
} from './components/section-title'
import {
  fetchLnurlJson,
  formatDisplayValue,
  interpretInput,
  toInfoEntries,
} from './utils/invoice-input'

const DEFAULT_INPUT =
  'lnbc15u1p3xnhl2pp5jptserfk3zk4qy42tlucycrfwxhydvlemu9pqr93tuzlv9cc7g3sdqsvfhkcap3xyhx7un8cqzpgxqzjcsp5f8c52y2stc300gl6s4xswtjpc37hrnnr3c9wvtgjfuvqmpm35evq9qyyssqy4lgd8tj637qcjp05rdpxxykjenthxftej7a2zzmwrmrl70fyj9hvj0rewhzj7jfyuwkwcg9g2jpwtk3wkjtwnkdks84hsnu8xps5vsq4gj5hs'

function renderInfoRows(entries) {
  return entries
    .filter(entry => entry.value)
    .map(entry => (
      <InfoSectionTitleWrapper key={entry.label}>
        <InfoSectionTitle>{entry.label}:</InfoSectionTitle>
        <InfoSectionData>{entry.value}</InfoSectionData>
      </InfoSectionTitleWrapper>
    ))
}

function App() {
  const [input, setInput] = useState(DEFAULT_INPUT)
  const [fixedAt, setFixedAt] = useState(null)
  const [info, setInfo] = useState(null)
  const [resolution, setResolution] = useState({
    status: 'idle',
    data: null,
    error: null,
    inputType: null,
    targetUrl: null,
  })

  const interpreted = useMemo(() => interpretInput(input), [input])
  const parsed = interpreted.type === 'bolt11' ? interpreted.parsed : null

  useEffect(() => {
    setFixedAt(null)
    setInfo(null)

    let cancelled = false

    if (interpreted.type !== 'resolve') {
      setResolution({
        status: 'idle',
        data: null,
        error: null,
        inputType: null,
        targetUrl: null,
      })
      return () => {
        cancelled = true
      }
    }

    setResolution({
      status: 'loading',
      data: null,
      error: null,
      inputType: interpreted.inputType,
      targetUrl: interpreted.targetUrl,
    })

    fetchLnurlJson(interpreted.targetUrl)
      .then(data => {
        if (cancelled) {
          return
        }

        setResolution({
          status: 'success',
          data,
          error: null,
          inputType: interpreted.inputType,
          targetUrl: interpreted.targetUrl,
        })
      })
      .catch(error => {
        if (cancelled) {
          return
        }

        setResolution({
          status: 'error',
          data: null,
          error: error.message,
          inputType: interpreted.inputType,
          targetUrl: interpreted.targetUrl,
        })
      })

    return () => {
      cancelled = true
    }
  }, [interpreted])

  const resolvedEntries = useMemo(() => {
    if (resolution.status !== 'success') {
      return []
    }

    return toInfoEntries(resolution.data, [
      { label: 'resolution type', value: resolution.inputType },
      { label: 'target', value: resolution.targetUrl },
    ])
  }, [resolution])

  const resolutionErrorEntries = useMemo(() => {
    if (resolution.status !== 'error') {
      return []
    }

    return [
      { label: 'resolution type', value: resolution.inputType },
      { label: 'target', value: resolution.targetUrl },
      { label: 'error', value: resolution.error },
    ]
  }, [resolution])

  return (
    <MainContainer>
      <Title />
      <InputDescription>
        Enter a BOLT11 invoice, Lightning Address, or LNURL below:
      </InputDescription>
      <Textarea
        aria-label="Invoice, Lightning Address, or LNURL"
        value={input}
        onChange={event => setInput(event.target.value)}
      />

      {parsed && (
        <Row>
          <PaymentRequest isFixed={!!fixedAt}>
            {parsed.sections.map(section => (
              <Section
                key={`${section.name}-${section.letters}`}
                name={section.name}
                onMouseEnter={() => (fixedAt === null ? setInfo(section) : null)}
                onMouseLeave={() => (fixedAt === null ? setInfo(null) : null)}
                onClick={() => {
                  if (fixedAt === section) {
                    setFixedAt(null)
                  } else {
                    setFixedAt(section)
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
                    <InfoSectionData>{formatDisplayValue(info.value)}</InfoSectionData>
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

      {interpreted.type === 'resolve' && (
        <Row>
          <PaymentRequest>{interpreted.normalized}</PaymentRequest>
          <InfoWrapper name={resolution.status === 'success' ? 'fallback_address' : null}>
            {resolution.status === 'loading' ? (
              <HoverText>Resolving payment metadata…</HoverText>
            ) : resolution.status === 'error' ? (
              <Info>{renderInfoRows(resolutionErrorEntries)}</Info>
            ) : (
              <Info>{renderInfoRows(resolvedEntries)}</Info>
            )}
          </InfoWrapper>
          <Resources />
        </Row>
      )}

      {interpreted.type === 'invalid' && (
        <Row>
          <InfoWrapper>
            <Info>
              <InfoSectionTitleWrapper>
                <InfoSectionTitle>Error:</InfoSectionTitle>
                <InfoSectionData>{interpreted.error}</InfoSectionData>
              </InfoSectionTitleWrapper>
            </Info>
          </InfoWrapper>
        </Row>
      )}

      <Footer />
    </MainContainer>
  )
}

export default App
