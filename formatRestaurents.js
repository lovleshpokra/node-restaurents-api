const week = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const formatRestaurents = (rawList) => {
    return rawList.map(hotel => {
        const hotelWeekDays = {};
        const r = hotel;
        const multipleDurations = r.Timings.split('/');
        multipleDurations.map(duration => {
            let d = duration.trim();
            d = d.split(' ');
            if (d && d.length)
            {
                let timings = duration.trim().split('-');
                let onlyTime = [];
                const lastString = timings[timings.length - 1].trim();
                let secLastString = timings[timings.length - 2].trim();
                secLastString = secLastString.split(' ');
                onlyTime = [secLastString[secLastString.length - 2], secLastString[secLastString.length - 1]]
                secLastString = onlyTime.join(' ');
                d.map(durationDays => {
                    let isWeekStarted = false;
                    if (durationDays.indexOf('-') && durationDays.length > 1)
                    {
                        const indivisualDays = durationDays.split('-');
                        week.map(weekDay => {
                            if (indivisualDays[1] == weekDay)
                            {
                                hotelWeekDays[weekDay] = [secLastString, lastString];
                                isWeekStarted = false;
                            }

                            if (isWeekStarted)
                            {
                                hotelWeekDays[weekDay] = [secLastString, lastString];
                            }
                            
                            if (indivisualDays[0] == weekDay)
                            {
                                hotelWeekDays[weekDay] = [secLastString, lastString];
                                isWeekStarted = true;
                            }
                        })
                    }
                    else
                    {
                        week.map(weekDay => {
                            if (durationDays.indexOf(weekDay) > 0)
                            {
                                hotelWeekDays[weekDay] = [secLastString, lastString];
                            }
                        });
                    }
                });
            }
        });
        r.hotelWorkingDays = hotelWeekDays;
        return r;
    });
}

module.exports = formatRestaurents;