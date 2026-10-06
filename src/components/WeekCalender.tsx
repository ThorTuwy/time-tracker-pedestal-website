import './WeekCalender.css'
import {type ActivityTrackRecord, WEEK_DAYS, type WeekDay} from "../types/activity.ts";

const hours = Array.from({ length: 24 }, (_, hour) => hour)
const hourHeight = 56

function formatTime(minutes: number)  {
  const formattedHour = Math.floor(minutes / 60)
  const formattedMinute = minutes % 60

  return `${String(formattedHour).padStart(2, '0')}:${String(formattedMinute).padStart(2, '0')}`
}

export function WeekCalender({ activities }: { activities: ActivityTrackRecord[] }) {
  return (
    <section class="week-calendar" aria-label="Weekly calendar">
      <div class="week-calendar__scroll">
        <div class="week-calendar__header" aria-hidden="true">
          <div class="week-calendar__corner"></div>
          {WEEK_DAYS.map((weekDay:WeekDay) => (
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
                {formatTime(hour * 60)}
              </div>
            ))}
          </div>

          {WEEK_DAYS.map((weekDay:WeekDay) => (
            <div class="week-calendar__day" key={weekDay}>
              {hours.map((hour) => (
                <div class="week-calendar__hour" key={hour} />
              ))}
              {activities
                .filter(
                  ({ weekDay: activityDay, startMinute, stopMinute }) =>
                    activityDay === weekDay &&
                    Number.isFinite(startMinute) &&
                    Number.isFinite(stopMinute) &&
                    startMinute >= 0 &&
                    stopMinute <= 24*60 &&
                    stopMinute > startMinute,
                )
                .map((activity, index) => (
                  <article
                    class="week-calendar__event"
                    data-day={weekDay}
                    key={`${activity.activityName}-${activity.startMinute}-${index}`}
                    style={{
                      top: `${(activity.startMinute / 60) * hourHeight}px`,
                      height: `${((activity.stopMinute - activity.startMinute) / 60) * hourHeight}px`,
                      '--event-accent': activity.color,
                    }}
                    aria-label={`${activity.activityName}, ${weekDay}, ${formatTime(activity.startMinute)} to ${formatTime(activity.stopMinute)}`}
                  >
                    <span class="week-calendar__event-title">
                      {activity.activityName}
                    </span>
                    {activity.stopMinute - activity.startMinute >= 60 && (
                      <span class="week-calendar__event-time">
                        {formatTime(activity.startMinute)} – {formatTime(activity.stopMinute)}
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
