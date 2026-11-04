import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { doctors } from "@/lib/data/doctors";

export const alt = "MED CLINIC — Shifokor";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const tints: Record<string, string> = {
  blue:     "linear-gradient(135deg, #D7E8FA 0%, #B5D4F2 100%)",
  mint:     "linear-gradient(135deg, #D7F0E3 0%, #B4E0C9 100%)",
  lavender: "linear-gradient(135deg, #E4DFF5 0%, #C9BFE8 100%)",
  pink:     "linear-gradient(135deg, #F5DFE8 0%, #ECC2D4 100%)",
};

async function readPhotoDataUrl(relPath: string): Promise<string | null> {
  try {
    const buffer = await readFile(join(process.cwd(), "public", relPath));
    const ext = relPath.split(".").pop()?.toLowerCase() ?? "webp";
    const mime = ext === "png" ? "image/png" : ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/webp";
    return `data:${mime};base64,${buffer.toString("base64")}`;
  } catch {
    return null;
  }
}

export default async function OGImage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const doc = doctors.find((d) => d.id === id);
  if (!doc) return new ImageResponse(<div>Not found</div>, size);

  const photoUrl = (await readPhotoDataUrl(doc.photo)) ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #F5F8FD 0%, #E3EEFF 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ flex: 1.3, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "60px 50px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 54, height: 54, borderRadius: 14, background: "linear-gradient(135deg, #1E6DD8, #0E3F8C)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 32, fontWeight: 900 }}>+</div>
            <div style={{ fontSize: 28, fontWeight: 800, color: "#0A1F3A", letterSpacing: "-0.01em", display: "flex" }}>
              MED <span style={{ color: "#1E6DD8", fontStyle: "italic", marginLeft: 8, fontWeight: 600 }}>CLINIC</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "flex", color: "#1E6DD8", fontSize: 18, fontWeight: 800, letterSpacing: "0.15em", textTransform: "uppercase" }}>
              {doc.specialty} · {doc.experience} yil tajriba
            </div>
            <div style={{ display: "flex", fontSize: 76, fontWeight: 500, color: "#0A1F3A", lineHeight: 1.0, letterSpacing: "-0.025em" }}>
              {doc.name}
            </div>
            <div style={{ display: "flex", fontSize: 24, color: "#4A6684", lineHeight: 1.4, marginTop: 8, maxWidth: 540 }}>
              {(doc.bio ?? "").slice(0, 140)}
            </div>
          </div>

          <div style={{ display: "flex", gap: 32, color: "#4A6684", fontSize: 18 }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: 36, fontWeight: 600, color: "#0A1F3A" }}>{doc.rating}</span>
              <span style={{ color: "#E89C32", fontSize: 24 }}>★</span>
              <span>({doc.reviews})</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
              <span style={{ fontSize: 36, fontWeight: 600, color: "#0A1F3A" }}>{(doc.price / 1000).toFixed(0)}k</span>
              <span>so&apos;m qabul</span>
            </div>
          </div>
        </div>

        <div style={{ flex: 1, display: "flex", background: tints[doc.color] ?? tints.blue, alignItems: "flex-end", justifyContent: "center", position: "relative" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={photoUrl} alt={doc.name} width={520} height={600} style={{ maxWidth: "90%", maxHeight: "92%", objectFit: "contain" }} />
        </div>
      </div>
    ),
    size,
  );
}
