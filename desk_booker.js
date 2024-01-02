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
    // index 0. If it isn't then that date is returned, if it is then each loop
    // increments the date by 1 and checks if it's in the array. If it isn't,
    // return the date from that iteration.
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
// Test Code
var desk1 = new Desk(1, true);
var desk2 = new Desk(2, true);
var desk3 = new Desk(3, false);
var deskArray = [desk1, desk2, desk3];
var booking0 = new DeskBooking(desk1, new Date(2024, 0, 22), "Stanley", "Cooper");
var booking1 = new DeskBooking(desk1, new Date(2024, 0, 23), "Stanley", "Cooper");
var booking2 = new DeskBooking(desk1, new Date(2024, 0, 24), "Stanley", "Cooper");
var booking3 = new DeskBooking(desk1, new Date(2024, 0, 25), "Stanley", "Cooper");
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
var findADesk = DeskNextAvailable(new Date(2024, 0, 21), 2, bookedDesks);
console.log(findADesk);
