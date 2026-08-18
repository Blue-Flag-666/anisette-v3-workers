#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BUILD_DIR="${ROOT_DIR}/.build"
ASSETS_DIR="${BUILD_DIR}/assets"
APK_PATH="${BUILD_DIR}/applemusic.apk"
APK_URL="https://apps.mzstatic.com/content/android-apple-music-apk/applemusic.apk"

mkdir -p "${BUILD_DIR}" "${ASSETS_DIR}"

curl --fail --location --retry 3 --output "${APK_PATH}" "${APK_URL}"
unzip -p "${APK_PATH}" "lib/arm64-v8a/libstoreservicescore.so" > "${ASSETS_DIR}/libstoreservicescore.so"
unzip -p "${APK_PATH}" "lib/arm64-v8a/libCoreADI.so" > "${ASSETS_DIR}/libCoreADI.so"

test -s "${ASSETS_DIR}/libstoreservicescore.so"
test -s "${ASSETS_DIR}/libCoreADI.so"
