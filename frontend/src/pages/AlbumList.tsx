import AlbumItem from "../components/list/AlbumItem";
import { AlbumResponse } from "../models/responses/AlbumResponse";

function AlbumList({ albumResponseList }: { albumResponseList: AlbumResponse[] | undefined }) {
    const displayAlbums = albumResponseList?.map((album) => {
        return <AlbumItem key={album.id} id = {album.id} albumTitle={album.albumTitle} />;
    });

    return  (
        <>
        <h5 className="text-xl text-black mb-4 uppercase font-bold">Albums</h5>
        
        <div className="sm: px-2 md:grid grid-cols-3 gap-4 lg:grid-cols-4">
            {displayAlbums}
        </div>
        </>
    )
}

export default AlbumList;

