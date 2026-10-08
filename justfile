# List available recipes for just
list:
    @just --list

# Install dependencies and git hooks
setup:
    pnpm install
    lefthook install

# Start the slide picker in dev mode
dev *args:
    pnpm run dev {{args}}

# Same as dev, but listen on 0.0.0.0 so other devices on the LAN can open it
dev-remote *args:
    pnpm run dev --remote {{args}}

# Build all slides and generate Cloudflare Pages redirects
build:
    pnpm run build

# Build then locally preview dist/ (homepage + talks + _redirects + 404) like Cloudflare Pages
dev-home:
    pnpm run build
    npx wrangler pages dev dist --port 4321 --compatibility-date=2026-08-11

# Type-check the project
typecheck:
    pnpm run typecheck

# Lint the project
lint:
    pnpm run lint

# Regenerate dist/_redirects for Cloudflare Pages
update:
    pnpm run update

# Convert an image to .webp and store it in a slide's src/public/images/
image *args:
    pnpm run image {{args}}

# Convert an image to .webp and store it in reuse/images/ for cross-talk sharing
share *args:
    pnpm run share {{args}}

# Freeze a finished talk's build output into dist-stale/ so future builds skip rebuilding it
freeze *args:
    pnpm run freeze {{args}}

# Pick a talk and export it to PDF (../<talk-dir>.pdf)
export:
    pnpm run export

# gh-dash を Issues ビューで開く（.gh-dash.yml）
dash:
    gh-dash

# gh-dash を PRs ビューで開く（.gh-dash-prs.yml）
dash-prs:
    gh-dash -c .gh-dash-prs.yml
