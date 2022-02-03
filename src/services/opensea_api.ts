import {
  get_all_assets,
  get_owned_assets_by_collection,
  get_owned_collections,
} from '../_aqua/opensea_api';

export default {
  async getAllAssets({ offset = 0, limit = 0, order = 'asc' }) {
    try {
      let response_string = await get_all_assets(
        String(offset),
        String(limit),
        order
      );
      let response = JSON.parse(response_string);
      return response.assets;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getOwnedAssetsByCollection(collection_addr, offset = 0, limit = 20) {
    try {
      let response_string = await get_owned_assets_by_collection(
        collection_addr,
        String(offset),
        String(limit)
      );
      let response = JSON.parse(response_string);
      return response.assets;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async getOwnedCollections(owner_address, offset = 0, limit = 20) {
    try {
      let response = await get_owned_collections(
        owner_address,
        String(offset),
        String(limit)
      );
      return JSON.parse(response);
    } catch (error) {
      console.log(error);
      return [];
    }
  },
};
