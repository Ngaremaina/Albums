import { UserResponse } from "./UserResponse";

export interface AlbumResponse extends UserResponse{
    id: number,
    albumTitle: string
}