// Core Lib Imports
import useComputedState from 'use-computed-state'
import { decode } from 'light-bolt11-decoder'
import React, { useState } from 'react'

// Local Imports
import { PaymentRequest } from './components/payment-request'
import { Textarea } from './components/textarea'
import { Section } from './components/section'
import { Info } from './components/info'
import { Row } from './components/row'
import { Tag } from './components/tag'

function App() {
  const [pr, setPR] = useState(
    'lnbc120n1p39wfrtpp5n24pj26fpl0p9dsyxx47ttklcazd7z87pkmru4geca6n6kz4409qdpzve5kzar2v9nr5gpqw3hjqsrvde68scn0wssp5mqr9mkd94jm5z65x94msas8hqhcuc96tqtre3wqkrm305tcvzgmqxqy9gcqcqzys9qrsgqrzjqtx3k77yrrav9hye7zar2rtqlfkytl094dsp0ms5majzth6gt7ca6uhdkxl983uywgqqqqqqqqqq86qqjqrzjq0h9s36s2kpql0a99c6k4zfq7chcx9sjnsund8damcl96qvc4833tx69gvk26e6efsqqqqlgqqqqpjqqjqrzjqd98kxkpyw0l9tyy8r8q57k7zpy9zjmh6sez752wj6gcumqnj3yxzhdsmg6qq56utgqqqqqqqqqqqeqqjqxahrxthcc8syrjyklsg57mzsqauargyc748lf8s2dezw5x7aww0j5v4k5wz9p5x4ax840h4q0qmgucglkesgzvvc22wwmqc756ec02qp34yg8p'
  )
  const parsed = useComputedState(() => pr && decode(pr), [pr])
  const [info, setInfo] = useState(null)

  return (
    <>
      <Textarea value={pr} onChange={ev => setPR(ev.target.value)} />
      {parsed && (
        <Row>
          <PaymentRequest>
            {parsed.sections.map(section => (
              <Section
                key={section.letters}
                name={section.name}
                onMouseEnter={() => setInfo(section)}
                onMouseLeave={() => setInfo(null)}
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
          {info && (
            <Info name={info.name}>
              <div>{info.name}</div>
              {info.tag && <div>tag: {info.tag}</div>}
              {info.value && <div>value: {JSON.stringify(info.value)}</div>}
            </Info>
          )}
        </Row>
      )}
    </>
  )
}

export default App;
