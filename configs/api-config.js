export const IP_ADDRESS = '192.168.1.7';

// api users

export const API_LOGIN= `http://${IP_ADDRESS}:6002/api/login`;

// api test
export const API_LIST_QUIZZ= `http://${IP_ADDRESS}:6002/api/quizz/testsByName`;

export const API_QUIZZ_DETAIL= `http://${IP_ADDRESS}:6002/api/quizz/test`;

export const API_TAKE_QUIZZ= `http://${IP_ADDRESS}:6002/api/quizz/takeTest`;

export const API_HISTORY_TAKE_QUIZ_BY_UID= `http://${IP_ADDRESS}:6002/api/quizz/sessions/user`;


// API SCORE

export const API_TOTAL_COIN_BY_UID= `http://${IP_ADDRESS}:6002/api/score`;

// API RANK
export const API_RANK_LIST= `http://${IP_ADDRESS}:6002/api/rank/weekly`;
