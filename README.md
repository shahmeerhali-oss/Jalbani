# Professor Dr. Gulshan Ara Jalbani — Academic Website

Next.js 14 (App Router) · TypeScript · Tailwind CSS. Static pages plus one server route (`/api/contact`).

**Principle:** nothing unverified is published. Every sample entry is labelled "Placeholder". Profile links, email and phone are hidden until you set them.

## 1. Run locally
```bash
npm install
cp .env.example .env.local     # fill in later (see §4)
npm run dev                    # http://localhost:3000
npm run build && npm start     # production check
```
Requires Node 18.18+ (Node 20/22 recommended).

## 2. Replace placeholders (all content lives in `src/content/`)
| File | What to edit |
|---|---|
| `site.ts` | Email, phone, **portrait path**, department, verified profile links (Google Scholar, ORCID, PubMed…). `null` = hidden. |
| `qualifications.ts` | Degrees, appointments, promotions, training. Set `verified: true` once confirmed (removes the Placeholder badge). |
| `publications.ts` | Delete the 2 placeholders; add real entries (title, authors, journal, year, DOI, abstract, URL). Search/year/type filters update automatically. |
| `resources.ts` | Resource cards. Add `file: "/resources/name.pdf"` + `format`. Cards without a file show "Coming soon". Set `reviewed: true` after academic review. |
| `activities.ts` | Conferences, workshops, talks, achievements. Optional `image` and `document`. |
| `gallery.ts` | Photos (`src: "/gallery/photo.jpg"`). |
| `quiz.ts` | Practice questions with explanations and references. Set `quizReviewed = true` after review. |
| `src/app/about/page.tsx` | The `blocks` array holds the biography sections. |

**Portrait:** save the authentic photo as `public/images/portrait.jpg`, then set `portrait: "/images/portrait.jpg"` in `site.ts`.
**Files/photos:** drop them in `public/resources/`, `public/gallery/`, `public/images/events/`. Resize photos to ~1600 px first.

### About "admin upload"
This site uses a **file-based workflow** (edit the content files + add files to `public/`, then redeploy; on Vercel this is automatic when you push to Git). It has no web login/admin dashboard — that would need a database/CMS and was not wired up. If you want browser-based editing later, add a Git-based CMS (e.g. Decap CMS, TinaCMS) or Sanity over these same data shapes.

## 3. Content rules
Do not upload copyrighted third-party material or anything with student/patient information. Have drug content reviewed and referenced before publishing.

## 4. Make the contact form deliver (required before launch)
The form **never shows success unless the email provider accepts the message**; unconfigured, it returns "Your message was NOT sent."
1. Create a free account at https://resend.com, verify your sending domain, create an API key.
2. Set environment variables (locally in `.env.local`, in production in the host dashboard):
   `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (Professor's official email), `CONTACT_FROM_EMAIL` (e.g. `Website <website@yourdomain.pk>`).
3. Optional stronger spam protection: Cloudflare Turnstile → set `NEXT_PUBLIC_TURNSTILE_SITE_KEY` and `TURNSTILE_SECRET_KEY`.
Built-in protections: server-side validation, honeypot field, minimum-fill-time check, per-IP rate limit, HTML-escaped email body. Secrets are server-only.
5. Send a real test message and confirm it arrives.

## 5. Deploy (Vercel — recommended)
1. Push this folder to a GitHub repository.
2. https://vercel.com → *Add New Project* → import the repo (framework auto-detected).
3. Add the environment variables from §4 plus `NEXT_PUBLIC_SITE_URL=https://your-domain`.
4. Deploy. Every Git push redeploys.

## 6. Connect a domain
Vercel project → *Settings → Domains* → add your domain → add the DNS records Vercel shows at your registrar (A record for the apex, CNAME for `www`). HTTPS is automatic. Then update `NEXT_PUBLIC_SITE_URL` and redeploy (sitemap and metadata use it).

## 7. Pre-launch checklist
- [ ] Portrait added; all placeholders replaced or removed
- [ ] Profile URLs verified; email/phone authorised by the Professor
- [ ] Contact form test email received
- [ ] Privacy policy reviewed by the Professor/institution
- [ ] Resources and quiz academically reviewed
- [ ] `NEXT_PUBLIC_SITE_URL` set; sitemap at `/sitemap.xml` loads

## Structure
```
src/app/            pages (+ api/contact, sitemap, robots, 404, loading, error)
src/components/     Header, Footer, ui helpers, filters, gallery lightbox, contact form, quiz
src/content/        all editable content
public/             resources/, gallery/, images/
```
Fonts use a system serif/sans stack for speed and offline builds; to use a web font, add it with `next/font` in `src/app/layout.tsx`.
