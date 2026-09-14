{
  inputs = {
    nixpkgs.url = "github:cachix/devenv-nixpkgs/rolling";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils, ... }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
      in {
        devShells.default = pkgs.mkShell {
          packages = [
            pkgs.nodejs_22
            pkgs.ffmpeg
            pkgs.lefthook
            pkgs.just
            pkgs.gh-dash
          ];

          shellHook = ''
            state_dir="$PWD/.direnv/state"
            mkdir -p "$state_dir"

            # corepack (pnpm) の shim をプロジェクトローカルに隔離する。
            # pnpm のバージョンは package.json の packageManager で解決される。
            corepack_dir="$state_dir/corepack-bin"
            mkdir -p "$corepack_dir"
            corepack enable --install-directory "$corepack_dir"
            export PATH="$corepack_dir:$PATH"

            # gh / gh-dash の既定リポジトリを upstream ではなく origin に固定する。
            git config --local remote.origin.gh-resolved base
          '';
        };
      });
}
