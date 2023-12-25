const host = 'http://192.168.1.206:4200';
//http://localhost:4200
const util = {
    API: {
        USER: {
            FIND_USER: `${host}/user/findUser`,
            REGISTER: `${host}/user/register`,
            GET_BY_NAME: `${host}/user/get_by_name`,
            ADD_GAME_CREDIT: `${host}/user/add_game_credit`,
        },
        PLATFORM: {
            LIST: `${host}/platform/list`
        },
        INVITE: {
            INSERT: `${host}/invite/insert`
        },
        MATCH: {
            SHOW_AVAILABLE_MATCH: `${host}/match/show_available`,
            CREATE: `${host}/match/create`,
            UPDATE_AGAINST: `${host}/match/update_against`,
            CHECK_CURRENT: `${host}/match/check_current`,
            ACTIVATE: `${host}/match/activate`,
            SET_READY: `${host}/match/ready`,
            CANCEL: `${host}/match/cancel`,
            SET_SCORE: `${host}/match/set_score`,
            CHECK_RESULT: `${host}/match/check_result`,
            SET_WINNER:  `${host}/match/set_winner`
        },
        GAME: {
            LIST: `${host}/game/list`,
            CREATE: `${host}/game/create`,
            UPDATE: `${host}/game/update`,
        },
        TYPE: {
            LIST: `${host}/type/list`
        }
    }
}

export default util;