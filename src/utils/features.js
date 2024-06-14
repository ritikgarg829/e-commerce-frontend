export const getLastMonths = () => {
    const currentDate = new Date();
    currentDate.setDate(1);

    const last6Months = [];
    const last12Months = [];

    for (let i = 0; i < 6; i++) {
        const monthDate = new Date(currentDate.getTime() - i * 30 * 24 * 60 * 60 * 1000);
        const monthName = monthDate.toLocaleString('default', { month: 'long' });
        last6Months.unshift(monthName);
    }

    for (let i = 0; i < 12; i++) {
        const monthDate = new Date(currentDate.getTime() - i * 30 * 24 * 60 * 60 * 1000);
        const monthName = monthDate.toLocaleString('default', { month: 'long' });
        last12Months.unshift(monthName);
    }

    return {
        last12Months,
        last6Months,
    };
};