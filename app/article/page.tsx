import Image from "next/image";
import Link from "next/link";

async function getArticle() {
  const apiUrl =
    "https://jpimediaapimanager.azure-api.net/editorial/ArticlesUAT/list?subscription-key=3cd0423d1b3b4785995c84d491c85937&id=flow:4975849";

  try {
    const res = await fetch(apiUrl, { cache: "no-store" }); // Prevent caching to always fetch fresh data
    if (!res.ok) throw new Error("Failed to fetch article data");

    const data = await res.json();

    // Extract required fields
    const article = data.articles?.[0]; // Assuming the API returns an array

    if (!article) throw new Error("No article found in API response");

    return {
      headline: article.headline || "No headline available",
      lead: article.lead || "No lead available",
      body: article.body || "No body content available",
      image: article.images?.[0]?.url || null, // Get first image URL
      caption: article.images?.[0]?.caption || "No caption available",
    };
  } catch (error) {
    console.error("Error fetching article:", error);
    return null; // Return null to handle errors gracefully
  }
}

export default async function Article() {
  const article = await getArticle();

  if (!article) {
    return (
      <div className="text-center p-6 text-red-500">
        <h2 className="text-xl font-bold">Error Loading Article</h2>
        <p>There was an issue fetching the article. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md font-[family-name:var(--font-geist-mono)]">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.headline}</h1>
      <p className="text-lg text-gray-700 mb-6">{article.lead}</p>


      {article.image && (
        <div className="mb-6">
          <Image
            src={article.image}
            alt={article.caption}
            width={800}
            height={450}
            className="rounded-lg shadow-md"
            priority
          />
          <p className="text-sm text-gray-500 mt-2 italic">{article.caption}</p>
        </div>
      )}

      <div className="prose lg:prose-lg text-gray-800 font-[family-name:var(--font-geist-mono)]">
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
      </div>
      <p className="mb-6">
        <Link href="/">back</Link>
      </p>
    </div>
  );
}