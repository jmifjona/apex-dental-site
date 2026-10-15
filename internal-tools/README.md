# Internal tools - NOT deployed

The files in `google-ads/` are the old internal Google Ads management tool (dashboard, campaign
builder, campaign manager, campaign creator, AI strategy engine). They were taken off the public
website on 15 Oct 2026 because they were bundled into the patient-facing JavaScript and linked
from every page.

- Nothing in this folder is imported by `src/`, so Vite does not bundle it and Vercel does not
  serve it. Do not import these files from `src/` again.
- The browser-side "login" that used to wrap these pages was removed, not moved: it was a
  username and password written into the public bundle, which anyone could read or bypass. These
  files have no login of their own.
- The tool talks straight to the Google Ads backend on Railway
  (`google-ads-backend-production-2319.up.railway.app`). On 15 Oct 2026 that backend answered
  `GET /campaigns/list` with live campaign data **without any credentials**.

## Before any re-use

1. Put real authentication on the Railway backend first (an API key or session checked on the
   server, or Cloudflare Access in front of it). A password checked in the browser is not
   authentication.
2. Rotate the Google Ads refresh token and any AI provider keys the backend holds if its logs
   show callers you do not recognise.
3. Run the tool as its own private project or subdomain, never inside the public clinic site. If
   it moves, update the Google OAuth consent screen's homepage and privacy-policy URLs. This
   site's `/privacy-policy` and `/terms` describe only this Ads application, so they are most
   likely the URLs the consent screen uses; they are kept on the site until that is checked.
4. The old hard-coded Ads customer ID and the `localhost:3001` calls in these files need
   reviewing before they run anywhere.
