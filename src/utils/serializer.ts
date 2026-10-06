import type {ActivityNameRecord} from "../types/activity.ts";
import {ACTIVITY_NAME_RECORD_RAW_SIZE} from "../types/low-level.ts";

export function serializeActivityNameRecords(activityNameRecords: ActivityNameRecord[]): ArrayBuffer {
    const buffer = new ArrayBuffer(activityNameRecords.length * ACTIVITY_NAME_RECORD_RAW_SIZE);
    const view = new DataView(buffer);
    const encoder = new TextEncoder();

    activityNameRecords.forEach(({ id, name, color }, index) => {
        const offset = index * ACTIVITY_NAME_RECORD_RAW_SIZE;
        view.setUint32(offset, id, true);

        const nameBytes = new Uint8Array(buffer, offset + 4, 32);
        let nameOffset = 0;
        for (const character of name) {
            const characterBytes = encoder.encode(character);
            if (nameOffset + characterBytes.length > nameBytes.length) break;
            nameBytes.set(characterBytes, nameOffset);
            nameOffset += characterBytes.length;
        }

        let hexValuesColor = color.slice(1);
        view.setUint8(offset + 36, Number.parseInt(hexValuesColor.slice(0, 2), 16));
        view.setUint8(offset + 37, Number.parseInt(hexValuesColor.slice(2, 4), 16));
        view.setUint8(offset + 38, Number.parseInt(hexValuesColor.slice(4, 6), 16));
    });

    return buffer;
}