export const activationTemplate = (activationLink, FIRST_NAME) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Activate Your Email</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f3f4f6;
      font-family: Arial, Helvetica, sans-serif;
    }

    .container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    }

    .header {
      background-color: #2563eb;
      color: #ffffff;
      padding: 24px;
      text-align: center;
    }

    .header h1 {
      margin: 0;
      font-size: 24px;
    }

    .content {
      padding: 32px;
      color: #374151;
      line-height: 1.6;
    }

    .content h2 {
      margin-top: 0;
      color: #111827;
    }

    .button-wrapper {
      text-align: center;
      margin: 32px 0;
    }

    .btn {
      display: inline-block;
      background-color: #2563eb;
      color: #ffffff !important;
      text-decoration: none;
      padding: 14px 28px;
      border-radius: 6px;
      font-size: 16px;
      font-weight: bold;
    }

    .btn:hover {
      background-color: #1e40af;
    }

    .footer {
      padding: 20px;
      font-size: 14px;
      text-align: center;
      color: #6b7280;
      background-color: #f9fafb;
    }

    .link {
      word-break: break-all;
      color: #2563eb;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Email Verification</h1>
    </div>

    <div class="content">
      <h2>Hello ${FIRST_NAME},</h2>
      <p>
        Thank you for signing up! Please confirm your email address by clicking
        the button below.
      </p>

      <div class="button-wrapper">
        <a href=${activationLink} class="btn">Activate Email</a>
      </div>

      <p>
        If the button doesn’t work, copy and paste this link into your browser:
      </p>

      <p class="link">
        ${activationLink}
      </p>

      <p>
        If you didn’t create this account, you can safely ignore this email.
      </p>
    </div>

    <div class="footer">
      © 2026 Sara7a App. All rights reserved.
    </div>
  </div>
</body>
</html>
`;
};
