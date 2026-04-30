import React, { useEffect, useRef, useState } from 'react';

interface DateTimePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (dateTime: string) => void;
  timezone: number;
  initialValue?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  isOpen,
  onClose,
  onSelect,
  timezone,
  initialValue,
}) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedHour, setSelectedHour] = useState<string>('00');
  const [selectedMinute, setSelectedMinute] = useState<string>('00');
  const [selectedSecond, setSelectedSecond] = useState<string>('00');
  const [currentMonth, setCurrentMonth] = useState<number>(
    new Date().getMonth(),
  );
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear(),
  );
  const [todayKey, setTodayKey] = useState<string>('');
  const [viewMode, setViewMode] = useState<'date' | 'time'>('date');

  const buildDateKey = (year: number, month: number, day: number) => {
    return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  };

  const parseInitialValue = (value: string) => {
    const match = value.match(
      /^(\d{4})-(\d{2})-(\d{2})\s+(\d{2}):(\d{2}):(\d{2})$/,
    );

    if (!match) {
      return null;
    }

    const [, year, month, day, hour, minute, second] = match;

    return {
      date: `${year}-${month}-${day}`,
      year: Number(year),
      month: Number(month) - 1,
      hour,
      minute,
      second,
    };
  };

  useEffect(() => {
    if (isOpen) {
      setViewMode('date');
      const timezoneNow = new Date(Date.now() + timezone * 60 * 60 * 1000);
      setTodayKey(
        buildDateKey(
          timezoneNow.getUTCFullYear(),
          timezoneNow.getUTCMonth(),
          timezoneNow.getUTCDate(),
        ),
      );

      if (initialValue) {
        const parsedValue = parseInitialValue(initialValue);

        if (parsedValue) {
          setSelectedDate(parsedValue.date);
          setSelectedHour(parsedValue.hour);
          setSelectedMinute(parsedValue.minute);
          setSelectedSecond(parsedValue.second);
          setCurrentMonth(parsedValue.month);
          setCurrentYear(parsedValue.year);
          return;
        }
      }

      setSelectedDate(
        buildDateKey(
          timezoneNow.getUTCFullYear(),
          timezoneNow.getUTCMonth(),
          timezoneNow.getUTCDate(),
        ),
      );
      setSelectedHour(String(timezoneNow.getUTCHours()).padStart(2, '0'));
      setSelectedMinute(String(timezoneNow.getUTCMinutes()).padStart(2, '0'));
      setSelectedSecond(String(timezoneNow.getUTCSeconds()).padStart(2, '0'));
      setCurrentMonth(timezoneNow.getUTCMonth());
      setCurrentYear(timezoneNow.getUTCFullYear());
    }
  }, [isOpen, initialValue, timezone]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const frameId = window.requestAnimationFrame(() => {
      const dialog = dialogRef.current;

      if (!dialog) {
        return;
      }

      const preferredSelector =
        viewMode === 'date'
          ? '.calendar-day.selected, .calendar-day.current-month'
          : '.time-item.selected';
      const preferredElement =
        dialog.querySelector<HTMLElement>(preferredSelector);
      const fallbackElement = dialog.querySelector<HTMLElement>('button');

      (preferredElement ?? fallbackElement)?.focus();
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [
    isOpen,
    viewMode,
    currentMonth,
    currentYear,
    selectedDate,
    selectedHour,
    selectedMinute,
    selectedSecond,
  ]);

  if (!isOpen) return null;

  const monthNames = [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月',
  ];

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (day: number) => {
    setSelectedDate(buildDateKey(currentYear, currentMonth, day));
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const handlePrevYear = () => {
    setCurrentYear(currentYear - 1);
  };

  const handleNextYear = () => {
    setCurrentYear(currentYear + 1);
  };

  const handleConfirm = () => {
    const dateTimeString = `${selectedDate} ${selectedHour}:${selectedMinute}:${selectedSecond}`;
    onSelect(dateTimeString);
    onClose();
  };

  const handleNow = () => {
    const timezoneNow = new Date(Date.now() + timezone * 60 * 60 * 1000);
    const dateString = buildDateKey(
      timezoneNow.getUTCFullYear(),
      timezoneNow.getUTCMonth(),
      timezoneNow.getUTCDate(),
    );
    const timeString = [
      String(timezoneNow.getUTCHours()).padStart(2, '0'),
      String(timezoneNow.getUTCMinutes()).padStart(2, '0'),
      String(timezoneNow.getUTCSeconds()).padStart(2, '0'),
    ].join(':');

    const dateTimeString = `${dateString} ${timeString}`;

    onSelect(dateTimeString);
    onClose();
  };

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== 'Tab') {
      return;
    }

    const dialog = dialogRef.current;

    if (!dialog) {
      return;
    }

    const focusableElements = Array.from(
      dialog.querySelectorAll<HTMLElement>('button:not([disabled])'),
    );

    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    }

    if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // 获取上个月的最后几天
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const prevMonthDays = getDaysInMonth(prevMonth, prevYear);

    // 添加上个月的日期（灰色显示）
    for (let i = firstDay - 1; i >= 0; i--) {
      const day = prevMonthDays - i;
      days.push(
        <span
          key={`prev-${day}`}
          className="calendar-day prev-month"
          aria-hidden="true"
        >
          {day}
        </span>,
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const dateKey = buildDateKey(currentYear, currentMonth, day);
      const isSelected = selectedDate === dateKey;
      const isToday = todayKey === dateKey;

      days.push(
        <button
          type="button"
          key={day}
          className={`calendar-day current-month ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
          onClick={() => handleDateClick(day)}
          aria-pressed={isSelected}
          aria-current={isToday ? 'date' : undefined}
          aria-label={`${currentYear}年${currentMonth + 1}月${day}日`}
        >
          {day}
        </button>,
      );
    }

    const totalCells = 42; // 6行 x 7列
    const remainingCells = totalCells - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <span
          key={`next-${day}`}
          className="calendar-day next-month"
          aria-hidden="true"
        >
          {day}
        </span>,
      );
    }

    return days;
  };

  const renderTimeSelector = () => {
    const hours = Array.from({ length: 24 }, (_, i) =>
      i.toString().padStart(2, '0'),
    );
    const minutes = Array.from({ length: 60 }, (_, i) =>
      i.toString().padStart(2, '0'),
    );
    const seconds = Array.from({ length: 60 }, (_, i) =>
      i.toString().padStart(2, '0'),
    );

    return (
      <div className="time-selector">
        <div className="time-column">
          <div className="time-header">时</div>
          <div className="time-list">
            {hours.map((hour) => (
              <button
                type="button"
                key={hour}
                className={`time-item ${hour === selectedHour ? 'selected' : ''}`}
                onClick={() => setSelectedHour(hour)}
                aria-pressed={hour === selectedHour}
                aria-label={`选择 ${hour} 时`}
              >
                {hour}
              </button>
            ))}
          </div>
        </div>
        <div className="time-column">
          <div className="time-header">分</div>
          <div className="time-list">
            {minutes.map((minute) => (
              <button
                type="button"
                key={minute}
                className={`time-item ${minute === selectedMinute ? 'selected' : ''}`}
                onClick={() => setSelectedMinute(minute)}
                aria-pressed={minute === selectedMinute}
                aria-label={`选择 ${minute} 分`}
              >
                {minute}
              </button>
            ))}
          </div>
        </div>
        <div className="time-column">
          <div className="time-header">秒</div>
          <div className="time-list">
            {seconds.map((second) => (
              <button
                type="button"
                key={second}
                className={`time-item ${second === selectedSecond ? 'selected' : ''}`}
                onClick={() => setSelectedSecond(second)}
                aria-pressed={second === selectedSecond}
                aria-label={`选择 ${second} 秒`}
              >
                {second}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="datetime-picker-overlay" onClick={onClose}>
      <div
        ref={dialogRef}
        id="datetime-picker-dialog"
        className="datetime-picker"
        role="dialog"
        aria-modal="true"
        aria-labelledby="datetime-picker-title"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleDialogKeyDown}
      >
        {viewMode === 'date' ? (
          <>
            <div className="datetime-picker-header">
              <button
                type="button"
                className="nav-btn"
                onClick={handlePrevYear}
                aria-label="上一年"
              >
                ‹‹
              </button>
              <button
                type="button"
                className="nav-btn"
                onClick={handlePrevMonth}
                aria-label="上个月"
              >
                ‹
              </button>
              <span className="month-year" id="datetime-picker-title">
                {currentYear}年 {monthNames[currentMonth]}
              </span>
              <button
                type="button"
                className="nav-btn"
                onClick={handleNextMonth}
                aria-label="下个月"
              >
                ›
              </button>
              <button
                type="button"
                className="nav-btn"
                onClick={handleNextYear}
                aria-label="下一年"
              >
                ››
              </button>
            </div>

            <div className="datetime-picker-content">
              <div className="calendar-grid">
                <div className="weekdays">
                  {weekDays.map((day) => (
                    <div key={day} className="weekday">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="calendar-body">{renderCalendar()}</div>
              </div>
            </div>

            <div className="picker-tabs">
              <button
                type="button"
                className="tab-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setViewMode('time');
                }}
              >
                选择时间
              </button>
              <button
                type="button"
                className="tab-btn current"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNow();
                }}
              >
                现在
              </button>
              <button
                type="button"
                className="tab-btn confirm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleConfirm();
                }}
              >
                确定
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="time-picker-header">
              <span id="datetime-picker-title">选择时间</span>
            </div>

            <div className="datetime-picker-content">
              {renderTimeSelector()}
            </div>

            <div className="picker-tabs">
              <button
                type="button"
                className="tab-btn"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setViewMode('date');
                }}
              >
                返回日期
              </button>
              <button
                type="button"
                className="tab-btn current"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNow();
                }}
              >
                现在
              </button>
              <button
                type="button"
                className="tab-btn confirm"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleConfirm();
                }}
              >
                确定
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DateTimePicker;
