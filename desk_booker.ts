class Desk {
  //Class to create desk object with an ID and a boolean showing if by a window
  Id: number;
  ByWindow: boolean;
  constructor(Id: number, ByWindow: boolean) {
    this.Id = Id;
    this.ByWindow = ByWindow;
  }
}

class DeskBooking {
  //Class to create desk booking objects
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
  //Function to add a specified number of days to a date
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function DeskNextAvailable(
  //Function to check when desk is next available by date and ID
  startDate: Date,
  Id: number,
  bookingArray: Array<DeskBooking>
): Date {
  //Filter bookings by Id passed into function
  var bookingsForDesk = bookingArray.filter(
    (booking) => booking.bookedDesk.Id === Id
  );

  // Check that the length of bookings array is 0 - no bookings with this desk Id
  if (bookingsForDesk.length == 0) {
    return startDate;
  }

  //Array to contain all dates for current desk bookings
  var bookedDates = [];

  //Iterate through bookings and add all dates to array
  for (var booking of bookingsForDesk) {
    bookedDates.push(booking.bookingDate);
  }

  //Sort the dates from earliest to latest
  bookedDates.sort((a, b) => a.getTime() - b.getTime());

  /*Sort the dates from earliest to latest, iterate through dates and check if
  start date is in the array. With each loop increment the date by 1 and check if
  it's in the array. If it isn't, return that date on that loop.*/

  for (var i = 0; i < bookedDates.length; i++) {
    var currentDate = addDays(startDate, i);
    if (!(currentDate === bookedDates[i])) {
      return currentDate;
    }
  }

  /*If no date returned above then next available date is the final date in bookedDates +1.*/

  //Check if any current bookings are for the start date given
  var bookingWithStartDate = bookingsForDesk.some(
    (booking) => booking.bookingDate === startDate
  );

  //If no bookings with this Id and start date, return start date as next available
  if (!bookingWithStartDate) {
    return startDate;
  }

  // while (true) {
  //   var currentDate = startDate
  //   if (bookedDates.includes(currentDate)) {
  //     currentDate = addDays(currentDate, 1)
  //   } else {
  //     return currentDate
  //   }
  // }

  bookingArray.forEach((booking) => {
    if (booking.bookedDesk.Id === Id && booking.bookingDate !== startDate) {
      return startDate;
    }
  });

  for (var days = 0; days < bookingArray.length; days++) {
    var daysBookings = bookingArray.filter(
      (booking) => booking.bookingDate === startDate
    );
    var deskHasBooking = daysBookings.some((desk) => desk.bookedDesk.Id === Id);

    if (!deskHasBooking) {
      return startDate;
    } else {
      startDate = addDays(startDate, 1);
    }
  }
  return startDate;
}

// Test Code

var desk1: Desk = new Desk(1, true);
var desk2: Desk = new Desk(2, true);
var desk3: Desk = new Desk(3, false);

var deskArray: Array<Desk> = [desk1, desk2, desk3];

var booking0: DeskBooking = new DeskBooking(
  desk1,
  new Date(2023, 11, 22),
  "Stanley",
  "Cooper"
);
var booking1: DeskBooking = new DeskBooking(
  desk1,
  new Date(2023, 11, 23),
  "Stanley",
  "Cooper"
);
var booking2: DeskBooking = new DeskBooking(
  desk1,
  new Date(2023, 11, 24),
  "Stanley",
  "Cooper"
);
var booking3: DeskBooking = new DeskBooking(
  desk1,
  new Date(2023, 11, 25),
  "Stanley",
  "Cooper"
);
var booking4: DeskBooking = new DeskBooking(
  desk2,
  new Date(2023, 11, 22),
  "Andrew",
  "Ember"
);
var booking5: DeskBooking = new DeskBooking(
  desk2,
  new Date(2023, 11, 23),
  "Andrew",
  "Ember"
);
var booking6: DeskBooking = new DeskBooking(
  desk2,
  new Date(2023, 11, 24),
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

var findADesk = DeskNextAvailable(new Date(2023, 11, 23), 2, bookingArray);

console.log(findADesk);
