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

export type WeekDay = typeof WEEK_DAYS[number];

export interface ActivityTrackRecord {
    weekDay: WeekDay
    startMinute: number
    stopMinute: number
    activityName: string
    color: string
}
