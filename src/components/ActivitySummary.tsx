import { useEffect, useState } from 'preact/hooks'
import Compact from '@uiw/react-color-compact'
import './ActivitySummary.css'
import type { ActivityRegister } from '../types/activity.ts'
import {serializeActivityNameRecords} from "../utils/serializer.ts";

const activityColors = [
  '#56d879',
  '#d69d55',
  '#76a7ff',
  '#d6c35b',
  '#ef8295',
  '#59d8cf',
  '#bd91f5',
  '#f27777',
]

const initialActivities: ActivityRegister[] = [
  { id: 1, name: 'Focus time', color: activityColors[0], thisWeekMinutes: 450, thisMonthMinutes: 1695 },
  { id: 2, name: 'Team sync', color: activityColors[1], thisWeekMinutes: 150, thisMonthMinutes: 540 },
  { id: 3, name: 'Project planning', color: activityColors[2], thisWeekMinutes: 240, thisMonthMinutes: 750 },
  { id: 4, name: 'Design review', color: activityColors[3], thisWeekMinutes: 60, thisMonthMinutes: 330 },
  { id: 5, name: 'Research', color: activityColors[4], thisWeekMinutes: 60, thisMonthMinutes: 360 },
  { id: 6, name: 'Personal project', color: activityColors[5], thisWeekMinutes: 90, thisMonthMinutes: 270 },
]

function formatDuration(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  return `${hours}h ${String(remainingMinutes).padStart(2, '0')}m`
}

export function ActivitySummary({
  activityRegisters,
  onActivityChange,
}: {
  activityRegisters: ActivityRegister[]
  onActivityChange: (
    id: number,
    previousName: string,
    changes: Partial<Pick<ActivityRegister, 'name' | 'color'>>,
  ) => void
}) {
  const [activities, setActivities] = useState(initialActivities)
  const [openColorPickerId, setOpenColorPickerId] = useState<number | null>(null)
  const [isDirty, setIsDirty] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)

  useEffect(() => {
    if (activityRegisters.length > 0) {
      setActivities(activityRegisters)
    }
  }, [activityRegisters])

  function updateActivityName(id: number, name: string) {
    const previousName = activities.find((activity) => activity.id === id)?.name ?? ''
    setActivities((currentActivities) =>
      currentActivities.map((activity) =>
        activity.id === id ? { ...activity, name } : activity,
      ),
    )
    onActivityChange(id, previousName, { name })
    setIsDirty(true)
    setSaveError(null)
  }

  function updateActivityColor(id: number, color: string) {
    const previousName = activities.find((activity) => activity.id === id)?.name ?? ''
    setActivities((currentActivities) =>
      currentActivities.map((activity) =>
        activity.id === id ? { ...activity, color } : activity,
      ),
    )
    onActivityChange(id, previousName, { color })
    setIsDirty(true)
    setSaveError(null)
  }

  async function saveActivities() {
    setIsSaving(true)
    setSaveError(null)
    setOpenColorPickerId(null)

    try {
      const response = await fetch(`${import.meta.env.BASE_URL}replaceRegister`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/octet-stream' },
        body: serializeActivityNameRecords(activities),
      })
      if (!response.ok) {
        throw new Error(`Save failed: ${response.status}`)
      }
      setIsDirty(false)
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Failed to save activities')
    } finally {
      setIsSaving(false)
    }
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
                  <div class="activity-summary__activity">
                    <div class="activity-summary__activity-details">
                      <button
                        aria-label={`Choose color for ${activity.name || 'unnamed'}`}
                        aria-expanded={openColorPickerId === activity.id}
                        class="activity-summary__color"
                        disabled={isSaving}
                        onClick={() => setOpenColorPickerId(
                          openColorPickerId === activity.id ? null : activity.id,
                        )}
                        style={{ backgroundColor: activity.color }}
                        type="button"
                      />
                      <input
                        aria-label={`Activity name: ${activity.name || 'unnamed'}`}
                        class="activity-summary__name"
                        disabled={isSaving}
                        onInput={(event) => updateActivityName(activity.id, event.currentTarget.value)}
                        value={activity.name}
                      />
                    </div>
                    {openColorPickerId === activity.id && (
                        <Compact
                            aria-label={`Choose color for ${activity.name || 'unnamed'}`}
                            className="activity-summary__palette"
                            color={activity.color}
                            onChange={(color) => updateActivityColor(activity.id, color.hex)}
                            style={{boxSizing: 'content-box'}}
                        />
                    )}
                  </div>
                </td>
                <td>{formatDuration(activity.thisWeekMinutes)}</td>
                <td>{formatDuration(activity.thisMonthMinutes)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div class="activity-summary__actions">
        {saveError && <span class="activity-summary__save-error" role="alert">{saveError}</span>}
        <button
          class="activity-summary__save"
          disabled={!isDirty || isSaving}
          onClick={saveActivities}
          type="button"
        >
          {isSaving ? 'Saving...' : 'Save'}
        </button>
      </div>
    </section>
  )
}
