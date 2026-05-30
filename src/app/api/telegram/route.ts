import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {

    const body = await request.json();

    const token =
      process.env.TELEGRAM_BOT_TOKEN;

    const chatId =
      process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      throw new Error(
        "Missing Telegram configuration"
      );
    }

    const message = `
🔔 NEW LEAD

━━━━━━━━━━

👤 ${body.name}

📞 ${body.phone}

📧 ${body.email}

📦 ${body.productName || "General Enquiry"}

🏠 ${body.projectType || "-"}


━━━━━━━━━━

${body.message || "No message"}

`;

    const response = await fetch(
      `https://api.telegram.org/bot${token}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json"
        },
        body: JSON.stringify({
          chat_id: chatId,
          text: message
        })
      }
    );

    const result =
      await response.json();

    console.log(
      "Telegram response:",
      result
    );

    return NextResponse.json({
      success: true
    });

  } catch (error) {

    console.error(error);

    return NextResponse.json(
      {
        success: false
      },
      {
        status: 500
      }
    );

  }
}