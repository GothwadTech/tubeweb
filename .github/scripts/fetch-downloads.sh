#!/usr/bin/env bash
# Fetches the latest PlusTube (Gothwad Tube) release info from GitHub into public/downloads.json.
set -euo pipefail

OUT="${1:-public/downloads.json}"
ANDROID_REPO="GothwadTech/tubeapp"

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

# Stable release: every .apk asset, tagged with flavor + ABI where the name says so.
gh api "repos/$ANDROID_REPO/releases/latest" --jq '{
  version: (.tag_name | ltrimstr("v")),
  tag: .tag_name,
  published: .published_at,
  release_url: .html_url,
  checksums_url: ([.assets[] | select(.name == "checksums.txt") | .browser_download_url][0] // null),
  assets: [.assets[] | select(.name | endswith(".apk")) | {
    name,
    url: .browser_download_url,
    size,
    flavor: (if (.name | test("foss"; "i")) then "foss" else "github" end),
    abi: (if (.name | test("arm64")) then "arm64-v8a" elif (.name | test("armeabi|armeabi-v7a")) then "armeabi-v7a" else "universal" end)
  }]
}' > "$tmp/android.json" || echo 'null' > "$tmp/android.json"

# Nightly release (tag "nightly"), when it exists.
gh api "repos/$ANDROID_REPO/releases/tags/nightly" --jq '
  [.assets[] | select(.name | endswith(".apk"))][0] as $apk
  | if $apk == null then null else {
      created: $apk.updated_at,
      commit: (try ((.body // "") | capture("Built from (?<c>[0-9a-f]{7,40})").c) catch null),
      release_url: .html_url,
      apk: {name: $apk.name, url: $apk.browser_download_url, size: $apk.size},
      checksums_url: ([.assets[] | select(.name == "checksums.txt") | .browser_download_url][0] // null)
    } end' > "$tmp/nightly-android.json" || echo 'null' > "$tmp/nightly-android.json"

jq -n \
  --slurpfile android "$tmp/android.json" \
  --slurpfile nightlyAndroid "$tmp/nightly-android.json" \
  '{
    android: $android[0],
    nightly: { android: $nightlyAndroid[0] }
  }' > "$OUT"
