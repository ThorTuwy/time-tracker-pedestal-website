import type { ActivityNameRecordRaw, ActivityTrackRecordRaw } from "../types/low-level.ts";
import type {ActivityNameRecord, ActivityRegister, ActivityTrackRecord} from "../types/activity.ts";

export function parseRawActivityNameRecords(rawActivityNameRecords: ActivityNameRecordRaw[]): ActivityNameRecord[] {
    const toHex = (n: number) => n.toString(16).padStart(2, '0');
    return rawActivityNameRecords.map(({ id, name, r, g, b }) => ({
        id,
        name: name.trimEnd(),
        color: `#${toHex(r)}${toHex(g)}${toHex(b)}`,
    }));
}

export function parseRawActivityCalender(rawTrackRecords:ActivityTrackRecordRaw[],activityNameRecords:ActivityNameRecord[]):ActivityTrackRecord[] {
    return rawTrackRecords.map((raw) => ({
        activityId: raw.activityId,
        startTime: new Date(Number(raw.startUnixTime)*1000),
        stopTime: new Date(Number(raw.stopUnixTime)*1000),
        activityName: activityNameRecords.find((record) => record.id === raw.activityId)?.name || `Activity ${raw.activityId}`,
        color: activityNameRecords.find((record) => record.id === raw.activityId)?.color || '#3B82F6',
    }));
}

export function getActivityRegister(activityNameRecords: ActivityNameRecord[], activityTrackRecords: ActivityTrackRecord[]): ActivityRegister[] {
    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setHours(0, 0, 0, 0);
    startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const getMinutesInRange = (record: ActivityNameRecord, from: Date) =>
        activityTrackRecords.reduce((total, track) => {
            const matchesActivity = track.activityId !== undefined
                ? track.activityId === record.id
                : track.activityName === record.name;
            if (!matchesActivity) return total;

            const overlapStart = Math.max(track.startTime.getTime(), from.getTime());
            const overlapStop = Math.min(track.stopTime.getTime(), now.getTime());
            return overlapStop > overlapStart
                ? total + Math.floor((overlapStop - overlapStart) / (1000 * 60))
                : total;
        }, 0);

    return activityNameRecords.map((record) => ({
        ...record,
        thisMonthMinutes: getMinutesInRange(record, startOfMonth),
        thisWeekMinutes: getMinutesInRange(record, startOfWeek),
    }));
}
