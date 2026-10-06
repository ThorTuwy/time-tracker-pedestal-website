import { useState } from 'preact/hooks'
import './ActivitySummary.css'

interface ActivitySummaryRow {
  id: number
  name: string
  thisWeek: string
  thisMonth: string
}

const initialActivities: ActivitySummaryRow[] = [
  { id: 1, name: 'Focus time', thisWeek: '7h 30m', thisMonth: '28h 15m' },
  { id: 2, name: 'Team sync', thisWeek: '2h 30m', thisMonth: '9h 00m' },
  { id: 3, name: 'Project planning', thisWeek: '4h 00m', thisMonth: '12h 30m' },
  { id: 4, name: 'Design review', thisWeek: '1h 00m', thisMonth: '5h 30m' },
  { id: 5, name: 'Research', thisWeek: '1h 00m', thisMonth: '6h 00m' },
  { id: 6, name: 'Personal project', thisWeek: '1h 30m', thisMonth: '4h 30m' },
]

export function ActivitySummary() {
  const [activities, setActivities] = useState(initialActivities)

  function updateActivityName(id: number, name: string) {
    setActivities((currentActivities) =>
      currentActivities.map((activity) =>
        activity.id === id ? { ...activity, name } : activity,
      ),
    )
  }

  return (
    <section class="activity-summary" aria-labelledby="activity-summary-title">
      <h2 class="activity-summary__title" id="activity-summary-title">
        Activity totals
      </h2>
      <div class="activity-summary__scroll">
        <table class="activity-summary__table">
          <thead>
            <tr>
              <th scope="col">Activity</th>
              <th scope="col">This week</th>
              <th scope="col">This month</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity) => (
              <tr key={activity.id}>
                <td>
                  <input
                    aria-label={`Activity name: ${activity.name || 'unnamed'}`}
                    class="activity-summary__name"
                    onInput={(event) => updateActivityName(activity.id, event.currentTarget.value)}
                    value={activity.name}
                  />
                </td>
                <td>{activity.thisWeek}</td>
                <td>{activity.thisMonth}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
