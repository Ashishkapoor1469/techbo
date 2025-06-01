import {
  Html,
  Head,
  Row,
  Font,
  Preview,
  Heading,
  Section,
  Text,
  Button,
} from "@react-email/components";

interface VerificationEmailProps {
  username: string;
  otp: string;
}
export default function VerificationEmail({
  username,
  otp,
}: VerificationEmailProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <title>Verification Code</title>
        <Font
          fontFamily="Roboto"
          fallbackFontFamily="Verdana"
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Verify your email address</Preview>
      <Section style={{ padding: "20px", backgroundColor: "#f4f4f4" }}>
        <Row>
          <Heading style={{ textAlign: "center", color: "#333" }}>
            Email Verification
          </Heading>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Text style={{ fontSize: "16px", color: "#555" }}>
            Hi {username},<br />
            Thank you for registering with us! Please use the following OTP to
            verify your email address:
          </Text>
        </Row>
        <Row style={{ marginTop: "20px", textAlign: "center" }}>
          <Text
            style={{ fontSize: "24px", fontWeight: "bold", color: "#007bff" }}
          >
            {otp}
          </Text>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Button
            href="#"
            style={{
              backgroundColor: "#007bff",
              color: "#ffffff",
              padding: "10px 20px",
              textDecoration: "none",
              borderRadius: "5px",
              display: "inline-block",
            }}
          >
            Verify Email
          </Button>
        </Row>
      </Section>
    </Html>
  );
}
