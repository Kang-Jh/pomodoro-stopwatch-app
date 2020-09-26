import React from 'react';
import TimeDisplay from '../TimeDisplay/TimeDisplay';
import { StudyRecord } from '../../@types/studyRecord';
import './StudyRecordTable.css';

export default function ({ record }: { record: StudyRecord }) {
  return (
    <div>
      <table className="StudyRecordTable-table">
        <caption className="srOnly">교시당 공부시간 및 휴식시간</caption>
        <thead className="srOnly">
          <tr>
            <th scope="col">교시</th>
            <th scope="col">공부시간</th>
            <th scope="col">휴식시간</th>
          </tr>
        </thead>

        <tbody>
          {record.periodRecords.map(
            ({
              period,
              netStudyTimeHours,
              netStudyTimeMinutes,
              netStudyTimeSeconds,
              restTimeHours,
              restTimeMinutes,
              restTimeSeconds,
            }) => (
              <tr key={period}>
                <td>{period}</td>

                <td>
                  <TimeDisplay
                    hours={netStudyTimeHours as number}
                    minutes={netStudyTimeMinutes as number}
                    seconds={netStudyTimeSeconds as number}
                  />
                </td>

                {/* restTime_hours가 undefined가 아니면 나머지 restTime들도 undefined가 아니므로 restTime_hours만 사용 */}
                {restTimeHours !== undefined && (
                  <td>
                    <TimeDisplay
                      hours={restTimeHours}
                      minutes={restTimeMinutes as number}
                      seconds={restTimeSeconds as number}
                    />
                  </td>
                )}
              </tr>
            )
          )}
        </tbody>

        <tfoot>
          <tr>
            <th scope="row" className="srOnly">
              총합
            </th>

            <td>
              {record.periodRecords.length === 0
                ? null
                : record.periodRecords.length}
            </td>

            {(record.totalStudyTime.hours !== 0 ||
              record.totalStudyTime.minutes !== 0 ||
              record.totalStudyTime.seconds !== 0) && (
              <td>
                <TimeDisplay
                  hours={record.totalStudyTime.hours}
                  minutes={record.totalStudyTime.minutes}
                  seconds={record.totalStudyTime.seconds}
                />
              </td>
            )}
            {/* 총 휴식시간이 0이 아닐 때만 총 휴식시간을 화면에 렌더링 */}
            {(record.totalRestTime.hours !== 0 ||
              record.totalRestTime.minutes !== 0 ||
              record.totalRestTime.seconds !== 0) && (
              <td>
                <TimeDisplay
                  hours={record.totalRestTime.hours}
                  minutes={record.totalRestTime.minutes}
                  seconds={record.totalRestTime.seconds}
                />
              </td>
            )}
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
