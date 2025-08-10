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

export const fetchVideos = async (query, onSuccess, onFailure) => {
  try {
    const result = await fetch(`/api/twitch/videos?${query}`);
    const resultData = await result.json();
    console.log("Videos Data:", resultData);

    onSuccess(resultData.data);
  } catch (error) {
    console.error("Error fetching videos data:", error);
    onFailure(error);
  }
};

export const fetchStreams = async (query, onSuccess, onFailure) => {
  try {
    const result = await fetch(`/api/twitch/streams?${query}`);
    const resultData = await result.json();
    console.log("Streams Data:", resultData);

    onSuccess(resultData);
  } catch (error) {
    console.error("Error fetching streams data:", error);
    onFailure(error);
  }
};

export const fetchChannels = async (queryParams, onSuccess, onFailure) => {
  try {
    const result = await fetch(`/api/twitch/search/channels?${queryParams}`);
    const resultData = await result.json();
    console.log("Channels Data:", resultData);

    const payload = { ...resultData, query: queryParams.get("query") };
    console.log("Payload for channels:", payload);
    onSuccess(payload);
  } catch (error) {
    console.error("Error fetching channels data:", error);
    onFailure(error);
  }
};
