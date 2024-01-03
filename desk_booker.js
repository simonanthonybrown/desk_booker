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
function removeArrayDuplicates(data) {
    // Function that takes an array of data and removes any duplicate elements
    return data.filter(function (value, index) { return data.indexOf(value) === index; });
}
function DeskNextAvailable(
// Function to check when desk is next available by date and ID
startDate, Id, bookingArray) {
    // Filter bookings by Id passed into function
    var bookingsForDesk = bookingArray.filter(function (booking) { return booking.bookedDesk.Id === Id; });
    console.log("bookings for desk by ID: ", bookingsForDesk);
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
    // Check that the length of window deks bookings array is 0,
    // if so no window desk bookings so return date entered
    if (windowDeskBookings.length === 0) {
        return startDate;
    }
    // Create array that contains only the desk IDs of the booked window desks
    var windowDeskIds = [];
    for (var _i = 0, windowDeskBookings_1 = windowDeskBookings; _i < windowDeskBookings_1.length; _i++) {
        var booking = windowDeskBookings_1[_i];
        windowDeskIds.push(booking.bookedDesk.Id);
    }
    // Create array of unique desk IDs
    var uniqueWindowDeskIds = removeArrayDuplicates(windowDeskIds);
    console.log("Unique window desk IDs: ", uniqueWindowDeskIds);
    // Plan is to get each unique window desk ID that is booked, run them
    // through "DeskNextAvailable", add results to an array, sort them,
    // then return whichever date is sooner (index 0 of the array).
    var windowDeskFree = [];
    // Pass each desk ID of booked window desks to DeskNextAvailable to find
    // earliest date a window desk is avaialble
    for (var _a = 0, uniqueWindowDeskIds_1 = uniqueWindowDeskIds; _a < uniqueWindowDeskIds_1.length; _a++) {
        var deskId = uniqueWindowDeskIds_1[_a];
        var dateAvailabe = DeskNextAvailable(startDate, deskId, windowDeskBookings);
        windowDeskFree.push(dateAvailabe);
    }
    console.log("Window desks free: ", windowDeskFree);
    // Sort the window desks available from earliest to latest date
    windowDeskFree.sort(function (a, b) { return a.getTime() - b.getTime(); });
    console.log("Sorted free window desk dates: ", windowDeskFree);
    // Return the earliest available window desk date (first index of array)
    return windowDeskFree[0];
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
var findADesk = DeskNextAvailable(new Date(2024, 0, 22), 1, bookedDesks);
var findWindowDesk = windowDeskNextAvailable(new Date(2024, 0, 22), bookedDesks);
console.log(findADesk);
console.log(findWindowDesk);
