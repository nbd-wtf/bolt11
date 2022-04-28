import QRCode from 'react-qr-code'
import styled from 'styled-components'

// import { media } from '../utils/media'

const DONATION_QR_CODE = 'lnurl1dp68gurn8ghj7ctsdyh85etzv4jx2efwd9hj7a3s9aex2ut4v4ehgttnw3shg6tr943ksctjvajhxteevy6rgd3jx9jz6vpkxc6j6dp5v43z6wfkv9nz6efsxc6nxdpnxyckyef4xl00sk'

const Wrapper = styled.div``

const InnerWrapper = styled.div`
  display: flex;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0 0 0;
`

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
`

const BottomInner = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

const BottomLogo = styled.div`
  font-size: 18px;
  color: #fff;
  font-weight: 800;
  letter-spacing: -0.75px;
`

const BottomMadeBy = styled.div`
  color: #fff;
  font-size: 11px;
  margin-top: 6px;
  font-weight: 400;
  text-align: right;
`

const BottomQR = styled.div`
  padding: 8px;
  background: #fff;
  border-radius: 7px;
  margin-bottom: 12px;
  border: 1px solid #ddd;
`


export const Footer = () => (
  <Wrapper>
    <InnerWrapper>
      <Bottom>
        <BottomInner>
          <BottomQR>
            <a href={`lightning:${DONATION_QR_CODE}`}>
              <QRCode
                size={100}
                value={DONATION_QR_CODE}
              />
            </a>
          </BottomQR>
          <BottomLogo>The Lightning Invoice</BottomLogo>
          <BottomMadeBy>Made with ♥ by Bitcoiners</BottomMadeBy>
        </BottomInner>
      </Bottom>
    </InnerWrapper>
  </Wrapper>
)
