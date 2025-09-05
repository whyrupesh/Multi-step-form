// lib/db.ts
import fs from "fs";
import path from "path";

const DB_FILE = path.join(process.cwd(), "database.json");

export function readDB(): any[] {
  if (!fs.existsSync(DB_FILE)) return [];
  const raw = fs.readFileSync(DB_FILE, "utf-8");
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function writeDB(data: any[]) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}
