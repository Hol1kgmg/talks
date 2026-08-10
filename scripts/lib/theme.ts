// docs/design-system.md（石像モチーフのブルーグレー×シアン配色 + Material Design 3）に準拠。
// dist/ 配下の静的ページ（homepage.ts, 404.ts）が共有するベーススタイル。
export const baseStyles = `
  :root {
    --color-bg: #e7ecee;
    --color-bg-section: #f4f6f7;
    --color-border: #b8c2c7;
    --color-text-body: #6e7b82;
    --color-text-heading: #3a4650;
    --color-accent: #4fa8b0;
    --color-accent-hover: #8fd3d9;
    --shadow-card: 0 1px 2px 0 rgba(58, 70, 80, 0.12), 0 1px 3px 1px rgba(58, 70, 80, 0.08);
    --shadow-card-hover: 0 1px 2px 0 rgba(58, 70, 80, 0.16), 0 2px 6px 2px rgba(58, 70, 80, 0.1);
  }
  @media (prefers-color-scheme: dark) {
    :root {
      --color-bg: #2c3a47;
      --color-bg-section: #364554;
      --color-border: #52616c;
      --color-text-body: #b8c2c7;
      --color-text-heading: #f4f6f7;
      --color-accent: #8fd3d9;
      --color-accent-hover: #b4e3e7;
      --shadow-card: 0 1px 2px 0 rgba(0, 0, 0, 0.4), 0 1px 3px 1px rgba(0, 0, 0, 0.25);
      --shadow-card-hover: 0 1px 2px 0 rgba(0, 0, 0, 0.4), 0 2px 6px 2px rgba(0, 0, 0, 0.3);
    }
  }
  * { box-sizing: border-box; }
  body {
    font-family: 'Roboto', system-ui, -apple-system, 'Segoe UI', sans-serif;
    background: var(--color-bg);
    color: var(--color-text-body);
    max-width: 720px;
    margin: 0 auto;
    padding: 3rem 1.5rem 4rem;
    line-height: 1.5;
  }
  h1 {
    /* Headline Small 相当 */
    font-size: 1.75rem;
    font-weight: 400;
    letter-spacing: 0;
    margin: 0 0 2rem;
    color: var(--color-text-heading);
  }
`
