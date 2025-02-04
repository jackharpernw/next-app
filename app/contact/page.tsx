import fs from "fs";
import path from "path";

export default async function Contact() {
  // Load JSON file dynamically
  const filePath = path.join(process.cwd(), "data", "content.json");
  const jsonData = await fs.promises.readFile(filePath, "utf-8");
  const content = JSON.parse(jsonData);

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <h2>Contact Info</h2>
      <p>Email: {content.contact.email}</p>
      <p>Phone: {content.contact.phone}</p>
    </div>
  );
}