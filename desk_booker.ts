class Desk {
  // Class to create desk object with an ID and a boolean showing if by
  // a window
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

function removeArrayDuplicates(data: any[]): any[] {
  // Function that takes an array of data and removes any duplicate elements
  return data.filter((value, index) => data.indexOf(value) === index);
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

  // Check that the length of bookings array is 0,
  // if so no bookings with this desk Id so return date entered
  if (bookingsForDesk.length === 0) {
    return startDate;
  }

  // Array to contain all dates for current desk bookings
  var bookedDates = [];

  // Iterate through bookings and add all dates to array
  for (var booking of bookingsForDesk) {
    bookedDates.push(booking.bookingDate);
  }

  // Check if any current bookings are for the start date given
  var bookingWithStartDate = bookedDates.some(
    (bookingDate) => bookingDate.getTime() === startDate.getTime()
  );

  // If no bookings with this Id and start date, return start date as
  // next available
  if (!bookingWithStartDate) {
    return startDate;
  }

  // Sort the dates from earliest to latest
  bookedDates.sort((a, b) => a.getTime() - b.getTime());

  // Find index of start date in array
  let dateIndex = bookedDates.map(Number).indexOf(+startDate);

  // Remove items from booked date array from before the start date given
  let bookedDatesSpliced = bookedDates.splice(dateIndex);

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
  startDate: Date,
  bookingArray: Array<DeskBooking>
): Date {
  // Filter bookings by window desks booked
  var windowDeskBookings = bookingArray.filter(
    (booking) => booking.bookedDesk.ByWindow === true
  );

  // Check that the length of window deks bookings array is 0,
  // if so no window desk bookings so return date entered
  if (windowDeskBookings.length === 0) {
    return startDate;
  }

  // Create array that contains only the desk IDs of the booked window desks
  let windowDeskIds = [];
  for (var booking of windowDeskBookings) {
    windowDeskIds.push(booking.bookedDesk.Id);
  }

  // Create array of unique desk IDs
  let uniqueWindowDeskIds = removeArrayDuplicates(windowDeskIds);

  let windowDeskFree = [];
  // Pass each desk ID of booked window desks to DeskNextAvailable to find
  // earliest date a window desk is avaialble
  for (var deskId of uniqueWindowDeskIds) {
    let dateAvailabe = DeskNextAvailable(startDate, deskId, windowDeskBookings);
    windowDeskFree.push(dateAvailabe);
  }

  // Sort the window desks available from earliest to latest date
  windowDeskFree.sort((a, b) => a.getTime() - b.getTime());

  // Return the earliest available window desk date (first index of array)
  return windowDeskFree[0];
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
  new Date(2024, 0, 21),
  "Andrew",
  "Ember"
);
var booking5: DeskBooking = new DeskBooking(
  desk2,
  new Date(2024, 0, 22),
  "Andrew",
  "Ember"
);
var booking6: DeskBooking = new DeskBooking(
  desk2,
  new Date(2024, 0, 23),
  "Andrew",
  "Ember"
);

var bookedDesks: Array<DeskBooking> = [
  booking0,
  booking1,
  booking2,
  booking3,
  booking4,
  booking5,
  booking6,
];

var deskOneAvailable = DeskNextAvailable(new Date(2024, 0, 22), 1, bookedDesks);

var deskTwoAvailable = DeskNextAvailable(new Date(2024, 0, 22), 2, bookedDesks);

var findWindowDesk = windowDeskNextAvailable(
  new Date(2024, 0, 22),
  bookedDesks
);

console.log("Desk1 next available: ", deskOneAvailable);
console.log("Desk2 next available: ", deskTwoAvailable);
console.log("Window desk next available: ", findWindowDesk);
