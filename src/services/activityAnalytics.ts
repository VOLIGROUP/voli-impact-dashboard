
import { Activity } from "@/types/dashboard";
import { format, subMonths } from "date-fns";

// Group activities by type
export const getActivitiesByType = (activities: Activity[]) => {
  return activities.reduce((acc, activity) => {
    const type = activity.type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
};

// Calculate total hours by activity type
export const calculateHoursByType = (activities: Activity[]) => {
  return activities.reduce((acc, activity) => {
    if (activity.hours) {
      const type = activity.type;
      acc[type] = (acc[type] || 0) + activity.hours;
    }
    return acc;
  }, {} as Record<string, number>);
};

// Calculate total amounts raised by activity type
export const calculateAmountsByType = (activities: Activity[]) => {
  return activities.reduce((acc, activity) => {
    if (activity.amountRaised) {
      const type = activity.type;
      acc[type] = (acc[type] || 0) + activity.amountRaised;
    }
    return acc;
  }, {} as Record<string, number>);
};

// Group activities by month for timeline charts
export const groupActivitiesByMonth = (activities: Activity[]) => {
  // Get the last 6 months
  const monthsData: {month: string, count: number, points: number, hours: number, amounts: number}[] = [];
  
  for (let i = 5; i >= 0; i--) {
    const currentMonth = subMonths(new Date(), i);
    const monthName = format(currentMonth, 'MMM');
    monthsData.push({
      month: monthName,
      count: 0,
      points: 0,
      hours: 0,
      amounts: 0
    });
  }
  
  // Fill with actual data
  activities.forEach(activity => {
    try {
      const activityMonth = format(new Date(activity.date), 'MMM');
      const monthData = monthsData.find(m => m.month === activityMonth);
      
      if (monthData) {
        monthData.count += 1;
        monthData.points += activity.points;
        monthData.hours += activity.hours || 0;
        monthData.amounts += activity.amountRaised || 0;
      }
    } catch (error) {
      console.error("Error processing activity date:", error);
    }
  });
  
  return monthsData;
};

// Calculate total impact stats
export const calculateImpactStats = (activities: Activity[]) => {
  return activities.reduce((stats, activity) => {
    stats.totalPoints += activity.points;
    stats.totalHours += activity.hours || 0;
    stats.totalAmountRaised += activity.amountRaised || 0;
    stats.totalActivities += 1;
    
    return stats;
  }, {
    totalPoints: 0,
    totalHours: 0,
    totalAmountRaised: 0,
    totalActivities: 0
  });
};
