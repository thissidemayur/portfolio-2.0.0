import {
  Html,
  Body,
  Container,
  Text,
  Heading,
  Hr,
  Section,
  Preview,
  Link,
  Img,
} from "@react-email/components";

interface ContactTemplateProps {
  name: string;
}

export const ContactTemplate = ({ name = "there" }: ContactTemplateProps) => (
  <Html>
    <Preview>Message received from your portfolio — Mayur Pal</Preview>
    <Body style={main}>
      <Container style={container}>
        {/* Branding Header */}
        <Section style={headerSection}>
          <Heading style={logoText}>M PAL</Heading>
        </Section>

        {/* Content Section */}
        <Section style={contentSection}>
          <Heading style={greeting}>Hello {name},</Heading>
          <Text style={paragraph}>
            Thank you for reaching out! I&apos;ve received your message through
            my portfolio and I&apos;m excited to connect with you.
          </Text>
          <Text style={paragraph}>
            I usually respond within 24 hours. In the meantime, feel free to
            check out my latest projects or my GitHub.
          </Text>

          <Section style={buttonContainer}>
            <Link href="https://thissidemayur.me" style={button}>
              Visit Portfolio
            </Link>
          </Section>

          <Hr style={hr} />

          <Text style={footer}>
            Best regards,
            <br />
            <strong>Mayur Pal</strong>
            <br />
            Full Stack Developer | CSE Student
          </Text>
        </Section>

        {/* Social Links Footer */}
        <Section style={bottomLinks}>
          <Link href="https://github.com/your-github" style={link}>
            GitHub
          </Link>
          {" • "}
          <Link href="https://linkedin.com/in/your-linkedin" style={link}>
            LinkedIn
          </Link>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default ContactTemplate;

// --- STYLING (The UX Layer) ---

const main = {
  backgroundColor: "#f4f4f7",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  width: "580px",
  maxWidth: "100%", // Ensures responsiveness on small screens
};

const headerSection = {
  padding: "32px",
  textAlign: "center" as const,
};

const logoText = {
  fontSize: "24px",
  fontWeight: "800",
  letterSpacing: "-0.5px",
  color: "#1a1a1a",
  margin: "0",
};

const contentSection = {
  backgroundColor: "#ffffff",
  padding: "40px",
  borderRadius: "12px",
  border: "1px solid #e6e6e6",
};

const greeting = {
  fontSize: "20px",
  fontWeight: "600",
  color: "#1a1a1a",
  lineHeight: "1.3",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#484848",
};

const buttonContainer = {
  textAlign: "center" as const,
  marginTop: "32px",
  marginBottom: "32px",
};

const button = {
  backgroundColor: "#000000",
  borderRadius: "6px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "600",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 24px",
};

const hr = {
  borderColor: "#e6e6e6",
  margin: "20px 0",
};

const footer = {
  fontSize: "14px",
  lineHeight: "24px",
  color: "#8898aa",
};

const bottomLinks = {
  textAlign: "center" as const,
  marginTop: "32px",
};

const link = {
  color: "#8898aa",
  textDecoration: "underline",
  fontSize: "12px",
};

