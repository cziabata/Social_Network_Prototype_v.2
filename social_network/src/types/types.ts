export type PhotosType = {
    small: string | null,
    large: string | null
}
export type UserItemType = {
    id: number,
    name: string,
    status: string,
    photos: PhotosType,
    followed: boolean
}