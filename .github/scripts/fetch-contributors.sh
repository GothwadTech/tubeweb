#!/usr/bin/env bash
# Builds public/contributors.json: Gothwad Tech as owner, contributors of PlusTube + this
# website, and the upstream Flow contributors (PlusTube is adopted from Flow, so its
# contributors stay credited).
set -euo pipefail

OUT="${1:-public/contributors.json}"
OWNER="GothwadTech"
EXCLUDE='["actions-user", "weblate", "github-actions", "dependabot"]'
REPOS='[
  {"id": "app", "label": "PlusTube", "repo": "GothwadTech/tubeapp"},
  {"id": "website", "label": "Website", "repo": "GothwadTech/tubeweb"},
  {"id": "flow", "label": "Upstream · Flow", "repo": "A-EDev/Flow"}
]'

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

jq -c '.[]' <<<"$REPOS" | while read -r row; do
  id="$(jq -r .id <<<"$row")"
  repo="$(jq -r .repo <<<"$row")"
  gh api "repos/$repo/contributors?per_page=100" --paginate \
    --jq '[.[] | select(.type == "User") | {login, avatar_url, html_url, contributions}]' \
    | jq --arg id "$id" 'map(. + {repo: $id})' > "$tmp/$id.json"
done

gh api "users/$OWNER" --jq '{login, name, bio, avatar_url, html_url, followers, public_repos}' > "$tmp/owner.json"

jq -s \
  --argjson repos "$REPOS" \
  --slurpfile owner "$tmp/owner.json" \
  --argjson exclude "$EXCLUDE" '
  add
  | map(select(
      (.login | ascii_downcase) as $l
      | ($exclude | index($l) | not)
        and ($l | endswith("[bot]") | not)
    ))
  | group_by(.login | ascii_downcase)
  | map({
      login: .[0].login,
      avatar_url: .[0].avatar_url,
      html_url: .[0].html_url,
      contributions: (map(.contributions) | add),
      repos: (map(.repo) | unique)
    })
  | sort_by(-.contributions, (.login | ascii_downcase))
  | {
      owner: $owner[0],
      repos: ($repos | map(. + {url: ("https://github.com/" + .repo)})),
      contributors: .
    }
' "$tmp/app.json" "$tmp/website.json" "$tmp/flow.json" > "$OUT"
