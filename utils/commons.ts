import { Alert } from "react-native";

export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export const getRoomId = (
  userId1?: string | string[],
  userId2?: string | string[]
) => {
  const sortedIds = [userId1, userId2].sort();
  const roomId = sortedIds.join("-");
  return roomId;
};

export const formatDate = (date: Date) => {
  var day = date.getDate();
  var monthNames = [
    "jan",
    "fev",
    "mar",
    "abr",
    "mai",
    "jun",
    "jul",
    "ago",
    "set",
    "out",
    "nov",
    "dez",
  ];

  var month = monthNames[date.getMonth()];
  var formattedDate = day + " " + month;
  return formattedDate;
};

export const handleUnavailable = () => {
  Alert.alert("Tela ainda não disponivel");
};

export const defaultImage =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Avatar_icon_green.svg/1200px-Avatar_icon_green.svg.png";
