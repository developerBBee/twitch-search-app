export const fetchUser = async (query, onSuccess, onFailure) => {
  try {
    const result = await fetch(`/api/twitch/user?${query}`);
    const resultData = await result.json();
    console.log("User Data:", resultData);
    onSuccess(JSON.stringify(resultData));
  } catch (error) {
    console.error("Error fetching user data:", error);
    onFailure(error);
  }
};

export const fetchSchedule = async (query, onSuccess, onFailure) => {
  try {
    const result = await fetch(`/api/twitch/schedule?${query}`);
    const resultData = await result.json();
    console.log("Schedule Data:", resultData);

    onSuccess(resultData.data.segments);
  } catch (error) {
    console.error("Error fetching schedule data:", error);
    onFailure(error);
  }
};
