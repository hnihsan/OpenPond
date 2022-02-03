# OpenPond
An simple web application for displaying NFTs from OpenSea and Rarible marketplaces, including your owned/created NFTs which linked to your wallet. Built on [Fluence](https://fluence.network/) and [Next.js](https://nextjs.org/)
## Usage

Build and run the application

```bash
npm install
npm run compile-aqua
npm run postinstall
cp .env.example .env.local
npm run start:dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Fluence Services
OpenPond services built using [Marine Rust SDK](https://doc.fluence.dev/docs/knowledge_aquamarine/marine/marine-rs-sdk)

To compile and run these services in your own Environment, follow these steps below *(optional)*:
> This step is optional because the services used in this application is already deployed and hosted in Fluence Krasnodar Network

First make sure you have installed all the required tools in your environment, the setup can be found in this docs: [Setting Up Your Environment](https://doc.fluence.dev/docs/tutorials_tutorials/recipes_setting_up).

Then run the following command :
```bash
cd fluence-services
./build.sh
```
After *.wasm* files created inside the *artifacts/* folder, then you can deploy the services on your own fluence node or redeployed it in some Flunce hosted network, with this command :
```bash
fldist  \
  --node-addr /ip4/127.0.0.1/tcp/9999/ws/p2p/{node_id}  new_service \
  --ms artifacts/opensea_testnet_api.wasm:opensea_testnet_api/config.json \
  -n openpond_opensea_testnet_api \
  --verbose

fldist  \
  --node-addr /ip4/127.0.0.1/tcp/9999/ws/p2p/{node_id}  new_service \
  --ms artifacts/rarible_testnet_api.wasm:rarible_testnet_api/config.json \
  -n openpod_rarible_testnet_api \
  --verbose
```
## File structure
- `/aqua` Contain aqua files for interacting with services
- `/fluence-services` Contain services logic built with rust
- `/src` Next.js front-end files