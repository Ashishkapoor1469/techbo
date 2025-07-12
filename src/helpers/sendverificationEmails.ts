import { resend } from "@/lib/resend";
import VerificationEmail from "@/templates/VerificationEmail";
import { ApiResponse } from "@/types/ApiRespones";
export async function sendVerificationEmail(
    email:string,
    username:string,
    verfiycode:string
):Promise<ApiResponse>{
try {
    await resend.emails.send({
        from: "onboarding@resend.dev",
        to: email,
        subject: "Email Verification",
        react: VerificationEmail({
             username,
            otp: verfiycode
        }),
    })
    return {success: true, message: "Verification email sent successfully."};

} catch (emailError) {
    console.error("Error sending verification email:", emailError);
    return{success: false, message: "Failed to send verification email."};
}
}