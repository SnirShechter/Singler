const profile = {
    fName: 'myFName',                                   // name: 'Snir Shechter'
    lName: 'myLName',                                   // name: 'Snir Shechter'
    birthdate: '742683600000',                        // birthdate: '23235232352' - IN MILISECONDS
    imgUrl: 'http://nowhere.com/img.png',                        // birthdate: '23235232352' - IN MILISECONDS
    isMale: true,                                   // isMale: true
    position: { lat: '23509.2', lng: '340943.2' },       // position:{lat:3395.22,lng:2341.65}
    interests: ['Gaming', 'Web Surfing', 'Movies'],    // interests: ['Soccer','Gaming','Shopping','Movies']
    desc: 'I like girls'                            // desc: 'I love hiking, dancing, shopping, prefer girls with brown hair'
}

const user = {
    _id: '1',           // u953020h
    uname: 'snit',   // username: 'snirshechter'   - LOWERCASE STRING
    profile,
    likes: {
        '4': true, // ug39h4j: true
        '5': false // u9gh39h: false
    },
    filtermap: {
        female: true, // female: true
        male: false,   // female: true
        minAge: 18,  // minBirthdate: '2305923453'  - IN MILISECONDS
        maxAge: 30   // maxBirthdate: '2305820435'  - IN MILISECONDS
    }
}

const matches = [
    {
        _Id: '124124',
        date: '750373200000', // date: '1015681025' - IN MILISECONDS
        targetId: '123123',
        matchedProfile: {
            fName: 'match1',                                   // name: 'Snir Shechter'
            lName: 'match1',                                   // name: 'Snir Shechter'
            birthdate: '2305823058',                        // birthdate: '23235232352' - IN MILISECONDS
            imgUrl: 'http://via.placeholder.com/150x150',                        // birthdate: '23235232352' - IN MILISECONDS
            isMale: true,                                   // isMale: true
            position: { lat: '23509.2', lng: '340943.2' },       // position:{lat:3395.22,lng:2341.65}
            interests: ['Gaming', 'Web Surfing', 'Movies'],    // interests: ['Soccer','Gaming','Shopping','Movies']
            desc: 'I like girls'                            // desc: 'I love hiking, dancing, shopping, prefer girls with brown hair'
        },
        msgs: [{ date: '325235', txt: '1' },
        { date: '322355235', txt: '2' },
        { date: '32522135', txt: '3' }]
    },
    {
        _Id: '124124',
        date: '750383200000', // date: '1015681025' - IN MILISECONDS
        targetId: '123123',
        matchedProfile: {
            fName: 'match2',                                   // name: 'Snir Shechter'
            lName: 'match2',                                   // name: 'Snir Shechter'
            birthdate: '2305823058',                        // birthdate: '23235232352' - IN MILISECONDS
            imgUrl: 'http://via.placeholder.com/150x150',                        // birthdate: '23235232352' - IN MILISECONDS
            isMale: true,                                   // isMale: true
            position: { lat: '23509.2', lng: '340943.2' },       // position:{lat:3395.22,lng:2341.65}
            interests: ['Gaming', 'Web Surfing', 'Movies'],    // interests: ['Soccer','Gaming','Shopping','Movies']
            desc: 'I like girls'                            // desc: 'I love hiking, dancing, shopping, prefer girls with brown hair'
        },
        msgs: [{ date: '325235', txt: '1' }, { date: '325235', txt: '2' }, { date: '325235', txt: '3' }]
    }
]

const usersToShow = [
    genUser(user, 6),
    genUser(user, 7),
    genUser(user, 8),
    genUser(user, 9),
    genUser(user, 10),
    genUser(user, 11)
]




const state = {
    user,
    matches,
    usersToShow
}

function genUser(user, id) {
    let newUser = JSON.parse(JSON.stringify(user));
    newUser._id = id;
    newUser.profile.fName ='fnameasdasd'+ id;
    newUser.profile.lName ='lnameasdasd'+ id;
    // console.log(newUser);
    return newUser;
}

export default state