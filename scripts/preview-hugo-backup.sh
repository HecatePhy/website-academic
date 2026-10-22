#!/usr/bin/env bash
# Preview the old Hugo/Wowchemy version of the site (branch `hugo-backup`) locally.
#
#   ./scripts/preview-hugo-backup.sh          # serve at http://localhost:1313
#   ./scripts/preview-hugo-backup.sh 1414     # use another port
#
# It checks the backup branch out into a separate folder (a git worktree, so your current
# work is untouched), downloads the exact Hugo version the old site was built with (0.108.0,
# cached in ~/.cache), and runs `hugo server`. Requires Go (`brew install go`) for Hugo modules.
set -euo pipefail

BRANCH="hugo-backup"
HUGO_VERSION="0.108.0"
PORT="${1:-1313}"
REPO="$(git rev-parse --show-toplevel)"
WORKTREE="${TMPDIR:-/tmp}/website-${BRANCH}"
CACHE="${XDG_CACHE_HOME:-$HOME/.cache}/hugo-${HUGO_VERSION}"
HUGO="$CACHE/hugo"

command -v go >/dev/null || { echo "Go is required for Hugo modules: brew install go" >&2; exit 1; }

# The backup branch may exist only on GitHub (e.g. on a fresh clone).
if ! git -C "$REPO" show-ref --verify --quiet "refs/heads/$BRANCH"; then
  git -C "$REPO" fetch origin "$BRANCH:$BRANCH"
fi

# 1. Hugo extended, pinned to the version in the old netlify.toml.
if [[ ! -x "$HUGO" ]]; then
  case "$(uname -s)" in
    Darwin) ASSET="hugo_extended_${HUGO_VERSION}_darwin-universal.tar.gz" ;;
    Linux)  ASSET="hugo_extended_${HUGO_VERSION}_Linux-64bit.tar.gz" ;;
    *) echo "Unsupported OS; install Hugo extended ${HUGO_VERSION} manually." >&2; exit 1 ;;
  esac
  echo "Downloading Hugo ${HUGO_VERSION}..."
  mkdir -p "$CACHE"
  curl -fsSL "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/${ASSET}" | tar -xz -C "$CACHE" hugo
fi

# 2. A separate checkout of the backup branch (refreshed if it already exists).
if [[ -d "$WORKTREE" ]]; then
  git -C "$WORKTREE" checkout -q "$BRANCH"
else
  git -C "$REPO" worktree add -q "$WORKTREE" "$BRANCH"
fi

echo "Serving $BRANCH from $WORKTREE at http://localhost:$PORT  (Ctrl+C to stop)"
cd "$WORKTREE"
exec "$HUGO" server --port "$PORT" --disableFastRender
