import type {ActivityTrackRecordRaw} from "../types/low-level.ts";
import type {ActivityTrackRecord} from "../types/activity.ts";

export function parseRawActivityCalender(rawTrackRecords:ActivityTrackRecordRaw[]):ActivityTrackRecord[] {
    return rawTrackRecords.map((raw) => ({
        startTime: new Date(Number(raw.startUnixTime)*1000),
        stopTime: new Date(Number(raw.stopUnixTime)*1000),
        activityName: `Activity ${raw.activityId}`,
        color: '#3B82F6',
    }));
}