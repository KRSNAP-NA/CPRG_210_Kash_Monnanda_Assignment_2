import { NextResponse } from "next/server";

export async function GET(request) {
  const city = request.nextUrl.searchParams.get("city")?.trim();

  if (!city || city.length < 2 || city.length > 100) {
    return NextResponse.json(
      { message: "Enter a city name to look up its weather." },
      { status: 400 }
    );
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  if (!apiKey) {
    console.error("OPENWEATHER_API_KEY is not configured.");
    return NextResponse.json(
      { message: "Weather lookup is not configured on the server." },
      { status: 503 }
    );
  }

  const url = new URL("https://api.openweathermap.org/data/2.5/weather");
  url.searchParams.set("q", city);
  url.searchParams.set("appid", apiKey);
  url.searchParams.set("units", "metric");

  try {
    const response = await fetch(url, { cache: "no-store" });
    const weather = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          message:
            response.status === 404
              ? "City not found. Check the spelling and try again."
              : "The weather service could not complete the request.",
        },
        { status: response.status === 404 ? 404 : 502 }
      );
    }

    return NextResponse.json({
      city: weather.name,
      temperature: Math.round(weather.main.temp),
      description: weather.weather?.[0]?.description ?? "Current conditions unavailable",
    });
  } catch (error) {
    console.error("Weather service request failed:", error);
    return NextResponse.json(
      { message: "Could not connect to the weather service. Please try again." },
      { status: 502 }
    );
  }
}
