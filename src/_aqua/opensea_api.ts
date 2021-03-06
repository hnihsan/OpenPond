/**
 *
 * This file is auto-generated. Do not edit manually: changes may be erased.
 * Generated by Aqua compiler: https://github.com/fluencelabs/aqua/.
 * If you find any bugs, please write an issue on GitHub: https://github.com/fluencelabs/aqua/issues
 * Aqua version: 0.5.3-260
 *
 */
import { Fluence, FluencePeer } from '@fluencelabs/fluence';
import {
    CallParams,
    callFunction,
    registerService,
} from '@fluencelabs/fluence/dist/internal/compilerSupport/v2';


// Services

export interface OpenseaTestnetApiDef {
    download: (url: string, callParams: CallParams<'url'>) => string | Promise<string>;
    get_all_assets: (offset: string, limit: string, order: string, callParams: CallParams<'offset' | 'limit' | 'order'>) => string | Promise<string>;
    get_owned_assets_by_collection: (collection_addr: string, offset: string, limit: string, callParams: CallParams<'collection_addr' | 'offset' | 'limit'>) => string | Promise<string>;
    get_owned_collections: (owner_address: string, offset: string, limit: string, callParams: CallParams<'owner_address' | 'offset' | 'limit'>) => string | Promise<string>;
}
export function registerOpenseaTestnetApi(serviceId: string, service: OpenseaTestnetApiDef): void;
export function registerOpenseaTestnetApi(peer: FluencePeer, serviceId: string, service: OpenseaTestnetApiDef): void;
       

export function registerOpenseaTestnetApi(...args: any) {
    registerService(
        args,
        {
    "functions" : [
        {
            "functionName" : "download",
            "argDefs" : [
                {
                    "name" : "url",
                    "argType" : {
                        "tag" : "primitive"
                    }
                }
            ],
            "returnType" : {
                "tag" : "primitive"
            }
        },
        {
            "functionName" : "get_all_assets",
            "argDefs" : [
                {
                    "name" : "offset",
                    "argType" : {
                        "tag" : "primitive"
                    }
                },
                {
                    "name" : "limit",
                    "argType" : {
                        "tag" : "primitive"
                    }
                },
                {
                    "name" : "order",
                    "argType" : {
                        "tag" : "primitive"
                    }
                }
            ],
            "returnType" : {
                "tag" : "primitive"
            }
        },
        {
            "functionName" : "get_owned_assets_by_collection",
            "argDefs" : [
                {
                    "name" : "collection_addr",
                    "argType" : {
                        "tag" : "primitive"
                    }
                },
                {
                    "name" : "offset",
                    "argType" : {
                        "tag" : "primitive"
                    }
                },
                {
                    "name" : "limit",
                    "argType" : {
                        "tag" : "primitive"
                    }
                }
            ],
            "returnType" : {
                "tag" : "primitive"
            }
        },
        {
            "functionName" : "get_owned_collections",
            "argDefs" : [
                {
                    "name" : "owner_address",
                    "argType" : {
                        "tag" : "primitive"
                    }
                },
                {
                    "name" : "offset",
                    "argType" : {
                        "tag" : "primitive"
                    }
                },
                {
                    "name" : "limit",
                    "argType" : {
                        "tag" : "primitive"
                    }
                }
            ],
            "returnType" : {
                "tag" : "primitive"
            }
        }
    ]
}
    );
}
      
// Functions
 

export function download(
    url: string,
    config?: {ttl?: number}
): Promise<string>;

export function download(
    peer: FluencePeer,
    url: string,
    config?: {ttl?: number}
): Promise<string>;

export function download(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                         (call %init_peer_id% ("getDataSrv" "url") [] url)
                        )
                        (call -relay- ("op" "noop") [])
                       )
                       (xor
                        (seq
                         (call "12D3KooWDUszU2NeWyUVjCXhGEt1MoZrhvdmaQQwtZUriuGN1jTr" ("abddf344-0348-4849-b3c3-eb1975d5db25" "download") [url] res)
                         (call -relay- ("op" "noop") [])
                        )
                        (seq
                         (call -relay- ("op" "noop") [])
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "download",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "url",
            "argType" : {
                "tag" : "primitive"
            }
        }
    ],
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}

 

export function get_all_assets(
    offset: string,
    limit: string,
    order: string,
    config?: {ttl?: number}
): Promise<string>;

export function get_all_assets(
    peer: FluencePeer,
    offset: string,
    limit: string,
    order: string,
    config?: {ttl?: number}
): Promise<string>;

export function get_all_assets(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                           (call %init_peer_id% ("getDataSrv" "offset") [] offset)
                          )
                          (call %init_peer_id% ("getDataSrv" "limit") [] limit)
                         )
                         (call %init_peer_id% ("getDataSrv" "order") [] order)
                        )
                        (call -relay- ("op" "noop") [])
                       )
                       (xor
                        (seq
                         (call "12D3KooWDUszU2NeWyUVjCXhGEt1MoZrhvdmaQQwtZUriuGN1jTr" ("abddf344-0348-4849-b3c3-eb1975d5db25" "get_all_assets") [offset limit order] res)
                         (call -relay- ("op" "noop") [])
                        )
                        (seq
                         (call -relay- ("op" "noop") [])
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "get_all_assets",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "offset",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "limit",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "order",
            "argType" : {
                "tag" : "primitive"
            }
        }
    ],
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}

 

export function get_owned_collections(
    owner_address: string,
    offset: string,
    limit: string,
    config?: {ttl?: number}
): Promise<string>;

export function get_owned_collections(
    peer: FluencePeer,
    owner_address: string,
    offset: string,
    limit: string,
    config?: {ttl?: number}
): Promise<string>;

export function get_owned_collections(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                           (call %init_peer_id% ("getDataSrv" "owner_address") [] owner_address)
                          )
                          (call %init_peer_id% ("getDataSrv" "offset") [] offset)
                         )
                         (call %init_peer_id% ("getDataSrv" "limit") [] limit)
                        )
                        (call -relay- ("op" "noop") [])
                       )
                       (xor
                        (seq
                         (call "12D3KooWDUszU2NeWyUVjCXhGEt1MoZrhvdmaQQwtZUriuGN1jTr" ("abddf344-0348-4849-b3c3-eb1975d5db25" "get_owned_collections") [owner_address offset limit] res)
                         (call -relay- ("op" "noop") [])
                        )
                        (seq
                         (call -relay- ("op" "noop") [])
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "get_owned_collections",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "owner_address",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "offset",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "limit",
            "argType" : {
                "tag" : "primitive"
            }
        }
    ],
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}

 

export function get_owned_assets_by_collection(
    collection_addr: string,
    offset: string,
    limit: string,
    config?: {ttl?: number}
): Promise<string>;

export function get_owned_assets_by_collection(
    peer: FluencePeer,
    collection_addr: string,
    offset: string,
    limit: string,
    config?: {ttl?: number}
): Promise<string>;

export function get_owned_assets_by_collection(...args: any) {

    let script = `
                    (xor
                     (seq
                      (seq
                       (seq
                        (seq
                         (seq
                          (seq
                           (call %init_peer_id% ("getDataSrv" "-relay-") [] -relay-)
                           (call %init_peer_id% ("getDataSrv" "collection_addr") [] collection_addr)
                          )
                          (call %init_peer_id% ("getDataSrv" "offset") [] offset)
                         )
                         (call %init_peer_id% ("getDataSrv" "limit") [] limit)
                        )
                        (call -relay- ("op" "noop") [])
                       )
                       (xor
                        (seq
                         (call "12D3KooWDUszU2NeWyUVjCXhGEt1MoZrhvdmaQQwtZUriuGN1jTr" ("abddf344-0348-4849-b3c3-eb1975d5db25" "get_owned_assets_by_collection") [collection_addr offset limit] res)
                         (call -relay- ("op" "noop") [])
                        )
                        (seq
                         (call -relay- ("op" "noop") [])
                         (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 1])
                        )
                       )
                      )
                      (xor
                       (call %init_peer_id% ("callbackSrv" "response") [res])
                       (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 2])
                      )
                     )
                     (call %init_peer_id% ("errorHandlingSrv" "error") [%last_error% 3])
                    )
    `
    return callFunction(
        args,
        {
    "functionName" : "get_owned_assets_by_collection",
    "returnType" : {
        "tag" : "primitive"
    },
    "argDefs" : [
        {
            "name" : "collection_addr",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "offset",
            "argType" : {
                "tag" : "primitive"
            }
        },
        {
            "name" : "limit",
            "argType" : {
                "tag" : "primitive"
            }
        }
    ],
    "names" : {
        "relay" : "-relay-",
        "getDataSrv" : "getDataSrv",
        "callbackSrv" : "callbackSrv",
        "responseSrv" : "callbackSrv",
        "responseFnName" : "response",
        "errorHandlingSrv" : "errorHandlingSrv",
        "errorFnName" : "error"
    }
},
        script
    )
}
