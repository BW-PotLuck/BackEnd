exports.seed = function(knex) {
 
    return knex('events').insert([
      { organizer_id: 1, title: `Rodgers party`, date: '05-05-2030', time: '3:00', location:'home' },
      { organizer_id: 2, title: `Huimins party`, date: '05-05-2030', time: '3:00', location:'home' },
      { organizer_id: 3, title: `Nathans party`, date: '05-05-2030', time: '3:00', location:'home' }
    ]);
};