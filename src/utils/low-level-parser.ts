import { ACTIVITY_NAME_RECORD_RAW_SIZE, ACTIVITY_TRACK_RECORD_RAW_SIZE, type ActivityNameRecordRaw, type ActivityTrackRecordRaw } from "../types/low-level.ts";

export function parseActivityNameBuffer(activityBuffer: ArrayBuffer): ActivityNameRecordRaw[] {
    if (activityBuffer.byteLength % ACTIVITY_NAME_RECORD_RAW_SIZE !== 0) {
        console.error(
            `File size (${activityBuffer.byteLength} bytes) is not a multiple of ${ACTIVITY_NAME_RECORD_RAW_SIZE}. It may be corrupted.`
        );
        return [];
    }

    const view = new DataView(activityBuffer);
    const decoder = new TextDecoder();
    const records: ActivityNameRecordRaw[] = [];

    for (let offset = 0; offset < activityBuffer.byteLength; offset += ACTIVITY_NAME_RECORD_RAW_SIZE) {
        const id = view.getUint32(offset + 0, true);
        const nameBytes = new Uint8Array(activityBuffer, offset + 4, 32);
        const name = decoder.decode(nameBytes).split('\0', 1)[0];
        const r = view.getUint8(offset + 36);
        const g = view.getUint8(offset + 37);
        const b = view.getUint8(offset + 38);

        records.push({ id, name, r, g, b });
    }

    return records;
}

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
