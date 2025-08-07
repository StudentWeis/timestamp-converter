import React, { useState, useEffect } from 'react';

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
  initialValue 
}) => {
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedHour, setSelectedHour] = useState<string>('00');
  const [selectedMinute, setSelectedMinute] = useState<string>('00');
  const [selectedSecond, setSelectedSecond] = useState<string>('00');
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState<number>(new Date().getFullYear());
  const [viewMode, setViewMode] = useState<'date' | 'time'>('date');

  useEffect(() => {
    if (isOpen) {
      // 初始化日期和时间，考虑时区偏移
      const now = new Date();
      const offsetMinutes = timezone * 60; // 将小时转换为分钟
      const adjustedTime = new Date(now.getTime() + offsetMinutes * 60 * 1000);
      
      if (initialValue) {
        try {
          const parsed = new Date(initialValue);
          if (!isNaN(parsed.getTime())) {
            setSelectedDate(parsed.toISOString().split('T')[0]);
            const timeStr = parsed.toTimeString().slice(0, 8).split(':');
            setSelectedHour(timeStr[0]);
            setSelectedMinute(timeStr[1]);
            setSelectedSecond(timeStr[2]);
            setCurrentMonth(parsed.getMonth());
            setCurrentYear(parsed.getFullYear());
            return;
          }
        } catch (error) {
          console.error('Error parsing initial value:', error);
        }
      }
      
      setSelectedDate(adjustedTime.toISOString().split('T')[0]);
      const timeStr = adjustedTime.toTimeString().slice(0, 8).split(':');
      setSelectedHour(timeStr[0]);
      setSelectedMinute(timeStr[1]);
      setSelectedSecond(timeStr[2]);
      setCurrentMonth(adjustedTime.getMonth());
      setCurrentYear(adjustedTime.getFullYear());
    }
  }, [isOpen, initialValue, timezone]);

  if (!isOpen) return null;

  const monthNames = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ];

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay();
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentYear, currentMonth, day);
    const dateString = date.toISOString().split('T')[0];
    console.log('Selected date:', dateString); // 调试用
    setSelectedDate(dateString);
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
    console.log('Selected datetime:', dateTimeString); // 调试用
    onSelect(dateTimeString);
    onClose();
  };

  const handleNow = () => {
    console.log('handleNow clicked!'); // 调试用
    const now = new Date();
    
    console.log('Current UTC time:', now); // 调试用
    console.log('Timezone offset hours:', timezone); // 调试用
    
    // 获取当前时区的时间
    // 注意：我们需要显示指定时区的当前时间，而不是UTC+偏移
    const utcTime = now.getTime();
    const offsetMilliseconds = timezone * 60 * 60 * 1000;
    const localTimeInTimezone = new Date(utcTime + offsetMilliseconds);
    
    console.log('Local time in selected timezone:', localTimeInTimezone); // 调试用
    
    // 使用时区调整后的时间来构造日期时间字符串
    const year = localTimeInTimezone.getUTCFullYear();
    const month = String(localTimeInTimezone.getUTCMonth() + 1).padStart(2, '0');
    const day = String(localTimeInTimezone.getUTCDate()).padStart(2, '0');
    const hours = String(localTimeInTimezone.getUTCHours()).padStart(2, '0');
    const minutes = String(localTimeInTimezone.getUTCMinutes()).padStart(2, '0');
    const seconds = String(localTimeInTimezone.getUTCSeconds()).padStart(2, '0');
    
    const dateString = `${year}-${month}-${day}`;
    const timeString = `${hours}:${minutes}:${seconds}`;
    const dateTimeString = `${dateString} ${timeString}`;
    
    console.log('Final datetime string for timezone:', dateTimeString); // 调试用
    
    // 直接调用确认并关闭
    onSelect(dateTimeString);
    onClose();
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
        <div key={`prev-${day}`} className="calendar-day prev-month">
          {day}
        </div>
      );
    }

    // 当月天数
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentYear, currentMonth, day);
      const isSelected = selectedDate === date.toISOString().split('T')[0];
      const isToday = new Date().toDateString() === date.toDateString();

      days.push(
        <div
          key={day}
          className={`calendar-day ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
          onClick={() => handleDateClick(day)}
        >
          {day}
        </div>
      );
    }
    
    // 添加下个月的前几天（灰色显示）
    const totalCells = 42; // 6行 x 7列
    const remainingCells = totalCells - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push(
        <div key={`next-${day}`} className="calendar-day next-month">
          {day}
        </div>
      );
    }

    return days;
  };

  const renderTimeSelector = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
    const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));
    const seconds = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

    return (
      <div className="time-selector">
        <div className="time-column">
          <div className="time-header">时</div>
          <div className="time-list">
            {hours.map(hour => (
              <div
                key={hour}
                className={`time-item ${hour === selectedHour ? 'selected' : ''}`}
                onClick={() => setSelectedHour(hour)}
              >
                {hour}
              </div>
            ))}
          </div>
        </div>
        <div className="time-column">
          <div className="time-header">分</div>
          <div className="time-list">
            {minutes.map(minute => (
              <div
                key={minute}
                className={`time-item ${minute === selectedMinute ? 'selected' : ''}`}
                onClick={() => setSelectedMinute(minute)}
              >
                {minute}
              </div>
            ))}
          </div>
        </div>
        <div className="time-column">
          <div className="time-header">秒</div>
          <div className="time-list">
            {seconds.map(second => (
              <div
                key={second}
                className={`time-item ${second === selectedSecond ? 'selected' : ''}`}
                onClick={() => setSelectedSecond(second)}
              >
                {second}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="datetime-picker-overlay" onClick={onClose}>
      <div className="datetime-picker" onClick={(e) => e.stopPropagation()}>
        {viewMode === 'date' ? (
          <>
            <div className="datetime-picker-header">
              <button className="nav-btn" onClick={handlePrevYear}>‹‹</button>
              <button className="nav-btn" onClick={handlePrevMonth}>‹</button>
              <span className="month-year">{currentYear}年 {monthNames[currentMonth]}</span>
              <button className="nav-btn" onClick={handleNextMonth}>›</button>
              <button className="nav-btn" onClick={handleNextYear}>››</button>
            </div>
            
            <div className="calendar-grid">
              <div className="weekdays">
                {weekDays.map(day => (
                  <div key={day} className="weekday">{day}</div>
                ))}
              </div>
              <div className="calendar-body">
                {renderCalendar()}
              </div>
            </div>
            
            <div className="picker-tabs">
              <button 
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
              <span>选择时间</span>
            </div>
            
            {renderTimeSelector()}
            
            <div className="picker-tabs">
              <button 
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
