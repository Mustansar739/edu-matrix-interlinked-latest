import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Button,
  Hr,
} from '@react-email/components'
import * as React from 'react'

interface PasswordResetTemplateProps {
  name: string
  resetUrl: string
}

export const PasswordResetTemplate = ({
  name,
  resetUrl,
}: PasswordResetTemplateProps) => (
  <Html>
    <Head />    <Preview>Reset your Edu Matrix Interlinked password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Heading style={h1}>🔐 Password Reset Request</Heading>
          
          <Text style={text}>
            Hi {name},
          </Text>
          
          <Text style={text}>
            We received a request to reset the password for your Edu Matrix Interlinked account. 
            If you made this request, click the button below to reset your password.
          </Text>
          
          <Button style={button} href={resetUrl}>
            Reset Password
          </Button>
          
          <Text style={text}>
            If the button doesn't work, you can copy and paste this link into your browser:
          </Text>
          
          <Text style={link}>
            {resetUrl}
          </Text>
          
          <Hr style={hr} />
          
          <Text style={footer}>
            This password reset link will expire in 1 hour for security reasons. 
            If you didn't request this password reset, you can safely ignore this email.
          </Text>
          
          <Text style={footer}>
            For security, this link can only be used once. If you need to reset your password again, 
            please visit our forgot password page.
          </Text>
            <Text style={footer}>
            Best regards,<br />
            The Edu Matrix Interlinked Team
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
}

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
}

const box = {
  padding: '0 48px',
}

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
}

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
}

const button = {
  backgroundColor: '#dc2626',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 20px',
  margin: '32px 0',
}

const link = {
  color: '#dc2626',
  fontSize: '14px',
  textDecoration: 'underline',
  wordBreak: 'break-all' as const,
}

const hr = {
  borderColor: '#e6ebf1',
  margin: '32px 0',
}

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '16px 0',
}
