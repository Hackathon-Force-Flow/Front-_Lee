import { useMemo, useState } from "react";
import styles from "./officer_dashboard.module.css";
import armyLogo from "../../../assets/appLog/Applogo.svg";
import cardBg from "../../../assets/appLog/setshoot.svg";
import cardOverlay from "../../../assets/appLog/setshoot_2.svg";
import blackBack from "../../../assets/appLog/blackback.svg";
import homeIcon from "../../../assets/appLog/home.svg";
import contactIcon from "../../../assets/appLog/phone.svg";
import scheduleIcon from "../../../assets/appLog/schedule.svg";
import scheduleNameIcon from "../../../assets/appLog/scheduleName.svg";
import alarmIcon from "../../../assets/appLog/alramBar.svg";
import settingIcon from "../../../assets/appLog/settingBar.svg";
import soldierIcon from "../../../assets/appLog/army.svg";
import bellIcon from "../../../assets/appLog/Union.svg";

const YEAR = 2026;

const navItems = [
  { label: "Home", icon: homeIcon, iconOnly: true, combined: true },
  { label: "Contact", icon: contactIcon, iconOnly: true, combined: true },
  { label: "Duty", icon: scheduleNameIcon, active: true, combined: true },
  { label: "Alarm", icon: alarmIcon, combined: true },
  { label: "Setting", icon: settingIcon, combined: true },
];

const monthOptions = Array.from({ length: 12 }, (_, index) => index + 1);

function padDate(value) {
  return String(value).padStart(2, "0");
}

function OfficerDashboard() {
  const [selectedMonth, setSelectedMonth] = useState(6);
  const [selectedDay, setSelectedDay] = useState(27);
  const [openPicker, setOpenPicker] = useState(null);

  const daysInMonth = useMemo(
    () => new Date(YEAR, selectedMonth, 0).getDate(),
    [selectedMonth],
  );

  const dayOptions = useMemo(
    () => Array.from({ length: daysInMonth }, (_, index) => index + 1),
    [daysInMonth],
  );

  const dateValue = `${YEAR}-${padDate(selectedMonth)}-${padDate(selectedDay)}`;
  const displayDate = `${YEAR}.${padDate(selectedMonth)}.${padDate(selectedDay)}`;

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setSelectedDay((day) => Math.min(day, new Date(YEAR, month, 0).getDate()));
    setOpenPicker(null);
  };

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    setOpenPicker(null);
  };

  return (
    <main className={styles.screen}>
      <section className={styles.phone} aria-label="Duty Check">
        <div className={styles.appFrame}>
          <header className={styles.appHeader}>
            <button className={styles.backButton} type="button" aria-label="뒤로가기" />
            <img className={styles.headerCalendar} src={scheduleIcon} alt="" />
            <div className={styles.titleGroup}>
              <h1>Duty Check</h1>
              <p>근무확인</p>
            </div>
            <button className={styles.bellButton} type="button" aria-label="알림">
              <img src={bellIcon} alt="" />
            </button>
          </header>

          <section className={styles.filterBar}>
            <div className={styles.dayCopy}>
              <strong>Day</strong>
              <span>일자설정</span>
            </div>
            <button
              type="button"
              className={styles.selectButton}
              aria-expanded={openPicker === "month"}
              onClick={() => setOpenPicker(openPicker === "month" ? null : "month")}
            >
              {selectedMonth}월
              <span />
            </button>
            <button
              type="button"
              className={styles.selectButton}
              aria-expanded={openPicker === "day"}
              onClick={() => setOpenPicker(openPicker === "day" ? null : "day")}
            >
              {selectedDay}일
              <span />
            </button>

            {openPicker === "month" && (
              <div className={`${styles.dropdown} ${styles.monthDropdown}`}>
                {monthOptions.map((month) => (
                  <button
                    key={month}
                    type="button"
                    className={month === selectedMonth ? styles.selectedOption : ""}
                    onClick={() => handleMonthSelect(month)}
                  >
                    {month}월
                  </button>
                ))}
              </div>
            )}

            {openPicker === "day" && (
              <div className={`${styles.dropdown} ${styles.dayDropdown}`}>
                {dayOptions.map((day) => (
                  <button
                    key={day}
                    type="button"
                    className={day === selectedDay ? styles.selectedOption : ""}
                    onClick={() => handleDaySelect(day)}
                  >
                    {day}일
                  </button>
                ))}
              </div>
            )}
          </section>

          <article className={styles.dutyCard}>
            <div className={styles.photoPanel}>
              <img className={styles.cardPhoto} src={cardBg} alt="" />
              <div className={styles.photoShade} />
              <img className={styles.cardPhotoOverlay} src={cardOverlay} alt="" />
              <img className={styles.blackBackOverlay} src={blackBack} alt="" />
              <img className={styles.soldierIcon} src={soldierIcon} alt="" />
              <strong className={styles.dayNumber}>{selectedDay}일</strong>
              <p className={styles.workInfo}>근무, 출첩번 / 시간, 22:00 - 00:00</p>
            </div>

            <div className={styles.cardFooter}>
              <img src={armyLogo} alt="육군 로고" />
              <time dateTime={dateValue}>{displayDate}</time>
            </div>
          </article>

          <nav className={styles.bottomNav} aria-label="하단 메뉴">
            {navItems.map((item) => (
              <button
                key={item.label}
                type="button"
                className={`${styles.navButton} ${item.active ? styles.active : ""}`}
              >
                <img
                  className={item.combined ? styles.navCombinedIcon : ""}
                  src={item.icon}
                  alt=""
                />
                {!item.combined && !item.iconOnly && <span>{item.label}</span>}
              </button>
            ))}
          </nav>
        </div>
      </section>
    </main>
  );
}

export default OfficerDashboard;
