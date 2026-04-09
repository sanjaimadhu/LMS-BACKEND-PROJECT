export function generateVerificationOtpEmailTemplate(otpCode) {
  // OTP எண்களை பிரித்து தனித்தனி பெட்டிகளில் காட்ட (e.g., 1 2 3 4)
  const otpArray = otpCode.toString().split("");
  const otpBoxes = otpArray.map(num => `
    <div style="display: inline-block; width: 50px; height: 60px; line-height: 60px; background: #222; color: #fff; font-size: 32px; font-weight: 900; border-radius: 12px; margin: 0 5px; border: 1px solid #444;">
      ${num}
    </div>
  `).join("");

  return `
<div style="background-color: #000; padding: 80px 20px; font-family: 'Inter', system-ui, sans-serif; text-align: center;">
    <div style="max-width: 500px; margin: auto;">
        
        <div style="margin-bottom: 40px;">
          <h2 style="color: #fff; font-size: 14px; font-weight: 700; letter-spacing: 5px; text-transform: uppercase; margin-bottom: 10px;">Security Portal</h2>
          <div style="height: 2px; width: 50px; background: #fff; margin: auto;"></div>
        </div>

        <h1 style="color: #fff; font-size: 36px; font-weight: 800; margin-bottom: 20px; letter-spacing: -1px;">Verify Identity</h1>
        
        <p style="color: #888; font-size: 17px; line-height: 1.6; margin-bottom: 40px;">
            Enter this unique code to securely access your <b>Bookworm</b> account.
        </p>

        <div style="margin-bottom: 40px;">
            ${otpBoxes}
        </div>

        <p style="color: #555; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 50px;">
            Expires in 15 Minutes • One-time use only
        </p>

        <div style="padding-top: 40px; border-top: 1px solid #222;">
            <p style="color: #fff; font-size: 16px; font-weight: 600; margin-bottom: 4px;">Bookworm Systems</p>
            <p style="color: #444; font-size: 11px;">Encrypted Automated Notification</p>
        </div>
    </div>
</div>
`;
}

export function generateForgotPasswordEmailTemplate(resetPasswordUrl) {
  return `
<div style="background-color: #000; padding: 80px 20px; font-family: 'Inter', system-ui, -apple-system, sans-serif; text-align: center; color: #fff;">
    <div style="max-width: 500px; margin: auto; border: 1px solid #222; padding: 50px 30px; border-radius: 30px; background: linear-gradient(145deg, #0a0a0a, #000);">
        
        <div style="margin-bottom: 40px;">
          <div style="display: inline-block; background: #111; padding: 15px; border-radius: 50%; border: 1px solid #333; margin-bottom: 20px;">
            <span style="font-size: 30px;">🔑</span>
          </div>
          <h2 style="color: #666; font-size: 13px; font-weight: 700; letter-spacing: 4px; text-transform: uppercase; margin: 0;">Account Recovery</h2>
        </div>

        <h1 style="color: #fff; font-size: 34px; font-weight: 800; margin-bottom: 20px; letter-spacing: -1px; line-height: 1.2;">Reset Your <br/>Password</h1>
        
        <p style="color: #888; font-size: 17px; line-height: 1.6; margin-bottom: 40px;">
            We received a request to access your account. Click the button below to establish a new secure password.
        </p>

        <div style="margin-bottom: 40px;">
            <a href="${resetPasswordUrl}" 
               style="display: inline-block; background-color: #fff; color: #000; font-size: 16px; font-weight: 800; text-decoration: none; padding: 22px 40px; border-radius: 16px; box-shadow: 0 10px 30px rgba(255,255,255,0.1);">
               SET NEW PASSWORD
            </a>
        </div>

        <div style="background: #111; border-radius: 12px; padding: 15px; border: 1px solid #222; margin-bottom: 40px;">
            <p style="color: #eb4444; font-size: 13px; font-weight: 600; margin: 0; letter-spacing: 0.5px;">
                ⚠️ THIS LINK EXPIRES IN 10 MINUTES
            </p>
        </div>

        <p style="color: #555; font-size: 13px; line-height: 1.5; margin-bottom: 40px;">
            If you didn't make this request, you can safely ignore this email. Your account remains protected.
        </p>

        <div style="padding-top: 35px; border-top: 1px solid #111;">
            <p style="color: #fff; font-size: 16px; font-weight: 700; margin-bottom: 5px;">BookRoom Security</p>
            <p style="color: #333; font-size: 11px; text-transform: uppercase; letter-spacing: 1px;">Automated Encryption System</p>
        </div>
    </div>
</div>
`;
}