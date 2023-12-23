class Desk {
  Id: number;
  ByWindow: boolean;
  constructor(Id: number, ByWindow: boolean) {
    this.Id = Id;
    this.ByWindow = ByWindow;
  }
}

class DeskBooking {
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
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function DeskNextAvailable(startDate: Date, Id: number, bookingArray: Array<DeskBooking>): Date {
  var currentDate = startDate;
  var deskExists = bookingArray.some((booking) => booking.bookedDesk.Id === Id);

  if (!deskExists) {
    throw new Error("Desk with this ID does not exist.");
  }

  bookingArray.forEach(booking => {
    if (booking.bookedDesk.Id === Id && booking.bookingDate !== currentDate) {
      return currentDate
    }
  });

  for (var days = 0; days < bookingArray.length; days++) {
    var daysBookings = bookingArray.filter(
      (booking) => booking.bookingDate === currentDate
    );
    var deskHasBooking = daysBookings.some(
      (desk) => desk.bookedDesk.Id === Id
    );

    if (!deskHasBooking) {
      return currentDate;
    } else {
      currentDate = addDays(currentDate, 1);
    }
  }
  return currentDate;
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
