export interface ActivityTrackRecordRaw{
    activityId: number;
    startUnixTime: bigint;
    stopUnixTime: bigint;
}

export interface ActivityNameRecordRaw {
    id: number;
    name: string;
    r: number;
    g: number;
    b: number;
}

export const ACTIVITY_TRACK_RECORD_RAW_SIZE = 20;

export const ACTIVITY_NAME_RECORD_RAW_SIZE = 39;
