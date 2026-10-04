import { WeekCalender, type ActivityInterval } from './components/WeekCalender'
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

const scheduledHours = activities.reduce(
  (total, activity) => total + activity.stopMinute - activity.startMinute,
  0,
) / 60

export function App() {
  return (
    <main class="schedule-page">
      <header class="page-header">
        <a class="brand" href="#week" aria-label="Tempo home">
          <span class="brand-mark" aria-hidden="true">t</span>
          <span>tempo</span>
        </a>
        <span class="header-note">Make room for what matters.</span>
      </header>

      <section class="week-section" id="week">
        <div class="week-intro">
          <div>
            <p class="eyebrow">YOUR TIME, IN VIEW</p>
            <h1>Week at a glance</h1>
            <p class="week-description">
              A little structure for a more focused week.
            </p>
          </div>
          <div class="week-summary" aria-label={`${activities.length} activities, ${scheduledHours} scheduled hours`}>
            <span class="summary-value">{activities.length}</span>
            <span class="summary-label">activities</span>
            <span class="summary-divider" aria-hidden="true" />
            <span class="summary-value">{scheduledHours}h</span>
            <span class="summary-label">scheduled</span>
          </div>
        </div>

        <WeekCalender activities={activities} />
        <p class="calendar-hint">Scroll horizontally to see every day on smaller screens.</p>
      </section>
    </main>
  )
}
