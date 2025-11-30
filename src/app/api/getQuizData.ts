const url = "https://lab.lfwd.be/dev-test/quiz_data.json";

export const getQuizData = async () => {
  try {
    console.log("Fetching quiz data from:", url);

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    console.log("Response status:", res.status);

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Quiz data fetched successfully:", data);

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("Error fetching quiz data:", error);

    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

// Alternative API route handler format for Next.js API routes
export async function GET() {
  const result = await getQuizData();

  if (!result.success) {
    return new Response(JSON.stringify({ error: result.error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(result.data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}

export default getQuizData;
