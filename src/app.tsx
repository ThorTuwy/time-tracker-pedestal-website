import { WeekCalender, type ActivityInterval } from './components/WeekCalender'
import { ActivitySummary } from './components/ActivitySummary'
import './app.css'

const activities: ActivityInterval[] = [
  { weekDay: 'Monday', startMinute: 510, stopMinute: 600, activityName: 'Focus time', color: '#56d879' },
  { weekDay: 'Monday', startMinute: 630, stopMinute: 690, activityName: 'Team sync', color: '#d69d55' },
  { weekDay: 'Monday', startMinute: 780, stopMinute: 900, activityName: 'Project planning', color: '#76a7ff' },
  { weekDay: 'Tuesday', startMinute: 540, stopMinute: 690, activityName: 'Focus time', color: '#56d879' },
  { weekDay: 'Tuesday', startMinute: 780, stopMinute: 840, activityName: 'Design review', color: '#d6c35b' },
  { weekDay: 'Wednesday', startMinute: 480, stopMinute: 540, activityName: 'Weekly planning', color: '#bd91f5' },
  { weekDay: 'Wednesday', startMinute: 570, stopMinute: 720, activityName: 'Focus time', color: '#56d879' },
  { weekDay: 'Wednesday', startMinute: 840, stopMinute: 900, activityName: 'Team sync', color: '#d69d55' },
  { weekDay: 'Thursday', startMinute: 540, stopMinute: 660, activityName: 'Focus time', color: '#56d879' },
  { weekDay: 'Thursday', startMinute: 690, stopMinute: 750, activityName: 'Research', color: '#ef8295' },
  { weekDay: 'Thursday', startMinute: 840, stopMinute: 960, activityName: 'Project planning', color: '#76a7ff' },
  { weekDay: 'Friday', startMinute: 540, stopMinute: 630, activityName: 'Focus time', color: '#56d879' },
  { weekDay: 'Friday', startMinute: 660, stopMinute: 720, activityName: 'Team sync', color: '#d69d55' },
  { weekDay: 'Saturday', startMinute: 600, stopMinute: 690, activityName: 'Personal project', color: '#59d8cf' },
  { weekDay: 'Sunday', startMinute: 960, stopMinute: 1020, activityName: 'Weekly review', color: '#bd91f5' },
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
