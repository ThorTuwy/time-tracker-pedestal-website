export interface ActivityNameRecord {
    id: number
    name: string
    color: string
}

export interface ActivityRegister extends ActivityNameRecord {
    thisWeekMinutes: number
    thisMonthMinutes: number
}

export const WEEK_DAYS = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
] as const;

export interface ActivityTrackRecord {
    activityId?: number
    startTime: Date
    stopTime: Date
    activityName: string
    color: string
}
