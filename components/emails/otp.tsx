import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
  Row,
  Column,
} from '@react-email/components';

interface OTPTemplateProps {
  name: string;
  otp: string;
  purpose: string;
}

export const OTPTemplate = ({ name, otp, purpose }: OTPTemplateProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your verification code: {otp}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={logoContainer}>            <Img
              src="https://edumatrix.com/logo.png"
              width="150"
              height="50"
              alt="Edu Matrix Interlinked"
              style={logo}
            />
          </Section>
          
          <Heading style={heading}>Your Verification Code</Heading>
          
          <Text style={paragraph}>
            Hello {name},
          </Text>
          
          <Text style={paragraph}>
            You requested a verification code to {purpose}. Here is your 6-digit code:
          </Text>

          <Section style={otpContainer}>
            <Text style={otpCode}>{otp}</Text>
          </Section>

          <Text style={paragraph}>
            This code will expire in <strong>10 minutes</strong> for your security.
          </Text>

          <Text style={paragraph}>
            If you didn't request this code, please ignore this email or contact our support team if you have concerns.
          </Text>

          <Section style={footer}>
            <Row>
              <Column>                <Text style={footerText}>
                  Best regards,<br />
                  The Edu Matrix Interlinked Team
                </Text>
              </Column>
            </Row>
            <Row>
              <Column>
                <Text style={footerLink}>
                  <Link href="https://edumatrix.com/support" style={link}>
                    Need help? Contact Support
                  </Link>
                </Text>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const logoContainer = {
  margin: '0 auto',
  padding: '20px 0 20px',
  textAlign: 'center' as const,
};

const logo = {
  margin: '0 auto',
};

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '700',
  textAlign: 'center' as const,
  letterSpacing: '-1px',
  color: '#1e293b',
  margin: '0 0 30px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '26px',
  color: '#475569',
  margin: '0 30px 20px',
};

const otpContainer = {
  textAlign: 'center' as const,
  margin: '30px 0',
  padding: '20px',
  backgroundColor: '#f8fafc',
  border: '2px dashed #e2e8f0',
  borderRadius: '8px',
};

const otpCode = {
  fontSize: '36px',
  fontWeight: '800',
  letterSpacing: '8px',
  color: '#3b82f6',
  fontFamily: 'monospace',
  margin: '0',
  textAlign: 'center' as const,
};

const footer = {
  margin: '40px 30px 0',
  padding: '20px 0',
  borderTop: '1px solid #e2e8f0',
};

const footerText = {
  fontSize: '14px',
  lineHeight: '20px',
  color: '#64748b',
  margin: '0 0 10px',
};

const footerLink = {
  fontSize: '14px',
  color: '#64748b',
  margin: '0',
};

const link = {
  color: '#3b82f6',
  textDecoration: 'underline',
};
