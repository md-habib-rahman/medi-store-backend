import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from "./prisma";
import nodemailer from 'nodemailer'
import { jwt } from "better-auth/plugins";

const transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false, // Use true for port 465, false for port 587
	auth: {
		user: process.env.APP_USER,
		pass: process.env.APP_PASS,
	},
});

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql", // or "mysql", "postgresql", ...etc
	}),
	plugins: [
		jwt({
			jwt: {
				expirationTime: "7d", // Set your preferred expiry
			}
		})
	],

	trustedOrigins: [process.env.APP_URL!],
	user: {
		additionalFields: {
			role: {
				type: "string",
				defaultValue: "CUSTOMER",
				required: false
			},
			status: {
				type: 'string',
				defaultValue: "ACTIVE",
				required: false
			}
		}
	},
	emailAndPassword: {
		enabled: true,
		autoSignIn: false,
		requireEmailVerification: true
	},

	emailVerification: {
		sendOnSignUp: true,
		autoSignInAfterVerification: true,
		sendVerificationEmail: async ({ user, url, token }, request) => {
			try {
				const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`
				const info = await transporter.sendMail({
					from: '"Medi Store" <noreply@medistore.com>',
					to: user.email,
					subject: "Email Verifacation - Medi Store",

					html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Verify Your Email - Medi Store</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px;">
    <tr>
      <td align="center">
        
        <!-- Main Container -->
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#ffffff; border-radius:8px; overflow:hidden; box-shadow:0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background-color:#2e7d32; padding:20px; text-align:center;">
              <h1 style="color:#ffffff; margin:0; font-size:24px;">Medi Store</h1>
              <p style="color:#e8f5e9; margin:5px 0 0;">Your trusted healthcare partner</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:30px;">
              <h2 style="color:#333333; margin-top:0;">Verify Your Email Address</h2>
              
              <p style="color:#555555; font-size:15px; line-height:1.6;">
                Thank you for signing up with <strong>Medi Store</strong>.
                To complete your registration and keep your account secure, please verify your email address.
              </p>

              <!-- Button -->
              <div style="text-align:center; margin:30px 0;">
                <a href= ${verificationUrl}
                   style="background-color:#2e7d32; color:#ffffff; text-decoration:none; padding:14px 28px; border-radius:6px; font-size:16px; display:inline-block;">
                  Verify Email
                </a>
              </div>

              <p style="color:#555555; font-size:14px; line-height:1.6;">
                If the button above doesn’t work, copy and paste the link below into your browser:
              </p>

              <p style="word-break:break-all; font-size:13px; color:#2e7d32;">
                ${verificationUrl}
              </p>

              <p style="color:#777777; font-size:13px; line-height:1.6;">
                This link will expire in <strong>24 hours</strong> for security reasons.
              </p>

              <p style="color:#777777; font-size:13px; line-height:1.6;">
                If you didn’t create an account with Medi Store, you can safely ignore this email.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f1f1f1; padding:20px; text-align:center;">
              <p style="margin:0; font-size:12px; color:#888888;">
                © 2026 Medi Store. All rights reserved.
              </p>
              <p style="margin:5px 0 0; font-size:12px; color:#888888;">
                Need help? Contact our support team anytime.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`
				});

			} catch (err) {
				console.error(err)
			}
		},
	},
});