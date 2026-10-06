import { WeekCalender } from './components/WeekCalender'
import { ActivitySummary } from './components/ActivitySummary'
import { useEffect, useState } from 'preact/hooks'
import './app.css'
import { WEEK_DAYS, type ActivityRegister, type ActivityTrackRecord } from './types/activity.ts'
import { parseActivityCalenderBuffer, parseActivityNameBuffer } from './utils/low-level-parser.ts'
import { getActivityRegister, parseRawActivityCalender, parseRawActivityNameRecords } from './utils/record-parser.ts'

async function fetchBinaryAsset(fileName: string, signal: AbortSignal): Promise<ArrayBuffer> {
  const response = await fetch(`${import.meta.env.BASE_URL}${fileName}`, { signal })
  if (!response.ok) {
    throw new Error(`Failed to load ${fileName}: ${response.status}`)
  }
  return response.arrayBuffer()
}

type ActivityChanges = Partial<Pick<ActivityRegister, 'name' | 'color'>>

function dateAtTime(weekDay: typeof WEEK_DAYS[number], hour: number, minute = 0) {
  return new Date(2000, 0, 3 + WEEK_DAYS.indexOf(weekDay), hour, minute)
}

const activities: ActivityTrackRecord[] = [
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

export function App() {
  const [calendarActivities, setCalendarActivities] = useState(activities)
  const [activityRegisters, setActivityRegisters] = useState<ActivityRegister[]>([])

  useEffect(() => {
    const controller = new AbortController()

    Promise.all([
      fetchBinaryAsset('history.bin', controller.signal),
      fetchBinaryAsset('names.bin', controller.signal).catch((error: unknown) => {
        if (!controller.signal.aborted) {
          console.error('Failed to load activity names:', error)
        }
        return new ArrayBuffer(0)
      }),
    ])
      .then(([historyBuffer, activityNamesBuffer]) => {
        const activityNames = parseRawActivityNameRecords(parseActivityNameBuffer(activityNamesBuffer))
        const rawTrackRecords = parseActivityCalenderBuffer(historyBuffer)
        const tracks = parseRawActivityCalender(rawTrackRecords, activityNames)
        setCalendarActivities([...tracks])
        setActivityRegisters(getActivityRegister(activityNames, tracks))
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          console.error('Failed to load activity history:', error)
        }
      })

    return () => controller.abort()
  }, [])

  function updateActivity(id: number, previousName: string, changes: ActivityChanges) {
    setActivityRegisters((current) => current.map((activity) =>
      activity.id === id ? { ...activity, ...changes } : activity,
    ))
    setCalendarActivities((current) => current.map((activity) => {
      const isMatchingActivity = activity.activityId === id ||
        (activity.activityId === undefined && activity.activityName === previousName)
      if (!isMatchingActivity) return activity

      return {
        ...activity,
        ...(changes.name !== undefined ? { activityName: changes.name } : {}),
        ...(changes.color !== undefined ? { color: changes.color } : {}),
      }
    }))
  }

  return (
    <main class="schedule-page">
      <header class="page-header">
        <img src="/logo-time-tracker-pedestal.svg" alt="Time tracker pedestal" />
      </header>
      <div class="schedule-layout">
        <WeekCalender activities={calendarActivities} />
        <ActivitySummary activityRegisters={activityRegisters} onActivityChange={updateActivity} />
      </div>
    </main>
  )
}
