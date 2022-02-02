#!/bin/sh

# This script builds all subprojects and puts all created Wasm modules in one dir
(
  cd opensea_testnet_api || exit;
  cargo update --aggressive;
  marine build --release;
)

(
  cd rarible_testnet_api || exit;
  cargo update --aggressive;
  marine build --release;
)

rm -f artifacts/* || true
mkdir -p artifacts

cp opensea_testnet_api/target/wasm32-wasi/release/opensea_testnet_api.wasm artifacts/
cp rarible_testnet_api/target/wasm32-wasi/release/rarible_testnet_api.wasm artifacts/
