import fs from "fs";
import path from "path";
import Link from "next/link";

export default async function Contact() {
  // Load JSON file dynamically
  const filePath = path.join(process.cwd(), "data", "content.json");
  const jsonData = await fs.promises.readFile(filePath, "utf-8");
  const content = JSON.parse(jsonData);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 text-gray-800 rounded-lg shadow-md font-[family-name:var(--font-geist-mono)]">
      <h1 className="text-2xl font-bold mb-4">{content.title}</h1>
      <p className="mb-6">{content.description}</p>
      <h2>Contact Info</h2>
      
      <p className="mb-6">Email: {content.contact.email}</p>
      
      <p className="mb-6">Phone: {content.contact.phone}</p>
      
      <p className="mb-6">
        <Link href="/">back</Link>
      </p>
    </div>
  );
}