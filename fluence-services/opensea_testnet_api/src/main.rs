/*
 * Copyright 2020 Fluence Labs Limited
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 #![allow(improper_ctypes)]

 use marine_rs_sdk::marine;
 use marine_rs_sdk::module_manifest;

 use marine_rs_sdk::WasmLoggerBuilder;
 use marine_rs_sdk::MountedBinaryResult;

 module_manifest!();

 /// Log level can be changed by `RUST_LOG` env as well.
 pub fn main() {
     WasmLoggerBuilder::new().build().unwrap();
 }

 #[marine]
 pub fn download(url: String) -> String {
    log::info!("download called with url {}\n", url);

    let result = curl(vec![url]);

    String::from_utf8(result.stdout).unwrap()
 }

 #[marine]
 pub fn get_all_assets(offset: String, limit: String) -> String {
    log::info!("Get All Assets with Limit:{} and Offset:{} \n", limit, offset);
    let url = format!("https://testnets-api.opensea.io/api/v1/assets?order_direction=desc&offset={}&limit={}", offset, limit);
    let result = curl(vec![url]);

    String::from_utf8(result.stdout).unwrap()
 }

 #[marine]
 pub fn get_owned_collections(owner_address: String, offset: String, limit: String) -> String {
    log::info!("Get Owned Collections of {} (Limit:{} & Offset:{})\n", owner_address, limit, offset);
    let url = format!("https://testnets-api.opensea.io/api/v1/collections?asset_owner={}&offset={}&limit={}", owner_address, offset, limit);
    let result = curl(vec![url]);

    String::from_utf8(result.stdout).unwrap()
 }

 #[marine]
 pub fn get_owned_assets_by_collection(collection_addr: String, offset: String, limit: String) -> String {
    log::info!("Get Assets from Collection {} (Limit:{} & Offset:{}) \n", collection_addr, limit, offset);
    let url = format!("https://testnets-api.opensea.io/api/v1/assets?asset_contract_address={}&order_direction=desc&offset={}&limit={}", collection_addr, offset, limit);
    let result = curl(vec![url]);

    String::from_utf8(result.stdout).unwrap()
 }


 /// Permissions in `Config.toml` should exist to use host functions.
 #[marine]
 #[link(wasm_import_module = "host")]
 extern "C" {
     fn curl(cmd: Vec<String>) -> MountedBinaryResult;
 }
