// Vercel serverless function: fetches live Google reviews via Places API (New).
// Env vars (Vercel -> Project -> Settings -> Environment Variables):
//   GOOGLE_PLACES_API_KEY  - Google Cloud key with "Places API (New)" enabled, billing on,
//                            application restriction = None (server-side call)
//   GOOGLE_PLACE_ID        - Place ID of the Apex Dental Google Business listing
// On any error/misconfig responds { ok:false } and the site uses its built-in reviews.

export default async function handler(req, res) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=43200');

  if (!key || !placeId) {
    return res.status(200).json({ ok: false, reason: 'not_configured' });
  }

  try {
    const r = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`,
      {
        headers: {
          'X-Goog-Api-Key': key,
          'X-Goog-FieldMask': 'rating,userRatingCount,reviews',
        },
      }
    );
    const data = await r.json();

    if (!r.ok || !data || data.error) {
      return res.status(200).json({ ok: false, reason: (data && data.error && data.error.status) || 'api_error' });
    }

    const reviews = (data.reviews || [])
      .filter((rv) => (rv.rating || 0) >= 4 && rv.text && rv.text.text)
      .slice(0, 6)
      .map((rv) => ({
        name: (rv.authorAttribution && rv.authorAttribution.displayName) || 'Google user',
        rating: rv.rating || 5,
        date: rv.relativePublishTimeDescription || '',
        text: rv.text.text,
      }));

    return res.status(200).json({
      ok: true,
      rating: data.rating,
      total: data.userRatingCount,
      reviews,
    });
  } catch (e) {
    return res.status(200).json({ ok: false, reason: 'fetch_error' });
  }
}
