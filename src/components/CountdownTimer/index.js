import classNames from 'classnames/bind';
import styles from './CountdownTimer.module.scss';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function CountdownTimer({ initialTime }) {
    const [timeLeft, setTimeLeft] = useState(initialTime);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timer); // Clear interval khi component unmount
        }
    }, [timeLeft]);

    const formatTime = (time) => {
        const days = Math.floor(time / 86400);
        const hours = Math.floor((time % 86400) / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;
        return {
            days: days.toString().padStart(2, '0'),
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0'),
        };
    };

    const formattedTime = formatTime(timeLeft);

    return (
        <div className={cx('countdown')}>
            {timeLeft > 0 ? (
                <div className={cx('time-box')}>
                    <div className={cx('time-day')}>
                        <span>Còn lại</span>
                        <p>{formattedTime.days}</p>
                        <span>Ngày</span>
                    </div>
                    
                    <div className={cx('time-segment')}>
                        <p>{formattedTime.hours}</p>
                    </div>
                    Giờ
                    <div className={cx('time-segment')}>
                        <p>{formattedTime.minutes}</p>
                    </div>
                    Phút
                    <div className={cx('time-segment')}>
                        <p>{formattedTime.seconds}</p>
                    </div>
                    Giây
                </div>
            ) : (
                <p>Hết giờ!</p>
            )}
        </div>
    );
}

export default CountdownTimer;
