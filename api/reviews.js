// Vercel serverless function: fetches live Google reviews via the Places API.
// Env vars required (Vercel -> Project -> Settings -> Environment Variables):
//   GOOGLE_PLACES_API_KEY  - Google Cloud API key with "Places API" enabled (billing on)
//   GOOGLE_PLACE_ID        - Place ID of the Apex Dental Google Business listing
// If env vars are missing or Google errors, responds { ok: false } and the
// site falls back to its built-in reviews.

export default async function handler(req, res) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=43200');

  if (!key || !placeId) {
    return res.status(200).json({ ok: false, reason: 'not_configured' });
  }

  try {
    const url =
      'https://maps.googleapis.com/maps/api/place/details/json' +
      `?place_id=${encodeURIComponent(placeId)}` +
      '&fields=rating,user_ratings_total,reviews' +
      '&reviews_sort=newest&language=en' +
      `&key=${encodeURIComponent(key)}`;

    const r = await fetch(url);
    const data = await r.json();

    if (data.status !== 'OK' || !data.result) {
      return res.status(200).json({ ok: false, reason: data.status || 'no_result' });
    }

    const reviews = (data.result.reviews || [])
      .filter((rv) => rv.rating >= 4 && rv.text)
      .slice(0, 6)
      .map((rv) => ({
        name: rv.author_name,
        rating: rv.rating,
        date: rv.relative_time_description,
        text: rv.text,
      }));

    return res.status(200).json({
      ok: true,
      rating: data.result.rating,
      total: data.result.user_ratings_total,
      reviews,
    });
  } catch (e) {
    return res.status(200).json({ ok: false, reason: 'fetch_error' });
  }
}
