export interface ActivityTrackRecordRaw{
    activityId: number;
    startUnixTime: bigint;
    stopUnixTime: bigint;
}
export const ACTIVITY_TRACK_RECORD_RAW_SIZE = 20;
