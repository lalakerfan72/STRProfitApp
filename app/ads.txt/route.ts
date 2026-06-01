import { getAdsTxtBody } from "@/lib/site";

export function GET() {
  const body = getAdsTxtBody();
  if (!body) {
    return new Response("ads.txt not configured\n", {
      status: 404,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
  return new Response(`${body}\n`, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
