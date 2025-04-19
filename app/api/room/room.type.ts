export type ChatRoomRequest = {
    name: string;
    className: string;
}

export type ChatRoomResponse = {
    id: string;
    name: string;
    className: string;
    members: MemberInfoResponse[];
}
export type MemberInfoResponse = {
    userId: string;
    name: string;
}