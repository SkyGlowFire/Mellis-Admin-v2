import { FileType, Media, MediaFile } from "~/types/image";
import * as uuid from 'uuid'

export const formMedia = (file: MediaFile): Media => {
    return {url: file.url, _id: uuid.v4(), fileType: file.type as FileType, name: file.name}
}