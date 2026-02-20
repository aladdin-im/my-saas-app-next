import { siteConfig } from "@/config/index"
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
} from "@react-email/components"

interface OtpEmailProps {
    otp: string
    expiresInMinutes?: number
}

export default function OtpEmail({ otp, expiresInMinutes = 5 }: OtpEmailProps) {
    return (
        <Html>
            <Head />
            <Preview>Sign in to My SaaS App</Preview>
            <Body style={body}>
                <Container style={container}>
                    <Link href={siteConfig.url} style={logoLink}>
                        <Img src={`${siteConfig.url}/logo.svg`} width="28" height="28" alt={siteConfig.name} style={logoImg} />
                        <span>{siteConfig.name}</span>
                    </Link>
                    <Heading style={heading}>Your sign-in code</Heading>
                    <Text style={description}>
                        Enter the following code to continue. This code will expire in {expiresInMinutes} minutes.
                    </Text>
                    <Section style={codeContainer}>
                        <Text style={code}>{otp}</Text>
                    </Section>
                    <Text style={footer}>
                        If you didn&apos;t request this code, you can safely ignore this email.
                    </Text>
                </Container>
            </Body>
        </Html>
    )
}

const body: React.CSSProperties = {
    backgroundColor: "#f6f9fc",
    fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
}

const logoLink: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "14px",
    fontWeight: 600,
    color: "#1a1a1a",
    textDecoration: "none",
    marginBottom: "24px",
}

const logoImg: React.CSSProperties = {
    borderRadius: "4px",
}

const container: React.CSSProperties = {
    backgroundColor: "#ffffff",
    margin: "0 auto",
    padding: "40px 20px",
    maxWidth: "480px",
    borderRadius: "8px",
}

const heading: React.CSSProperties = {
    fontSize: "24px",
    fontWeight: "bold",
    textAlign: "center" as const,
    margin: "0 0 16px",
    color: "#1a1a1a",
}

const description: React.CSSProperties = {
    fontSize: "14px",
    lineHeight: "24px",
    color: "#666666",
    textAlign: "center" as const,
    margin: "0 0 24px",
}

const codeContainer: React.CSSProperties = {
    background: "#f4f4f5",
    borderRadius: "8px",
    padding: "16px",
    margin: "0 0 24px",
    textAlign: "center" as const,
}

const code: React.CSSProperties = {
    fontSize: "32px",
    fontWeight: "bold",
    letterSpacing: "6px",
    color: "#1a1a1a",
    margin: "0",
}

const footer: React.CSSProperties = {
    fontSize: "12px",
    lineHeight: "20px",
    color: "#999999",
    textAlign: "center" as const,
    margin: "0",
}
