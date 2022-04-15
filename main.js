import {decode} from 'light-bolt11-decoder'
import React, {useState} from 'react'
import {render} from 'react-dom'
import useComputedState from 'use-computed-state'
import styled, {css} from 'styled-components'

const TAGCOLORS = {
  lightning_network: 'rgb(31, 31, 40)',
  coin_network: 'rgb(27, 51, 93)',
  amount: 'rgb(0, 110, 98)',
  separator: 'rgb(31, 31, 40)',
  timestamp: 'rgb(181, 10, 11)',
  payment_hash: 'rgb(71, 105, 169)',
  description: 'rgb(41, 131, 11)',
  description_hash: 'rgb(41, 131, 11)',
  payment_secret: 'rgb(92, 25, 75)',
  expiry: 'rgb(181, 10, 11)',
  metadata: 'rgb(86, 25, 24)',
  feature_bits: 'rgb(57, 118, 179)',
  payee: 'rgb(51, 44, 138)',
  unknown_tag: 'rgb(37, 15, 45)',
  min_final_cltv_expiry: 'rgb(119, 34, 32)',
  fallback_address: 'rgb(27, 51, 93)',
  route_hint: 'rgb(131, 93, 233)',
  signature: 'rgb(51, 44, 138)',
  checksum: 'rgb(31, 31, 40)'
}

function getTagColor(name) {
  return TAGCOLORS[name] || 'rgb(0, 0, 0)'
}

const Textarea = styled.textarea`
  margin: 18px;
  width: 90%;
  height: 80px;
`

const Row = styled.div``

const PaymentRequest = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
`

const Section = styled.span`
  font-family: monospace;
  font-size: 25px;

  ${props =>
    css`
      background-color: ${getTagColor(props.name)
        .replace('rgb', 'rgba')
        .replace(')', ', 0.2)')};
    `}

  &:hover {
    color: white;

    ${props =>
      css`
        background-color: ${getTagColor(props.name)};
      `}
  }
`

const Tag = styled.span`
  font-weight: bold;
`

const Info = styled.div`
  margin: 8px;
  padding: 8px;
  color: white;

  ${props =>
    css`
      background-color: ${getTagColor(props.name)};
    `}
`

function Main() {
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

render(<Main />, document.getElementById('main'))
