import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { email, fullName } = await req.json();

    // Initialize the Admin client with the Secret Key
    const supabaseAdmin = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    // 1. Generate a random temporary password
    const tempPassword = Math.random().toString(36).slice(-10) + "A1!";

    // 2. Create the user in Supabase Auth


   
    // 3. LOG THE PASSWORD (In production, use Resend or Nodemailer to email this)
    console.log(`-----------------------------------`);
    console.log(`TEMP PASSWORD FOR ${email}: ${tempPassword}`);
    console.log(`-----------------------------------`);

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}