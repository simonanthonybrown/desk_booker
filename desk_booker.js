var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Desk = /** @class */ (function () {
    function Desk(Id, ByWindow) {
        this.Id = Id;
        this.ByWindow = ByWindow;
    }
    return Desk;
}());
var DeskBooking = /** @class */ (function () {
    function DeskBooking(bookedDesk, bookingDate, firstName, lastName) {
        this.bookedDesk = bookedDesk;
        this.bookingDate = bookingDate;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    return DeskBooking;
}());
function addDays(date, days) {
    // Function to add a specified number of days to a date
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
// function DeskCheck(startDate: Date, bookingArray: Array<DeskBooking>): Date {
//   // Function for use in DeskNextAvailable and WindowDeskNextAvaiable.
//   // Takes the start date and desk booking array and checks when the
//   // next non-booked date is from the start date given.
//   // Array to contain all dates for current desk bookings
//   var bookedDates = [];
//   // Iterate through bookings and add all dates to array
//   for (var booking of bookingArray) {
//     bookedDates.push(booking.bookingDate);
//   }
//   // Create new array with only unique dates
//   let uniqueDeskBookings = bookedDates
//     .map(function (date) {
//       return date.getTime();
//     })
//     .filter(function (date, i, array) {
//       return array.indexOf(date) === i;
//     })
//     .map(function (time) {
//       return new Date(time);
//     });
//   console.log(uniqueDeskBookings);
//   // Check if any current bookings are for the start date given
//   var bookingWithStartDate = uniqueDeskBookings.some(
//     (bookingDate) => bookingDate.getTime() === startDate.getTime()
//   );
//   // If no bookings for start date, return start date as
//   // next available
//   if (!bookingWithStartDate) {
//     return startDate;
//   }
//   // Sort the dates from earliest to latest
//   bookedDates.sort((a, b) => a.getTime() - b.getTime());
//   // Find index of start date in array
//   let dateIndex = bookedDates.map(Number).indexOf(+startDate);
//   // Remove items from booked date array from before the start date given
//   let bookedDatesSpliced = bookedDates.splice(dateIndex);
//   // Sort the dates from earliest to latest, check if start date is at
//   // index 0. If it isn't then that date is returned, if it is then each
//   // loop increments the date by 1 and checks if it's in the array. If it
//   // isn't, return the date from that iteration.
//   for (var index = 0; index < bookedDatesSpliced.length; index++) {
//     var currentDate = addDays(startDate, index);
//     if (!(currentDate.getTime() === bookedDatesSpliced[index].getTime())) {
//       return currentDate;
//     }
//   }
//   // If no date returned above then the desk is booked consecutively
//   // for as many days as there are indeces in the array. Therefore return
//   // next free day which is the start date with the length of the array
//   // added on.
//   return addDays(startDate, bookedDatesSpliced.length);
// }
function DeskNextAvailable(
// Function to check when desk is next available by date and ID
startDate, Id, bookingArray) {
    // Filter bookings by Id passed into function
    var bookingsForDesk = bookingArray.filter(function (booking) { return booking.bookedDesk.Id === Id; });
    // Check that the length of bookings array is 0,
    // if so no bookings with this desk Id so return date entered
    if (bookingsForDesk.length === 0) {
        return startDate;
    }
    // Array to contain all dates for current desk bookings
    var bookedDates = [];
    // Iterate through bookings and add all dates to array
    for (var _i = 0, bookingsForDesk_1 = bookingsForDesk; _i < bookingsForDesk_1.length; _i++) {
        var booking = bookingsForDesk_1[_i];
        bookedDates.push(booking.bookingDate);
    }
    // Check if any current bookings are for the start date given
    var bookingWithStartDate = bookedDates.some(function (bookingDate) { return bookingDate.getTime() === startDate.getTime(); });
    // If no bookings with this Id and start date, return start date as
    // next available
    if (!bookingWithStartDate) {
        return startDate;
    }
    // Sort the dates from earliest to latest
    bookedDates.sort(function (a, b) { return a.getTime() - b.getTime(); });
    // Find index of start date in array
    var dateIndex = bookedDates.map(Number).indexOf(+startDate);
    // Remove items from booked date array from before the start date given
    var bookedDatesSpliced = bookedDates.splice(dateIndex);
    // Sort the dates from earliest to latest, check if start date is at
    // index 0. If it isn't then that date is returned, if it is then each
    // loop increments the date by 1 and checks if it's in the array. If it
    // isn't, return the date from that iteration.
    for (var index = 0; index < bookedDatesSpliced.length; index++) {
        var currentDate = addDays(startDate, index);
        if (!(currentDate.getTime() === bookedDatesSpliced[index].getTime())) {
            return currentDate;
        }
    }
    // If no date returned above then the desk is booked consecutively
    // for as many days as there are indeces in the array. Therefore return
    // next free day which is the start date with the length of the array
    // added on.
    return addDays(startDate, bookedDatesSpliced.length);
}
function windowDeskNextAvailable(
// Function to check when a desk by a window is next available
startDate, bookingArray) {
    // Filter bookings by window desks booked
    var windowDeskBookings = bookingArray.filter(function (booking) { return booking.bookedDesk.ByWindow === true; });
    console.log(windowDeskBookings);
    // Create array that contains only the desk IDs of the booked window desks
    var windowDeskIds = [];
    for (var _i = 0, windowDeskBookings_1 = windowDeskBookings; _i < windowDeskBookings_1.length; _i++) {
        var booking = windowDeskBookings_1[_i];
        windowDeskIds.push(booking.bookedDesk.Id);
    }
    // Create array of unique desk IDs
    var uniqueWindowDeskIds = __spreadArray([], new Set(windowDeskIds), true);
    console.log("Unique window desk IDs: ", uniqueWindowDeskIds);
    // Check that the length of window deks bookings array is 0,
    // if so no window desk bookings so return date entered
    if (windowDeskBookings.length === 0) {
        return startDate;
    }
    return startDate;
}
// Test Code
var desk1 = new Desk(1, true);
var desk2 = new Desk(2, true);
var desk3 = new Desk(3, false);
var deskArray = [desk1, desk2, desk3];
var booking0 = new DeskBooking(desk1, new Date(2024, 0, 22), "Stanley", "Cooper");
var booking1 = new DeskBooking(desk1, new Date(2024, 0, 23), "Stanley", "Cooper");
var booking2 = new DeskBooking(desk1, new Date(2024, 0, 25), "Stanley", "Cooper");
var booking3 = new DeskBooking(desk1, new Date(2024, 0, 26), "Stanley", "Cooper");
var booking4 = new DeskBooking(desk2, new Date(2024, 0, 21), "Andrew", "Ember");
var booking5 = new DeskBooking(desk2, new Date(2024, 0, 22), "Andrew", "Ember");
var booking6 = new DeskBooking(desk2, new Date(2024, 0, 23), "Andrew", "Ember");
var bookedDesks = [
    booking0,
    booking1,
    booking2,
    booking3,
    booking4,
    booking5,
    booking6,
];
var findADesk = DeskNextAvailable(new Date(2024, 0, 22), 1, bookedDesks);
var findWindowDesk = windowDeskNextAvailable(new Date(2024, 0, 22), bookedDesks);
console.log(findADesk);
console.log(findWindowDesk);
