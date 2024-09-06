export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const randomNum = Math.floor(Math.random() * 1000) + 1;
  const time = new Date().toISOString();

  return Response.json({ ok: true, data: { random: randomNum, time } });
}
