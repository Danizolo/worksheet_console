import Constants from './Constants'


const Functions = {
    daysInMonth: (month, Year, temp) => {
        return new Date(Year, month + 1, temp).getDate();
    },

    workSheetDate: (param, currentYear, currentMonth, workedDays) => {
        if (param === 'date') {
            var isoDateString = new Date(currentYear, currentMonth, workedDays).toLocaleDateString("en-US", Constants.dateOptions);
            return isoDateString;

        } else if (param === 'day') {
            var isoDateString = new Date(currentYear, currentMonth, workedDays).toLocaleDateString("en-US", Constants.dayOptions);
            return isoDateString;

        }
    }

}

export { Functions }
