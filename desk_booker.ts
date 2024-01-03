interface Desk {
  // Interface for shape of desk object with an ID and a boolean showing if
  // by a window
  Id: number;
  ByWindow: boolean;
}

interface DeskBooking {
  // Interface for shape of desk booking objects
  bookedDesk: Desk;
  bookingDate: Date;
  firstName: string;
  lastName: string;
}

function addDays(date: Date, days: number): Date {
  // Function to add a specified number of days to a date
  let result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function removeArrayDuplicates(data: number[]): number[] {
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
  let bookingsForDesk = bookingArray.filter(
    (booking) => booking.bookedDesk.Id === Id
  );

  // Check that the length of bookings array is 0,
  // if so no bookings with this desk Id so return date entered
  if (bookingsForDesk.length === 0) {
    return startDate;
  }

  // Array to contain all dates for current desk bookings
  let bookedDates = [];

  // Iterate through bookings and add all dates to array
  for (var booking of bookingsForDesk) {
    bookedDates.push(booking.bookingDate);
  }

  // Check if any current bookings are for the start date given
  let bookingWithStartDate = bookedDates.some(
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

  // Using sorted dates and start date index, check if start date is at
  // index 0. If it isn't then that date is returned as the desk is free,
  // if it is then each loop increments the date by 1 and checks if the next
  // date is in the array. If it isn't, return the date from that iteration.

  for (var index = 0; index < bookedDatesSpliced.length; index++) {
    let currentDate = addDays(startDate, index);
    if (!(currentDate.getTime() === bookedDatesSpliced[index].getTime())) {
      return currentDate;
    }
  }

  // If no date returned above then the desk is booked consecutively
  // for as many days as there are indeces in the array. Therefore return
  // next free day which is the start date with the length of the
  // bookedDatesSpliced array added on.

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

  // Create array of unique desk IDs, windowDeskIds will contain duplicates
  let uniqueWindowDeskIds = removeArrayDuplicates(windowDeskIds);

  let windowDeskFree = [];
  // Pass each desk ID of booked window desks to DeskNextAvailable to find
  // earliest date a window desk is avaialble
  for (var deskId of uniqueWindowDeskIds) {
    let dateAvailabe = DeskNextAvailable(startDate, deskId, windowDeskBookings);
    windowDeskFree.push(dateAvailabe);
  }

  // Sort the window desks available dates from earliest to latest date
  windowDeskFree.sort((a, b) => a.getTime() - b.getTime());

  // Return the earliest available window desk date (first index of array)
  return windowDeskFree[0];
}

// Test Code

var desk1: Desk = {
  Id: 1,
  ByWindow: true,
};
var desk2: Desk = {
  Id: 2,
  ByWindow: true,
};
var desk3: Desk = {
  Id: 3,
  ByWindow: false,
};

var deskArray: Array<Desk> = [desk1, desk2, desk3];

var booking0: DeskBooking = {
  bookedDesk: desk1,
  bookingDate: new Date(2024, 0, 22),
  firstName: "Stanley",
  lastName: "Cooper",
};
var booking1: DeskBooking = {
  bookedDesk: desk1,
  bookingDate: new Date(2024, 0, 24),
  firstName: "Stanley",
  lastName: "Cooper",
};
var booking2: DeskBooking = {
  bookedDesk: desk1,
  bookingDate: new Date(2024, 0, 25),
  firstName: "Stanley",
  lastName: "Cooper",
};
var booking3: DeskBooking = {
  bookedDesk: desk1,
  bookingDate: new Date(2024, 0, 26),
  firstName: "Stanley",
  lastName: "Cooper",
};
var booking4: DeskBooking = {
  bookedDesk: desk2,
  bookingDate: new Date(2024, 0, 21),
  firstName: "Andrew",
  lastName: "Ember",
};
var booking5: DeskBooking = {
  bookedDesk: desk2,
  bookingDate: new Date(2024, 0, 22),
  firstName: "Andrew",
  lastName: "Ember",
};
var booking6: DeskBooking = {
  bookedDesk: desk2,
  bookingDate: new Date(2024, 0, 23),
  firstName: "Andrew",
  lastName: "Ember",
};

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
