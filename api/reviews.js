// Vercel serverless function: fetches live Google reviews.
// Works with EITHER "Places API (New)" or the legacy "Places API" — it tries the
// new endpoint first, then falls back to legacy, so it matches whichever the key allows.
//
// Env vars (Vercel -> Project -> Settings -> Environment Variables):
//   GOOGLE_PLACES_API_KEY  - key with billing on, application restriction = None
//   GOOGLE_PLACE_ID        - Place ID of the Apex Dental listing (starts with ChI...)
// On any error/misconfig responds { ok:false } and the site uses its built-in reviews.

function mapNew(data) {
  const reviews = (data.reviews || [])
    .filter((rv) => (rv.rating || 0) >= 4 && rv.text && rv.text.text)
    .slice(0, 6)
    .map((rv) => ({
      name: (rv.authorAttribution && rv.authorAttribution.displayName) || 'Google user',
      rating: rv.rating || 5,
      date: rv.relativePublishTimeDescription || '',
      text: rv.text.text,
    }));
  return { ok: true, rating: data.rating, total: data.userRatingCount, reviews };
}

function mapLegacy(result) {
  const reviews = (result.reviews || [])
    .filter((rv) => (rv.rating || 0) >= 4 && rv.text)
    .slice(0, 6)
    .map((rv) => ({
      name: rv.author_name || 'Google user',
      rating: rv.rating || 5,
      date: rv.relative_time_description || '',
      text: rv.text,
    }));
  return { ok: true, rating: result.rating, total: result.user_ratings_total, reviews };
}

export default async function handler(req, res) {
  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate=43200');
  if (!key || !placeId) return res.status(200).json({ ok: false, reason: 'not_configured' });

  // 1) Try Places API (New)
  try {
    const r = await fetch(
      `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}?languageCode=en`,
      { headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'rating,userRatingCount,reviews' } }
    );
    const data = await r.json();
    if (r.ok && data && !data.error && (data.reviews || data.rating)) {
      return res.status(200).json(mapNew(data));
    }
  } catch (e) { /* fall through to legacy */ }

  // 2) Fall back to legacy Places API
  try {
    const url =
      'https://maps.googleapis.com/maps/api/place/details/json' +
      `?place_id=${encodeURIComponent(placeId)}` +
      '&fields=rating,user_ratings_total,reviews&reviews_sort=newest&language=en' +
      `&key=${encodeURIComponent(key)}`;
    const r = await fetch(url);
    const data = await r.json();
    if (data.status === 'OK' && data.result) {
      return res.status(200).json(mapLegacy(data.result));
    }
    return res.status(200).json({ ok: false, reason: data.status || 'api_error' });
  } catch (e) {
    return res.status(200).json({ ok: false, reason: 'fetch_error' });
  }
}
