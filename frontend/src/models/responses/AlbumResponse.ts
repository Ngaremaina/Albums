// import { UserResponse } from "./UserResponse";

import { ImageResponse } from "./ImageResponse"

export interface AlbumResponse{
    id: number,
    albumTitle: string
}

export interface AlbumDetailsResponse extends AlbumResponse{
    imageResponseList: ImageResponse[]
}