import {type ActivityTrackRecord, WEEK_DAYS} from "../types/activity.ts";

function dateAtTime(weekDay: typeof WEEK_DAYS[number], hour: number, minute = 0) {
    return new Date(2000, 0, 3 + WEEK_DAYS.indexOf(weekDay), hour, minute)
}
export const activities: ActivityTrackRecord[] = [
    { startTime: dateAtTime('Monday', 8, 30), stopTime: dateAtTime('Monday', 10), activityName: 'Focus time', color: '#56d879' },
    { startTime: dateAtTime('Monday', 10, 30), stopTime: dateAtTime('Monday', 11, 30), activityName: 'Team sync', color: '#d69d55' },
    { startTime: dateAtTime('Monday', 13), stopTime: dateAtTime('Monday', 15), activityName: 'Project planning', color: '#76a7ff' },
    { startTime: dateAtTime('Tuesday', 9), stopTime: dateAtTime('Tuesday', 11, 30), activityName: 'Focus time', color: '#56d879' },
    { startTime: dateAtTime('Tuesday', 13), stopTime: dateAtTime('Tuesday', 14), activityName: 'Design review', color: '#d6c35b' },
    { startTime: dateAtTime('Wednesday', 8), stopTime: dateAtTime('Wednesday', 9), activityName: 'Weekly planning', color: '#bd91f5' },
    { startTime: dateAtTime('Wednesday', 9, 30), stopTime: dateAtTime('Wednesday', 12), activityName: 'Focus time', color: '#56d879' },
    { startTime: dateAtTime('Wednesday', 14), stopTime: dateAtTime('Wednesday', 15), activityName: 'Team sync', color: '#d69d55' },
    { startTime: dateAtTime('Thursday', 9), stopTime: dateAtTime('Thursday', 11), activityName: 'Focus time', color: '#56d879' },
    { startTime: dateAtTime('Thursday', 11, 30), stopTime: dateAtTime('Thursday', 12, 30), activityName: 'Research', color: '#ef8295' },
    { startTime: dateAtTime('Thursday', 14), stopTime: dateAtTime('Thursday', 16), activityName: 'Project planning', color: '#76a7ff' },
    { startTime: dateAtTime('Friday', 9), stopTime: dateAtTime('Friday', 10, 30), activityName: 'Focus time', color: '#56d879' },
    { startTime: dateAtTime('Friday', 11), stopTime: dateAtTime('Friday', 12), activityName: 'Team sync', color: '#d69d55' },
    { startTime: dateAtTime('Saturday', 10), stopTime: dateAtTime('Saturday', 11, 30), activityName: 'Personal project', color: '#59d8cf' },
    { startTime: dateAtTime('Sunday', 16), stopTime: dateAtTime('Sunday', 17), activityName: 'Weekly review', color: '#bd91f5' },
]