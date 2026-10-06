import './WeekCalender.css'
import { type ActivityTrackRecord, WEEK_DAYS } from '../types/activity.ts'

const hours = Array.from({ length: 24 }, (_, hour) => hour)
const hourHeight = 56

function formatTime(date: Date): string {
  const formattedHour = String(date.getHours()).padStart(2, '0')
  const formattedMinute = String(date.getMinutes()).padStart(2, '0')

  return `${formattedHour}:${formattedMinute}`
}

function minutesSinceMidnight(date: Date): number {
  return date.getHours() * 60 + date.getMinutes()
}

export function WeekCalender({ activities }: { activities: ActivityTrackRecord[] }) {
  return (
    <section class="week-calendar" aria-label="Weekly calendar">
      <div class="week-calendar__scroll">
        <div class="week-calendar__header" aria-hidden="true">
          <div class="week-calendar__corner"></div>
          {WEEK_DAYS.map((weekDay) => (
            <div class="week-calendar__day-heading" key={weekDay}>
              {weekDay}
            </div>
          ))}
        </div>

        <div class="week-calendar__body">
          <div class="week-calendar__time-axis" aria-hidden="true">
            <div class="week-calendar__time" key="00:00"/>
            {hours.slice(1).map((hour) => (
              <div class="week-calendar__time" key={hour}>
                {`${String(hour).padStart(2, '0')}:00`}
              </div>
            ))}
          </div>

          {WEEK_DAYS.map((weekDay, iWeekDay) => (
            <div class="week-calendar__day" key={weekDay}>
              {hours.map((hour) => (
                <div class="week-calendar__hour" key={hour} />
              ))}
              {activities
                .filter(
                  ({ startTime, stopTime }) =>
                    (startTime.getDay() + 6) % 7 === iWeekDay &&
                    minutesSinceMidnight(stopTime) > minutesSinceMidnight(startTime),
                )
                .map((activity, index) => (
                  <article
                    class="week-calendar__event"
                    data-day={weekDay}
                    key={`${activity.activityName}-${activity.startTime}-${index}`}
                    style={{
                      top: `${(minutesSinceMidnight(activity.startTime) / 60) * hourHeight}px`,
                      height: `${((minutesSinceMidnight(activity.stopTime) - minutesSinceMidnight(activity.startTime)) / 60) * hourHeight}px`,
                      '--event-accent': activity.color,
                    }}
                    aria-label={`${activity.activityName}, ${weekDay}, ${formatTime(activity.startTime)} to ${formatTime(activity.stopTime)}`}
                  >
                    <span class="week-calendar__event-title">
                      {activity.activityName}
                    </span>
                    {minutesSinceMidnight(activity.stopTime) - minutesSinceMidnight(activity.startTime) >= 60 && (
                      <span class="week-calendar__event-time">
                        {formatTime(activity.startTime)} – {formatTime(activity.stopTime)}
                      </span>
                    )}
                  </article>
                ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
