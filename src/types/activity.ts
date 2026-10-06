export interface ActivityRegister {
    id: number
    name: string
    color: string
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
    startTime: Date
    stopTime: Date
    activityName: string
    color: string
}
