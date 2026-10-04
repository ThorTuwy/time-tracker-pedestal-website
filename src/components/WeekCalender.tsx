import './WeekCalender.css'

export type WeekDay =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

export interface ActivityInterval {
  weekDay: WeekDay
  startMinute: number
  stopMinute: number
  activityName: string
}

interface WeekCalenderProps {
  activities: ActivityInterval[]
}

const weekDays: WeekDay[] = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
]

const hours = Array.from({ length: 24 }, (_, hour) => hour)
const hourHeight = 56

function formatTime(minutes: number)  {
  const formattedHour = Math.floor(minutes / 60)
  const formattedMinute = minutes % 60

  return `${String(formattedHour).padStart(2, '0')}:${String(formattedMinute).padStart(2, '0')}`
}

export function WeekCalender({ activities }: WeekCalenderProps) {
  return (
    <section class="week-calendar" aria-label="Weekly calendar">
      <div class="week-calendar__scroll">
        <div class="week-calendar__header" aria-hidden="true">
          <div class="week-calendar__corner"></div>
          {weekDays.map((weekDay) => (
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

          {weekDays.map((weekDay) => (
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
                    stopMinute <= 1440 &&
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
