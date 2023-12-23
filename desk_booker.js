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
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}
var DeskFinder = /** @class */ (function () {
    function DeskFinder(desks, bookings) {
        this.deskArray = desks;
        this.bookingArray = bookings;
    }
    DeskFinder.prototype.DeskNextAvailable = function (startDate, Id) {
        var currentDate = startDate;
        var deskExists = this.deskArray.some(function (desk) { return desk.Id === Id; });
        if (!deskExists) {
            throw new Error("Desk with this ID does not exist.");
        }
        this.bookingArray.forEach(function (booking) {
            if (booking.bookedDesk.Id === Id && booking.bookingDate !== currentDate) {
                return currentDate;
            }
        });
        for (var days = 0; days < this.bookingArray.length; days++) {
            var daysBookings = this.bookingArray.filter(function (booking) { return booking.bookingDate === currentDate; });
            var deskHasBooking = daysBookings.some(function (desk) { return desk.bookedDesk.Id === Id; });
            if (!deskHasBooking) {
                return currentDate;
            }
            else {
                currentDate = addDays(currentDate, 1);
            }
        }
        return currentDate;
    };
    return DeskFinder;
}());
// Test Code
var desk1 = new Desk(1, true);
var desk2 = new Desk(2, true);
var desk3 = new Desk(3, false);
var deskArray = [desk1, desk2, desk3];
var booking0 = new DeskBooking(desk1, new Date(2023, 11, 22), "Stanley", "Cooper");
var booking1 = new DeskBooking(desk1, new Date(2023, 11, 23), "Stanley", "Cooper");
var booking2 = new DeskBooking(desk1, new Date(2023, 11, 24), "Stanley", "Cooper");
var booking3 = new DeskBooking(desk1, new Date(2023, 11, 25), "Stanley", "Cooper");
var booking4 = new DeskBooking(desk2, new Date(2023, 11, 22), "Andrew", "Ember");
var booking5 = new DeskBooking(desk2, new Date(2023, 11, 23), "Andrew", "Ember");
var booking6 = new DeskBooking(desk2, new Date(2023, 11, 24), "Andrew", "Ember");
var bookingArray = [
    booking0,
    booking1,
    booking2,
    booking3,
    booking4,
    booking5,
    booking6,
];
var findADesk = new DeskFinder(deskArray, bookingArray);
console.log(findADesk.DeskNextAvailable(new Date(2023, 11, 22), 1));
