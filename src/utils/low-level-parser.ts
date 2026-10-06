import {ACTIVITY_TRACK_RECORD_RAW_SIZE, type ActivityTrackRecordRaw} from "../types/low-level.ts";

export function parseActivityCalenderBuffer(historyBuffer:ArrayBuffer):ActivityTrackRecordRaw[] {
    if (historyBuffer.byteLength % ACTIVITY_TRACK_RECORD_RAW_SIZE !== 0) {
        console.error(
            `File size (${historyBuffer.byteLength} bytes) is not a multiple of ${ACTIVITY_TRACK_RECORD_RAW_SIZE}. It may be corrupted.`
        );
        return [];
    }
    const view = new DataView(historyBuffer);

    const records: ActivityTrackRecordRaw[] = [];
    const NRecords = Math.floor(historyBuffer.byteLength / ACTIVITY_TRACK_RECORD_RAW_SIZE);
    for (let i = 0; i < NRecords; i++) {
        const offset = i * ACTIVITY_TRACK_RECORD_RAW_SIZE;
        const activityId = view.getUint32(offset + 0, true);
        const startUnixTime = view.getBigUint64(offset + 4, true);
        const stopUnixTime = view.getBigUint64(offset + 12, true);
        records.push({
            activityId,
            startUnixTime,
            stopUnixTime
        });
    }
    return records;
}
