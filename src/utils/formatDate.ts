export function formatTimeAgo(date: Date | string): string {
    const now = new Date();
    const past = new Date(date);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    const intervals: { [key: string]: number } = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1
    };

    let counter;
    for (const interval in intervals) {
        counter = Math.floor(diffInSeconds / intervals[interval]);
        if (counter > 0) {
            if (counter === 1) {
                return `${counter} ${interval} ago`;
            } else {
                return `${counter} ${interval}s ago`;
            }
        }
    }
    return 'just now';
}
