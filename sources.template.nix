# テンプレート管理（派生先は sources.nix を編集）。adr/from-template/0005
inputs: {
  skills = {
    anthropic = { path = inputs.anthropic-skills.outPath; subdir = "skills"; };
    vercel = { path = inputs.vercel-ai.outPath; subdir = "skills"; };
    web-quality = { path = inputs.web-quality-skills.outPath; subdir = "skills"; };
    yomiyasu = { path = inputs.yomiyasu.outPath; subdir = "skills"; };
    hol1kgmg = { path = inputs.hol1kgmg-skills.outPath; subdir = "skills"; };
    security-audit = { path = inputs.security-audit-skill.outPath; subdir = "skills"; };
    local = { path = ./skills; };
  };

  rules = {
    hol1kgmg = { path = inputs.hol1kgmg-rules.outPath; subdir = "rules"; };
    local = { path = ./rules; };
  };
}
