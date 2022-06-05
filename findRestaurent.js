const findRestaurents = (day, time, list) => {
    if (time && day && list.length)
    {
       const result = list.filter(hotel => {
           const isHotelWorking = hotel.hotelWorkingDays[day];
            if (isHotelWorking)
            {
               const time1 = time.split(' ');
               let timeValue = time1[0];
               let isAm = false;
               if (time1[1])
               {
                isAm = time1[1].toLowerCase() == 'am'
               }
             const hotelStartTime = isHotelWorking[0].split(' ');
             const hotelEndTime = isHotelWorking[1].split(' ');
             let hotelStartTimeValue = hotelStartTime[0];
             let hotelStartTimeIsAm = false;
             if (hotelStartTime[1])
             {
                hotelStartTimeIsAm = hotelStartTime[1].toLowerCase() == 'am';
             }

             let hotelEndTimeValue = hotelEndTime[0];
             let hotelEndTimeIsAm = false;
             if (hotelEndTime[1])
             {
                hotelEndTimeIsAm = hotelEndTime[1].toLowerCase() == 'am'
             }
             if (timeValue.indexOf(':'))
             {
                timeValue = timeValue.replace(':', '.');
             }
             if (hotelStartTimeValue.indexOf(':'))
             {
                hotelStartTimeValue = hotelStartTimeValue.replace(':', '.');
             }
             if (hotelEndTimeValue.indexOf(':'))
             {
                hotelEndTimeValue = hotelEndTimeValue.replace(':', '.');
             }
             timeValue = parseFloat(timeValue);
             hotelStartTimeValue = parseFloat(hotelStartTimeValue);
             hotelEndTimeValue = parseFloat(hotelEndTimeValue);

             if (hotelStartTimeIsAm && !hotelEndTimeIsAm)
             {
                hotelEndTimeValue = hotelEndTimeValue + 12;
             }

             if (hotelStartTimeIsAm && hotelEndTimeIsAm)
             {
                 if (hotelEndTimeValue > 11)
                 {
                    hotelEndTimeValue = hotelEndTimeValue + 12;
                 }
                 else
                 {
                    hotelEndTimeValue = hotelEndTimeValue + 24;
                 }
             }

             if (!hotelStartTimeIsAm && hotelEndTimeIsAm)
             {
                if (hotelEndTimeValue > 11)
                 {
                    hotelEndTimeValue = hotelEndTimeValue + 12;
                 }
                 else
                 {
                    hotelEndTimeValue = hotelEndTimeValue + 24;
                 }
                hotelStartTimeValue = hotelStartTimeValue + 12;
             }
             if (!hotelStartTimeIsAm && !hotelEndTimeIsAm)
             {
                hotelEndTimeValue = hotelEndTimeValue + 12;
                hotelStartTimeValue = hotelStartTimeValue + 12;
             }
             
            if (!isAm)
            {
                timeValue = timeValue + 12;
            }
            if (hotelStartTimeValue <= timeValue && hotelEndTimeValue >= timeValue)
            {
                return true;
            }
            }
        });
        return result;
    }
    else
    {
        return [];
    }
};

module.exports = findRestaurents;

