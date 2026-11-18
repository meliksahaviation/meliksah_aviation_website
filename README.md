# Melikşah Aviation — website draft

Responsive single-page website prepared for GitHub Pages.

## Preview locally

Open `index.html` in a browser.

## Publish with GitHub Pages

1. Create a public GitHub repository named `meliksah_aviation_website`.
2. Upload `index.html`, `styles.css`, `script.js`, and this README to the repository root.
3. In **Settings → Pages**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. In Pages **Custom domain**, enter `www.meliksahaviation.com` and enable HTTPS after DNS has propagated. The `CNAME` file in this repository root preserves that custom domain setting.
5. At the domain registrar, point `www` to the GitHub Pages hostname for the account that owns the repository. If you also want the apex domain `meliksahaviation.com` to work, add GitHub's documented apex A/AAAA records and configure a redirect to `www`. DNS instructions are at https://docs.github.com/pages/configuring-a-custom-domain-for-your-github-pages-site.

Do not change the domain's email MX records. Those records deliver `info@meliksahaviation.com` through Google Workspace. Add only the web hosting records required for GitHub Pages, and confirm the registrar and Workspace DNS setup before saving changes.

## Before publishing

- Confirm the brand spelling and public contact email.
- Replace or remove any wording that does not accurately describe the current project.
- Add a privacy notice before adding analytics, forms, or collecting personal information.
- A GitHub Pages website does not itself establish a company, office, regulatory approval, or product certification.
