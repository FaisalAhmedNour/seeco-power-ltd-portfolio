import { NextResponse } from "next/server";

/**
 * Handles POST requests to /api/contact.
 * Validates form input data and returns a structured response.
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { name, email, mobile, subject, message } = data;

    // Server-side validation
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    // Mock processing (e.g., save to DB or email API)
    console.log("Contact form submission received:", {
      name,
      email,
      mobile: mobile || "Not provided",
      subject,
      message,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json(
      { message: "Contact form submitted successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
