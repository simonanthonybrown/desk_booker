class Desk {
  // Class to create desk object with an ID and a boolean showing if by a window
  Id: number;
  ByWindow: boolean;
  constructor(Id: number, ByWindow: boolean) {
    this.Id = Id;
    this.ByWindow = ByWindow;
  }
}

class DeskBooking {
  // Class to create desk booking objects
  bookedDesk: Desk;
  bookingDate: Date;
  firstName: string;
  lastName: string;
  constructor(
    bookedDesk: Desk,
    bookingDate: Date,
    firstName: string,
    lastName: string
  ) {
    this.bookedDesk = bookedDesk;
    this.bookingDate = bookingDate;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

function addDays(date: Date, days: number): Date {
  // Function to add a specified number of days to a date
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function DeskNextAvailable(
  // Function to check when desk is next available by date and ID
  startDate: Date,
  Id: number,
  bookingArray: Array<DeskBooking>
): Date {

  // Filter bookings by Id passed into function
  var bookingsForDesk = bookingArray.filter(
    (booking) => booking.bookedDesk.Id === Id
  );

  /* Check that the length of bookings array is 0, 
  if so no bookings with this desk Id so return date entered*/
  if (bookingsForDesk.length === 0) {
    return startDate;
  }

  // Check if any current bookings are for the start date given
  var bookingWithStartDate = bookingsForDesk.some(
    (booking) => booking.bookingDate === startDate
  );

  /* If no bookings with this Id and start date, return start date as
  next available */
  if (!bookingWithStartDate) {
    return startDate;
  }

  // Array to contain all dates for current desk bookings
  var bookedDates = [];

  // Iterate through bookings and add all dates to array
  for (var booking of bookingsForDesk) {
    bookedDates.push(booking.bookingDate);
  }

  // Sort the dates from earliest to latest
  bookedDates.sort((a, b) => a.getTime() - b.getTime());

  /* Sort the dates from earliest to latest, check if start date is at
  index 0. If it isn't then that date is returned, if it is then each loop
  increments the date by 1 and checks if it's in the array. If it isn't,
  return the date from that iteration. */

  for (var index = 0; index < bookedDates.length; index++) {
    var currentDate = addDays(startDate, index);
    if (!(currentDate === bookedDates[index])) {
      return currentDate;
    }
  }

  return addDays(startDate, bookedDates.length);

  /* If no date returned above then the desk is booked consecutively
  for as many days as there are indeces in the array. Therefore return
  next free day which is the start date with the length of the array 
  added on. */

  // bookingArray.forEach((booking) => {
  //   if (booking.bookedDesk.Id === Id && booking.bookingDate !== startDate) {
  //     return startDate;
  //   }
  // });

  // for (var days = 0; days < bookingArray.length; days++) {
  //   var daysBookings = bookingArray.filter(
  //     (booking) => booking.bookingDate === startDate
  //   );
  //   var deskHasBooking = daysBookings.some((desk) => desk.bookedDesk.Id === Id);

  //   if (!deskHasBooking) {
  //     return startDate;
  //   } else {
  //     startDate = addDays(startDate, 1);
  //   }
  // }
}

// Test Code

var desk1: Desk = new Desk(1, true);
var desk2: Desk = new Desk(2, true);
var desk3: Desk = new Desk(3, false);

var deskArray: Array<Desk> = [desk1, desk2, desk3];

var booking0: DeskBooking = new DeskBooking(
  desk1,
  new Date(2024, 0, 22),
  "Stanley",
  "Cooper"
);
var booking1: DeskBooking = new DeskBooking(
  desk1,
  new Date(2024, 0, 23),
  "Stanley",
  "Cooper"
);
var booking2: DeskBooking = new DeskBooking(
  desk1,
  new Date(2024, 0, 24),
  "Stanley",
  "Cooper"
);
var booking3: DeskBooking = new DeskBooking(
  desk1,
  new Date(2024, 0, 25),
  "Stanley",
  "Cooper"
);
var booking4: DeskBooking = new DeskBooking(
  desk2,
  new Date(2024, 0, 22),
  "Andrew",
  "Ember"
);
var booking5: DeskBooking = new DeskBooking(
  desk2,
  new Date(2024, 0, 23),
  "Andrew",
  "Ember"
);
var booking6: DeskBooking = new DeskBooking(
  desk2,
  new Date(2024, 0, 24),
  "Andrew",
  "Ember"
);

var bookingArray: Array<DeskBooking> = [
  booking0,
  booking1,
  booking2,
  booking3,
  booking4,
  booking5,
  booking6,
];

console.log(bookingArray);

var findADesk = DeskNextAvailable(new Date(2024, 0, 22), 1, bookingArray);

console.log(findADesk);
