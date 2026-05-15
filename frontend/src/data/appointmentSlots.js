import { doctors } from '../assets/assets';

export const getAvailableSlots = (docInfo) => {
  if (!docInfo) return;

  let allSlots = [];

  // Current date
  let today = new Date();

  for (let i = 0; i < 7; i++) {
    let currentDate = new Date(today);

    currentDate.setDate(today.getDate() + i);

    // End time
    let endTime = new Date(today);
    endTime.setDate(today.getDate() + i);
    endTime.setHours(19, 0, 0, 0);

    // Today's timing
    if (today.getDate() === currentDate.getDate()) {
      currentDate.setHours(
        currentDate.getHours() > 8 ? currentDate.getHours() + 1 : 8,
      );

      currentDate.setMinutes(0);
    } else {
      currentDate.setHours(8);
      currentDate.setMinutes(0);
    }

    let timeSlots = [];

    while (currentDate < endTime) {
      let formattedTime = currentDate.toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      });

      let day = currentDate.getDate();
      let month = currentDate.getMonth() + 1;
      let year = currentDate.getFullYear();

      const slotDate = day + '_' + month + '_' + year;
      const slotTime = formattedTime;

      // Check slot booked or not
      const isSlotAvailable =
        docInfo.slots_booked &&
        docInfo.slots_booked[slotDate] &&
        docInfo.slots_booked[slotDate].includes(slotTime)
          ? false
          : true;

      if (isSlotAvailable) {
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime,
        });
      }

      // Next slot after 1 hour
      currentDate.setMinutes(currentDate.getMinutes() + 60);
    }

    allSlots.push(timeSlots);
  }

  return allSlots;
};

export const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

// finding speciality wise doctor
export const relatedDoctors = (docInfo) =>
  doctors.filter(
    (doc) => doc.speciality === docInfo.speciality && doc._id !== docInfo._id,
  );
