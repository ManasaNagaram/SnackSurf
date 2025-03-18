export async function handler(event) {
  const url = event.queryStringParameters.url;

  if (!url) {
    return { statusCode: 400, body: "Missing 'url' query parameter" };
  }

  try {
    const response = await fetch(url);
    const data = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",  // Fixes CORS
        "Content-Type": "application/json",
      },
      body: data,
    };
  } catch (error) {
    return { statusCode: 500, body: "Error fetching data" };
  }
}
