import { WeekCalender } from './components/WeekCalender'
import { ActivitySummary } from './components/ActivitySummary'
import { useEffect, useState } from 'preact/hooks'
import './app.css'
import { type ActivityRegister, type ActivityTrackRecord } from './types/activity.ts'
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

export function App() {
  const [calendarActivities, setCalendarActivities] = useState<ActivityTrackRecord[]>([])
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
