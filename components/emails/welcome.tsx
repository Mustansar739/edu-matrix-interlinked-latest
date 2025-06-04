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

interface WelcomeTemplateProps {
  name: string
}

export const WelcomeTemplate = ({
  name,
}: WelcomeTemplateProps) => (
  <Html>
    <Head />    <Preview>Welcome to Edu Matrix Interlinked - Let's get started!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={box}>
          <Heading style={h1}>🎉 Welcome to Edu Matrix Interlinked!</Heading>
          
          <Text style={text}>
            Hi {name},
          </Text>            <Text style={text}>
            Congratulations! Your Edu Matrix Interlinked account has been successfully verified. 
            We're excited to have you join our educational community.
          </Text>
          
          <Text style={text}>
            Here's what you can do next:
          </Text>
          
          <Text style={list}>
            • Complete your profile to get personalized recommendations
            • Explore courses and educational content
            • Connect with other professionals in your field
            • Join community discussions and forums
            • Access all available features and resources
          </Text>
          
          <Button style={button} href={`${process.env.NEXTAUTH_URL}/dashboard`}>
            Get Started
          </Button>
          
          <Hr style={hr} />
            <Text style={footer}>
            Need help getting started? Check out our help center or contact our support team. 
            We're here to help you make the most of your Edu Matrix Interlinked experience.
          </Text>
          
          <Text style={footer}>
            Welcome aboard!<br />
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

const list = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
  paddingLeft: '20px',
}

const button = {
  backgroundColor: '#22c55e',
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
