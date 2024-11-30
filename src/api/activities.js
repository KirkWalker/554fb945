import { axiosPrivate } from "./axios";

export async function getActivities(is_archived) {
  try {
    const response = await axiosPrivate.get("/activities");
    var newArray = response.data.filter(function (el) {
      return el.is_archived == is_archived;
    });
    var countArray = response.data.filter(function (el) {
      return el.is_archived == false;
    });

    return [newArray, countArray.length];
  } catch (err) {
    console.error(err);
  }
}

export async function getActivityDetail(id) {
  try {
    const response = await axiosPrivate.get("/activities/" + id);
    return response.data;
  } catch (err) {
    console.error(err);
  }
}

export async function updateActivity(id, is_archived) {
  const response = await axiosPrivate.patch("/activities/" + id, {
    is_archived: is_archived,
  });
  //.then((response) => console.log(response.data));
}

export async function updateAll(targetArr, is_archived) {
  targetArr.forEach(async (element) => {
    console.log(element.id, is_archived);
    const response = await axiosPrivate
      .patch("/activities/" + element.id, {
        is_archived: is_archived,
      })
      .then((response) => console.log(response.data));
  });
}
