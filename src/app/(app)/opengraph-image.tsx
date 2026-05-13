import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Devisgon AI software, SaaS, and automation agency";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "linear-gradient(135deg, #f7edfe 0%, #fefcfe 48%, #ead5f9 100%)",
          color: "#402060",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          width: "100%",
        }}
      >
        <div
          style={{
            border: "2px solid #ead5f9",
            borderRadius: "36px",
            boxShadow: "0 28px 90px rgba(64, 32, 96, 0.18)",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
            height: "100%",
            justifyContent: "center",
            padding: "58px",
            width: "100%",
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              gap: "18px",
            }}
          >
            <div
              style={{
                alignItems: "center",
                background: "#8e4ec6",
                borderRadius: "20px",
                color: "#ffffff",
                display: "flex",
                fontSize: "34px",
                fontWeight: 900,
                height: "72px",
                justifyContent: "center",
                width: "72px",
              }}
            >
              D
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ color: "#402060", fontSize: "44px", fontWeight: 900 }}>Devisgon</div>
              <div style={{ color: "#8e4ec6", fontSize: "24px", fontWeight: 700 }}>
                AI software, SaaS, and automation agency
              </div>
            </div>
          </div>

          <div
            style={{
              color: "#402060",
              display: "flex",
              fontSize: "76px",
              fontWeight: 900,
              letterSpacing: "-1px",
              lineHeight: 1,
              maxWidth: "900px",
            }}
          >
            Build smarter systems for modern business operations.
          </div>

          <div
            style={{
              color: "#8e4ec6",
              display: "flex",
              fontSize: "30px",
              fontWeight: 700,
              lineHeight: 1.35,
              maxWidth: "880px",
            }}
          >
            Custom AI, automation, cloud, and product engineering for teams ready to scale with confidence.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
