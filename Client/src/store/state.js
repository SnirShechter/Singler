const profile = {
    fName: 'fName',                                   // name: 'Snir Shechter'
    lName: 'lName',                                   // name: 'Snir Shechter'
    birthdate: '2305823058',                        // birthdate: '23235232352' - IN MILISECONDS
    imgUrl: 'http://nowhere.com/img.png',                        // birthdate: '23235232352' - IN MILISECONDS
    isMale: true,                                   // isMale: true
    position: { lat: '23509.2', lng: '340943.2' },       // position:{lat:3395.22,lng:2341.65}
    interests: ['Gaming', 'Web Surfing', 'Movies'],    // interests: ['Soccer','Gaming','Shopping','Movies']
    desc: 'I like girls'                            // desc: 'I love hiking, dancing, shopping, prefer girls with brown hair'
}

const user = {
    _id: '1',           // u953020h
    uname: 'snit',   // username: 'snirshechter'   - LOWERCASE STRING
    password: '1234',   // password: 'mypass125'
    profile: profile,
    likes: {
        '4': true, // ug39h4j: true
        '5': false // u9gh39h: false
    },
    userMatches: {
        'matchId': 'userId', // 'm3o4hh9':'ug204jhg'
        'matchId': 'userId'  // 'm3o4hh9':'ug204jhg'
    },
    filtermap: {
        female: true, // female: true
        male: false,   // female: true
        minAge: 18,  // minBirthdate: '2305923453'  - IN MILISECONDS
        maxAge: 30   // maxBirthdate: '2305820435'  - IN MILISECONDS
    }
}

const matches = {
    '1': {
        date: '34634689346', // date: '1015681025' - IN MILISECONDS
        userId1: '1',     // _id1: 'ug9h2h2'
        userId2: '2',     // _id2: 'u67h452'
        msgs: [{ date: '325235', txt: '1' }, { date: '322355235', txt: '2' }, { date: '32522135', txt: '3' }]
    },
    '2': {
        date: '56756856865', // date: '1015681025' - IN MILISECONDS
        userId1: '3',     // _id1: 'ug9h2h2'
        userId2: '1',     // _id2: 'u67h452'
        msgs: [{ date: '325235', txt: '1' }, { date: '325235', txt: '2' }, { date: '325235', txt: '3' }]
    },
}

const users = {
    '6': genUser(user, 6),
    '7': genUser(user, 7),
    '8': genUser(user, 8),
    '9': genUser(user, 9),
    '10': genUser(user, 10),
    '11': genUser(user, 11),
}
const state = {
    user,
    matches,
    users
}

function genUser(user, id) {
    let newUser = JSON.parse(JSON.stringify(user));
    newUser._id = id;
    newUser.name += id;
    return newUser;
}

export default state