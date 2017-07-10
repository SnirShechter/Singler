const _id = '';
const uName = '';
const profile = {
    fName: '',                                   // name: 'Snir Shechter'
    lName: '',                                   // name: 'Snir Shechter'
    birthdate: 0,                        // birthdate: '23235232352' - IN MILISECONDS
    imgUrl: '',                        // birthdate: '23235232352' - IN MILISECONDS
    isMale: true,
    interests: '',    // interests: ['Soccer','Gaming','Shopping','Movies']
    desc: ''                            // desc: 'I love hiking, dancing, shopping, prefer girls with brown hair'
}
const likes = [
    // '4': true, // ug39h4j: true
    // '5': false // u9gh39h: false
]
const filtermap = {
    female: false, // female: true
    male: false,   // female: true
    minAge: 0,  // minBirthdate: '2305923453'  - IN MILISECONDS
    maxAge: 0   // maxBirthdate: '2305820435'  - IN MILISECONDS
}
const matches = [
    // {
    //     _Id: '124124',
    //     date: '750373200000', // date: '1015681025' - IN MILISECONDS
    //     targetId: '123123',
    //     matchedProfile: {
    //         fName: 'match1',                                   // name: 'Snir Shechter'
    //         lName: 'match1',                                   // name: 'Snir Shechter'
    //         birthdate: '2305823058',                        // birthdate: '23235232352' - IN MILISECONDS
    //         imgUrl: 'http://via.placeholder.com/150x150',                        // birthdate: '23235232352' - IN MILISECONDS
    //         isMale: true,                                   // isMale: true
    //         position: { lat: '23509.2', lng: '340943.2' },       // position:{lat:3395.22,lng:2341.65}
    //         interests: ['Gaming', 'Web Surfing', 'Movies'],    // interests: ['Soccer','Gaming','Shopping','Movies']
    //         desc: 'I like girls'                            // desc: 'I love hiking, dancing, shopping, prefer girls with brown hair'
    //     },
    //     msgs: [{ date: '325235', txt: '1' },
    //     { date: '322355235', txt: '2' },
    //     { date: '32522135', txt: '3' }]
    // },
    // {
    //     _Id: '124125',
    //     date: '750383200000', // date: '1015681025' - IN MILISECONDS
    //     targetId: '123123',
    //     matchedProfile: {
    //         fName: 'match2',                                   // name: 'Snir Shechter'
    //         lName: 'match2',                                   // name: 'Snir Shechter'
    //         birthdate: '2305823058',                        // birthdate: '23235232352' - IN MILISECONDS
    //         imgUrl: 'http://via.placeholder.com/150x150',                        // birthdate: '23235232352' - IN MILISECONDS
    //         isMale: true,                                   // isMale: true
    //         position: { lat: '23509.2', lng: '340943.2' },       // position:{lat:3395.22,lng:2341.65}
    //         interests: ['Gaming', 'Web Surfing', 'Movies'],    // interests: ['Soccer','Gaming','Shopping','Movies']
    //         desc: 'I like girls'                            // desc: 'I love hiking, dancing, shopping, prefer girls with brown hair'
    //     },
    //     msgs: [{ date: '325235', txt: '1' }, { date: '325235', txt: '2' }, { date: '325235', txt: '3' }]
    // }
]

const usersToShow = [
    // {
    //     _id: '595ca475211d5f28b4ee698d',
    //     fName: 'myFName1',                                   // name: 'Snir Shechter'
    //     lName: 'myLName1',                                   // name: 'Snir Shechter'
    //     birthdate: '742683600000',                        // birthdate: '23235232352' - IN MILISECONDS
    //     imgUrl: 'http://nowhere.com/img.png',                        // birthdate: '23235232352' - IN MILISECONDS
    //     isMale: true,                                   // isMale: true
    //     position: { lat: '23509.2', lng: '340943.2' },       // position:{lat:3395.22,lng:2341.65}
    //     interests: ['Gaming', 'Web Surfing', 'Movies'],    // interests: ['Soccer','Gaming','Shopping','Movies']
    //     desc: 'I like girls'
    // },
    // {
    //     _id: '595ca475211d5f28b4ee698d',
    //     fName: 'myFName2',                                   // name: 'Snir Shechter'
    //     lName: 'myLName2',                                   // name: 'Snir Shechter'
    //     birthdate: '742683600000',                        // birthdate: '23235232352' - IN MILISECONDS
    //     imgUrl: 'http://nowhere.com/img.png',                        // birthdate: '23235232352' - IN MILISECONDS
    //     isMale: true,                                   // isMale: true
    //     position: { lat: '23509.2', lng: '340943.2' },       // position:{lat:3395.22,lng:2341.65}
    //     interests: ['Gaming', 'Web Surfing', 'Movies'],    // interests: ['Soccer','Gaming','Shopping','Movies']
    //     desc: 'I like girls'
    // },
    // {
    //     _id: '595ca475211d5f28b4ee698d',
    //     fName: 'myFName3',                                   // name: 'Snir Shechter'
    //     lName: 'myLName3',                                   // name: 'Snir Shechter'
    //     birthdate: '742683600000',                        // birthdate: '23235232352' - IN MILISECONDS
    //     imgUrl: 'http://nowhere.com/img.png',                        // birthdate: '23235232352' - IN MILISECONDS
    //     isMale: true,                                   // isMale: true
    //     position: { lat: '23509.2', lng: '340943.2' },       // position:{lat:3395.22,lng:2341.65}
    //     interests: ['Gaming', 'Web Surfing', 'Movies'],    // interests: ['Soccer','Gaming','Shopping','Movies']
    //     desc: 'I like girls'
    // },
    // {
    //     _id: '12125',
    //     fName: 'myFName4',                                   // name: 'Snir Shechter'
    //     lName: 'myLName4',                                   // name: 'Snir Shechter'
    //     birthdate: '742683600000',                        // birthdate: '23235232352' - IN MILISECONDS
    //     imgUrl: 'http://nowhere.com/img.png',                        // birthdate: '23235232352' - IN MILISECONDS
    //     isMale: true,                                   // isMale: true
    //     position: { lat: '23509.2', lng: '340943.2' },       // position:{lat:3395.22,lng:2341.65}
    //     interests: ['Gaming', 'Web Surfing', 'Movies'],    // interests: ['Soccer','Gaming','Shopping','Movies']
    //     desc: 'I like girls'
    // },
    // {
    //     _id: '12125',
    //     fName: 'myFName5',                                   // name: 'Snir Shechter'
    //     lName: 'myLName5',                                   // name: 'Snir Shechter'
    //     birthdate: '742683600000',                        // birthdate: '23235232352' - IN MILISECONDS
    //     imgUrl: 'http://nowhere.com/img.png',                        // birthdate: '23235232352' - IN MILISECONDS
    //     isMale: true,                                   // isMale: true
    //     position: { lat: '23509.2', lng: '340943.2' },       // position:{lat:3395.22,lng:2341.65}
    //     interests: ['Gaming', 'Web Surfing', 'Movies'],    // interests: ['Soccer','Gaming','Shopping','Movies']
    //     desc: 'I like girls'
    // },
    // {
    //     _id: '12125',
    //     fName: 'myFName6',                                   // name: 'Snir Shechter'
    //     lName: 'myLName6',                                   // name: 'Snir Shechter'
    //     birthdate: '742683600000',                        // birthdate: '23235232352' - IN MILISECONDS
    //     imgUrl: 'http://nowhere.com/img.png',                        // birthdate: '23235232352' - IN MILISECONDS
    //     isMale: true,                                   // isMale: true
    //     position: { lat: '23509.2', lng: '340943.2' },       // position:{lat:3395.22,lng:2341.65}
    //     interests: ['Gaming', 'Web Surfing', 'Movies'],    // interests: ['Soccer','Gaming','Shopping','Movies']
    //     desc: 'I like girls'
    // },
    // {
    //     _id: '12125',
    //     fName: 'myFName7',                                   // name: 'Snir Shechter'
    //     lName: 'myLName7',                                   // name: 'Snir Shechter'
    //     birthdate: '742683600000',                        // birthdate: '23235232352' - IN MILISECONDS
    //     imgUrl: 'http://nowhere.com/img.png',                        // birthdate: '23235232352' - IN MILISECONDS
    //     isMale: true,                                   // isMale: true
    //     position: { lat: '23509.2', lng: '340943.2' },       // position:{lat:3395.22,lng:2341.65}
    //     interests: ['Gaming', 'Web Surfing', 'Movies'],    // interests: ['Soccer','Gaming','Shopping','Movies']
    //     desc: 'I like girls'
    // },
    // {
    //     _id: '12125',
    //     fName: 'myFName8',                                   // name: 'Snir Shechter'
    //     lName: 'myLName8',                                   // name: 'Snir Shechter'
    //     birthdate: '742683600000',                        // birthdate: '23235232352' - IN MILISECONDS
    //     imgUrl: 'http://nowhere.com/img.png',                        // birthdate: '23235232352' - IN MILISECONDS
    //     isMale: true,                                   // isMale: true
    //     position: { lat: '23509.2', lng: '340943.2' },       // position:{lat:3395.22,lng:2341.65}
    //     interests: ['Gaming', 'Web Surfing', 'Movies'],    // interests: ['Soccer','Gaming','Shopping','Movies']
    //     desc: 'I like girls'
    // },
    // {
    //     _id: '12125',
    //     fName: 'myFName9',                                   // name: 'Snir Shechter'
    //     lName: 'myLName9',                                   // name: 'Snir Shechter'
    //     birthdate: '742683600000',                        // birthdate: '23235232352' - IN MILISECONDS
    //     imgUrl: 'http://nowhere.com/img.png',                        // birthdate: '23235232352' - IN MILISECONDS
    //     isMale: true,                                   // isMale: true
    //     position: { lat: '23509.2', lng: '340943.2' },       // position:{lat:3395.22,lng:2341.65}
    //     interests: ['Gaming', 'Web Surfing', 'Movies'],    // interests: ['Soccer','Gaming','Shopping','Movies']
    //     desc: 'I like girls'
    // },
    // {
    //     _id: '12125',
    //     fName: 'myFName10',                                   // name: 'Snir Shechter'
    //     lName: 'myLName10',                                   // name: 'Snir Shechter'
    //     birthdate: '742683600000',                        // birthdate: '23235232352' - IN MILISECONDS
    //     imgUrl: 'http://nowhere.com/img.png',                        // birthdate: '23235232352' - IN MILISECONDS
    //     isMale: true,                                   // isMale: true
    //     position: { lat: '23509.2', lng: '340943.2' },       // position:{lat:3395.22,lng:2341.65}
    //     interests: ['Gaming', 'Web Surfing', 'Movies'],    // interests: ['Soccer','Gaming','Shopping','Movies']
    //     desc: 'I like girls'
    // }
]




const state = {
    _id,
    uName,
    profile,
    likes,
    matches,
    filtermap,
    usersToShow
}

// function genUser(user, id) {
//     let newUser = JSON.parse(JSON.stringify(user));
//     newUser._id = id;
//     newUser.profile.fName = 'fnameasdasd' + id;
//     newUser.profile.lName = 'lnameasdasd' + id;
//     console.log(newUser);
//     return newUser;
// }

export default state