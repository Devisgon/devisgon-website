// src/app/industries/page.js
import Link from "next/link";
import fs from "fs";
import path from "path";

export default function IndustriesPage() {
  // Correct path to your JSON folder inside src
  const dir = path.join(
    process.cwd(),
    "src/data/services/ai_and_saas_developments"
  );

  let files = [];
  try {
    files = fs.readdirSync(dir).filter((file) => file.endsWith(".json"));
  } catch (error) {
    console.error("Error reading industries folder:", error);
  }

  const links = files.map((file) => ({
    slug: file.replace(".json", ""),
  }));

  return (
    <div style={{ padding: "2rem" }}>
      <h1 className="text-black">All Industries</h1>
      <ul>
        {links.map((link) => (
          <li key={link.slug}>
            <Link href={`/services/saas/${link.slug}`} className="text-black">
              {link.slug.replace(/-/g, " ")}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
