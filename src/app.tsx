import { WeekCalender, type ActivityInterval } from './components/WeekCalender'
import { ActivitySummary } from './components/ActivitySummary'
import './app.css'

const activities: ActivityInterval[] = [
  { weekDay: 'Monday', startMinute: 510, stopMinute: 600, activityName: 'Focus time' },
  { weekDay: 'Monday', startMinute: 630, stopMinute: 690, activityName: 'Team sync' },
  { weekDay: 'Monday', startMinute: 780, stopMinute: 900, activityName: 'Project planning' },
  { weekDay: 'Tuesday', startMinute: 540, stopMinute: 690, activityName: 'Focus time' },
  { weekDay: 'Tuesday', startMinute: 780, stopMinute: 840, activityName: 'Design review' },
  { weekDay: 'Wednesday', startMinute: 480, stopMinute: 540, activityName: 'Weekly planning' },
  { weekDay: 'Wednesday', startMinute: 570, stopMinute: 720, activityName: 'Focus time' },
  { weekDay: 'Wednesday', startMinute: 840, stopMinute: 900, activityName: 'Team sync' },
  { weekDay: 'Thursday', startMinute: 540, stopMinute: 660, activityName: 'Focus time' },
  { weekDay: 'Thursday', startMinute: 690, stopMinute: 750, activityName: 'Research' },
  { weekDay: 'Thursday', startMinute: 840, stopMinute: 960, activityName: 'Project planning' },
  { weekDay: 'Friday', startMinute: 540, stopMinute: 630, activityName: 'Focus time' },
  { weekDay: 'Friday', startMinute: 660, stopMinute: 720, activityName: 'Team sync' },
  { weekDay: 'Saturday', startMinute: 600, stopMinute: 690, activityName: 'Personal project' },
  { weekDay: 'Sunday', startMinute: 960, stopMinute: 1020, activityName: 'Weekly review' },
]

export function App() {
  return (
    <main class="schedule-page">
      <header class="page-header">
        <img src="/logo-time-tracker-pedestal.svg" alt="Time tracker pedestal" />
      </header>
      <div class="schedule-layout">
        <WeekCalender activities={activities} />
        <ActivitySummary />
      </div>
    </main>
  )
}
