import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { getSeminarCalendar } from '../../service';
import CalendarView from '../../components/calendar';
import Loading from '../../components/loading';
import type { SeminarBase } from '../../types';

interface Props {
  title: string;
}

const height = 'calc(100vh - 203px)';

function Calendar(props: Props): JSX.Element {
  const [loading, setLoading] = useState(true);
  const [year, setYear] = useState(dayjs().year());
  const [month, setMonth] = useState(dayjs().month());
  const [events, setEvents] = useState<Record<string, SeminarBase[]>>({});
  const router = useRouter();
  const { school } = router.query as { school: string };
  const handleChange = (year: number, month: number) => {
    setYear(year);
    setMonth(month);
  };

  useEffect(() => {
    setLoading(true);
    getSeminarCalendar({
      year,
      month: month + 1,
      school,
    })
      .then(setEvents)
      .finally(() => setLoading(false));
  }, [year, month, school]);

  return loading ? (
    <Loading height={height} />
  ) : (
    <CalendarView school={school} year={year} month={month} events={events} onChange={handleChange} />
  );
}

export function getServerSideProps(): { props: Props } {
  return {
    props: {
      title: '宣讲会日历',
    },
  };
}

export default Calendar;
