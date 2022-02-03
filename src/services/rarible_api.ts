import {
  get_all_assets,
  get_owned_assets_by_collection,
  get_owned_collections,
} from '../_aqua/rarible_api';

export default {
  async getAllAssets({ size = 20, continue_token = '' }) {
    try {
      let response_string = await get_all_assets(String(size), continue_token);
      let response = JSON.parse(response_string);
      return response;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getOwnedAssetsByCollection(collection_addr, size = 20) {
    try {
      let response_string = await get_owned_assets_by_collection(
        collection_addr,
        String(size)
      );
      let response = JSON.parse(response_string);
      return response.items;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getOwnedCollections(owner_address, size = 20) {
    try {
      let response_string = await get_owned_collections(
        owner_address,
        String(size)
      );
      let response = JSON.parse(response_string);
      return response.collections;
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};
